#!/usr/bin/env python3
"""
sync_wechat.py — 把微信公众号文章同步为本地博客文章（含资源下载）

用法：
  python3 scripts/sync_wechat.py <URL> [--slug S] [--category C] [--tags a,b,c] [--date D] [--html PATH]

示例：
  python3 scripts/sync_wechat.py "https://mp.weixin.qq.com/s/xxxx" --slug same-model-different-tool --category AI --tags "AI,OpenCode,工具"

约定（固化自首次实践，勿随意改动）：
  - 文章: src/content/posts/<年>/<月>/<slug>.md  （Markdown + gray-matter，博客用 react-markdown 无 rehype-raw，必须转纯 Markdown）
  - 图片: public/images/posts/<年>/<月>/<slug>-NN.<ext>  （正文图，按文档顺序编号）
  - 封面: public/images/posts/<年>/<月>/<slug>-cover.jpg  （取 og:image）
  - 正文引用图片用绝对路径 /images/posts/<年>/<月>/<slug>-NN.<ext>
  - frontmatter: title / date(字符串) / description / category / tags / cover
  - 正文 h1 → 降级为 ##（保证文章页 H1 唯一为标题）
  - 顶部加一行引用注明原文出处与链接
  - 下载图片带微信 Referer+UA（防盗链）
  - 幂等：图片已存在则跳过；文章文件每次覆盖写入

agent 调用约定：用户只给链接时，agent 自行根据标题/内容选一个描述性英文 slug（参照已有文章命名风格，如 claw-code、agent-local-deploy-tanks），推断 category/tags，运行本脚本，然后按打印的「下一步」验证。
"""
import argparse
import json
import os
import re
import sys
import datetime
from urllib.parse import urlparse

import requests
import yaml
from bs4 import BeautifulSoup, NavigableString, Tag

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_BASE = "public/images/posts"
POST_BASE = "src/content/posts"

UA = "Mozilla/5.0 (Linux; Android 10; PA-AL00) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36 MicroMessenger/8.0.0"
FETCH_HEADERS = {"User-Agent": UA, "Referer": "https://mp.weixin.qq.com/"}


def err(msg):
    print(f"ERROR: {msg}", file=sys.stderr)


def fetch_html(url: str, html_path: str | None) -> str:
    if html_path:
        with open(html_path, encoding="utf-8") as f:
            return f.read()
    r = requests.get(url, headers=FETCH_HEADERS, timeout=30)
    r.raise_for_status()
    return r.text


def ext_for(url: str) -> str:
    low = url.lower()
    if "wx_fmt=jpeg" in low or "wx_fmt=jpg" in low or "/mmbiz_jpg" in low or "/sz_mmbiz_jpg" in low:
        return "jpg"
    if "wx_fmt=gif" in low or "/mmbiz_gif" in low:
        return "gif"
    if "wx_fmt=webp" in low:
        return "webp"
    return "png"


def extract_meta(soup: BeautifulSoup, source_url: str) -> dict:
    meta = {}
    for key in ["og:title", "og:description", "og:image", "og:article:author", "author", "description"]:
        tag = soup.find("meta", property=key) or soup.find("meta", attrs={"name": key})
        if tag and tag.get("content"):
            meta.setdefault(key, tag.get("content"))
    meta["og:url"] = source_url
    return meta


def extract_publish_date(html: str) -> str | None:
    """从文章内嵌 JSON 的 publish_time（Unix 秒）还原发表日，否则回退到正则日期。"""
    ts = None
    for pat in [r'"publish_time"\s*:\s*(\d{10})', r'publish_time%22%3A(\d{10})']:
        m = re.search(pat, html)
        if m:
            ts = int(m.group(1))
            break
    if ts:
        try:
            return datetime.datetime.fromtimestamp(ts).strftime("%Y-%m-%d")
        except Exception:
            pass
    m = re.search(r"20\d{2}[-/]\d{1,2}[-/]\d{1,2}", html)
    return m.group().replace("/", "-") if m else None


# ---------- DOM → Markdown ----------
INLINE_TAGS = {"span", "a", "strong", "b", "em", "i", "u", "code", "br", "font", "sup", "sub"}


def _is_bold(tag):
    s = (tag.get("style") or "").lower().replace(" ", "")
    return bool(re.search(r"font-weight\s*:\s*(700|600|bold|800|900)", s))


def _is_italic(tag):
    s = (tag.get("style") or "").lower().replace(" ", "")
    return bool(re.search(r"font-style\s*:\s*italic", s))


def render_inline(node, url_to_local):
    if isinstance(node, NavigableString):
        return str(node)
    if not isinstance(node, Tag):
        return ""
    name = node.name
    if name == "br":
        return "  \n"
    inner = "".join(render_inline(c, url_to_local) for c in node.children)
    if name in ("strong", "b") or (name == "span" and _is_bold(node)):
        inner = inner.strip()
        return f"**{inner}**" if inner else ""
    if name in ("em", "i") or (name == "span" and _is_italic(node)):
        inner = inner.strip()
        return f"*{inner}*" if inner else ""
    if name == "a":
        href = node.get("href") or ""
        text = inner.strip()
        return f"[{text}]({href})" if (href and text) else text
    if name == "img":
        url = node.get("data-src") or node.get("src") or ""
        local = url_to_local.get(url)
        if local:
            alt = (node.get("alt") or "").strip()
            return f"![{alt}]({local})"
        return ""
    if name == "code":
        return f"`{inner}`"
    return inner


def render_block(node, url_to_local):
    if isinstance(node, NavigableString):
        t = str(node).strip()
        if t:
            yield t
        return
    if not isinstance(node, Tag):
        return
    name = node.name
    if name and name.startswith("mp-"):
        for c in node.children:
            yield from render_block(c, url_to_local)
        return
    if name in INLINE_TAGS:
        t = render_inline(node, url_to_local).strip()
        if t:
            yield t
        return
    if name in ("h1", "h2", "h3", "h4", "h5", "h6"):
        level = min(int(name[1]) + 1, 6)  # 降一级
        t = node.get_text(strip=True)
        if t:
            yield ("#" * level) + " " + t
        return
    if name == "p":
        t = render_inline(node, url_to_local).strip()
        t = re.sub(r"\s*\n\s*", " ", t)
        if t:
            yield t
        return
    if name == "img":
        url = node.get("data-src") or node.get("src") or ""
        local = url_to_local.get(url)
        if local:
            alt = (node.get("alt") or "").strip()
            yield f"![{alt}]({local})"
        return
    if name == "pre":
        yield "```\n" + node.get_text().rstrip("\n") + "\n```"
        return
    if name in ("ul", "ol"):
        for i, li in enumerate(node.find_all("li", recursive=False), 1):
            t = re.sub(r"\s*\n\s*", " ", render_inline(li, url_to_local).strip())
            if t:
                yield (f"{i}. {t}" if name == "ol" else f"- {t}")
        return
    if name == "blockquote":
        inner = "\n".join(t for t in (render_inline(c, url_to_local) for c in node.children) if t.strip())
        for line in inner.splitlines():
            yield "> " + line
        return
    if name in ("section", "div", "article", "main"):
        for c in node.children:
            yield from render_block(c, url_to_local)
        return
    for c in node.children:
        yield from render_block(c, url_to_local)


def convert_body(body: Tag, url_to_local: dict) -> str:
    blocks = []
    for b in render_block(body, url_to_local):
        b = b.strip()
        if b:
            blocks.append(b)
    return "\n\n".join(blocks)


# ---------- main ----------
def main():
    ap = argparse.ArgumentParser(description="Sync a WeChat article to a local blog post.")
    ap.add_argument("url", nargs="?", help="WeChat article URL (or omit and use --html)")
    ap.add_argument("--html", help="pre-fetched HTML file path (fallback if direct fetch blocked)")
    ap.add_argument("--slug", help="English slug for the post (recommended). If omitted, uses wechat-<date> and warns.")
    ap.add_argument("--category", default="AI", help="frontmatter category (default AI)")
    ap.add_argument("--tags", default="", help="comma-separated tags (default: none)")
    ap.add_argument("--date", help="publish date YYYY-MM-DD (default: extracted from article)")
    args = ap.parse_args()

    if not args.url and not args.html:
        ap.error("provide a URL or --html FILE")
    url = args.url or "(from --html)"

    # 1. fetch
    print(f"[1/7] fetching {'URL' if args.url else '--html'} ...")
    html = fetch_html(args.url, args.html)
    if "js_content" not in html and "rich_media_content" not in html:
        err("HTML has no #js_content — not a WeChat article, or fetch was blocked. Try --html with a webfetch tool result.")
        sys.exit(2)
    print(f"      fetched {len(html)} bytes")

    soup = BeautifulSoup(html, "html.parser")
    meta = extract_meta(soup, url)
    if not meta.get("og:title"):
        err("could not extract og:title — is this a WeChat article?")
        sys.exit(2)

    date = args.date or extract_publish_date(html) or datetime.date.today().strftime("%Y-%m-%d")
    try:
        y, m, _ = date.split("-")
        y, m = y, m.zfill(2)
    except Exception:
        err(f"bad date: {date} (use YYYY-MM-DD)")
        sys.exit(2)

    slug = args.slug or f"wechat-{date.replace('-', '')}"
    if not args.slug:
        print(f"      WARN: --slug not given; using fallback '{slug}'. Rename the files/post dir later.")

    author = meta.get("og:article:author") or meta.get("author") or "原作者"
    title = meta["og:title"]
    description = meta.get("og:description", "")
    cover_url = meta.get("og:image", "")
    tags = [t.strip() for t in args.tags.split(",") if t.strip()] if args.tags else []

    # 2. extract body + images
    print("[2/7] extracting body + images ...")
    body = soup.find("div", id="js_content") or soup.find("div", class_=re.compile("rich_media_content"))
    if not body:
        err("no #js_content body found")
        sys.exit(2)

    img_dir = os.path.join(REPO, IMG_BASE, y, m)
    post_dir = os.path.join(REPO, POST_BASE, y, m)
    os.makedirs(img_dir, exist_ok=True)
    os.makedirs(post_dir, exist_ok=True)

    url_to_local = {}
    img_list = []  # (url, disk, local)
    for img in body.find_all("img"):
        u = img.get("data-src") or img.get("src") or ""
        if "mmbiz.qpic.cn" not in u or u in url_to_local:
            continue
        idx = len(img_list) + 1
        ext = ext_for(u)
        local = f"/images/posts/{y}/{m}/{slug}-{idx:02d}.{ext}"
        disk = os.path.join(img_dir, f"{slug}-{idx:02d}.{ext}")
        url_to_local[u] = local
        img_list.append((u, disk, local))

    markdown_body = convert_body(body, url_to_local)

    # 3. download images (idempotent)
    print(f"[3/7] downloading {len(img_list)} article image(s) ...")
    for u, disk, _ in img_list:
        if os.path.exists(disk) and os.path.getsize(disk) > 0:
            print(f"      [skip] {os.path.basename(disk)} exists")
            continue
        print(f"      [get]  {os.path.basename(disk)}")
        r = requests.get(u, headers=FETCH_HEADERS, timeout=30)
        r.raise_for_status()
        with open(disk, "wb") as f:
            f.write(r.content)
        print(f"             -> {len(r.content)} bytes")

    # 4. cover
    cover_local = ""
    if cover_url:
        cover_ext = ext_for(cover_url) if cover_url.lower().endswith(cover_url[-3:].lower()) else "jpg"
        cover_ext = "jpg" if "jpeg" in cover_url.lower() or "/sz_mmbiz_jpg" in cover_url.lower() or "wx_fmt=jpeg" in cover_url.lower() else cover_ext
        cover_ext = cover_ext or "jpg"
        cover_local = f"/images/posts/{y}/{m}/{slug}-cover.{cover_ext}"
        cover_disk = os.path.join(img_dir, f"{slug}-cover.{cover_ext}")
        print("[4/7] downloading cover ...")
        if os.path.exists(cover_disk) and os.path.getsize(cover_disk) > 0:
            print(f"      [skip] {os.path.basename(cover_disk)} exists")
        else:
            r = requests.get(cover_url, headers=FETCH_HEADERS, timeout=30)
            r.raise_for_status()
            with open(cover_disk, "wb") as f:
                f.write(r.content)
            print(f"      -> {os.path.basename(cover_disk)} {len(r.content)} bytes")

    # 5. write post
    print("[5/7] writing post ...")
    post_path = os.path.join(post_dir, f"{slug}.md")
    fm = {
        "title": title,
        "date": date,
        "description": description,
        "category": args.category,
        "tags": tags,
        "cover": cover_local,
    }
    # hand-format frontmatter so date stays a quoted string (gray-matter parses bare YYYY-MM-DD as Date)
    def q(s):
        return '"' + str(s).replace('"', '\\"') + '"'

    fm_str = "---\n"
    fm_str += f"title: {q(title)}\n"
    fm_str += f'date: "{date}"\n'
    fm_str += f"description: {q(description)}\n"
    fm_str += f'category: "{args.category}"\n'
    fm_str += f"tags: [{', '.join(q(t) for t in tags)}]\n"
    fm_str += f'cover: "{cover_local}"\n'
    fm_str += "---\n\n"
    attribution = f"> 原文发表于微信公众号「{author}」，[原文链接]({url})。\n\n"
    full = fm_str + attribution + markdown_body + "\n"
    with open(post_path, "w", encoding="utf-8") as f:
        f.write(full)
    print(f"      -> {os.path.relpath(post_path, REPO)}")

    # 6. verify
    print("[6/7] verifying ...")
    ok = True
    with open(post_path, encoding="utf-8") as f:
        raw = f.read()
    raw_body = raw.split("---", 2)[2] if raw.startswith("---") else raw
    try:
        fm_parsed = yaml.safe_load(raw.split("---", 2)[1])
        date_is_str = isinstance(fm_parsed.get("date"), str)
        print(f"      frontmatter parsed OK; date is string: {date_is_str}")
        if not date_is_str:
            ok = False
    except Exception as e:
        err(f"frontmatter YAML parse failed: {e}")
        ok = False
    img_refs = re.findall(r"!\[[^\]]*\]\(([^)]+)\)", raw_body)
    print(f"      {len(img_refs)} image ref(s) in body")
    for p in img_refs:
        disk = os.path.join(REPO, "public", p.lstrip("/"))
        exists = os.path.exists(disk) and os.path.getsize(disk) > 0
        if not exists:
            err(f"      MISSING image: {p}")
            ok = False
    if cover_local:
        cdisk = os.path.join(REPO, "public", cover_local.lstrip("/"))
        if not (os.path.exists(cdisk) and os.path.getsize(cdisk) > 0):
            err(f"      MISSING cover: {cover_local}")
            ok = False

    # 7. summary
    print("[7/7] done.")
    print("\n=== SUMMARY ===")
    print(f"post:   {os.path.relpath(post_path, REPO)}")
    print(f"images: {os.path.relpath(img_dir, REPO)}/ ({len(img_list)} + cover)")
    print(f"route:  /posts/{y}/{m}/{slug}/")
    print(f"verify: {'PASS' if ok else 'FAIL'}")
    print("\n下一步:")
    print(f"  npm run build   # 确认路由 /posts/{y}/{m}/{slug}/ 生成")
    print("  git add the post + images, commit, push, deploy")
    print("  review the post; fix any WeChat editor artifacts (e.g. doubled chars from split spans)")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
