<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:wechat-sync-workflow -->
# 同步微信公众号文章到博客（固化流程）

当用户给出 `mp.weixin.qq.com` 链接并表达「同步/发布到博客」意图时，**不要从头手写**。直接用固化脚本，并按下面约定补齐 agent 该做的判断。

## 触发

- 用户给微信文章链接 + 「同步到博客 / 发到 blog / 保存到本地」等表述
- 只给链接即可，其余由 agent 推断

## 工具

```bash
python3 scripts/sync_wechat.py "<url>" --slug <英文slug> [--category AI] [--tags "a,b,c"] [--date YYYY-MM-DD] [--html <预抓HTML路径>]
```

脚本自动完成：抓取 → 提取 meta + 发表日（从 `publish_time` 时间戳）→ 提取正文 DOM 转 GFM Markdown → 图片按文档顺序下载到 `public/images/posts/<年>/<月>/<slug>-NN.<ext>`（带微信 Referer/UA 防盗链）→ 封面取 og:image → 写文章 → 自校验（gray-matter 解析、date 为字符串、所有引用图片落盘）。

## agent 必须做的判断（脚本做不了）

1. **slug**：参照已有文章命名（描述性英文，如 `claw-code`、`agent-local-deploy-tanks`），据标题/内容选一个，传 `--slug`。不给会用 `wechat-<date>` 兜底并告警，须事后重命名。
2. **category**：据内容给（如 `AI` / `Rust` / `Linux` / `前端` / `设计`）。默认 `AI`。
3. **tags**：据内容给，逗号分隔。
4. **date**：默认取文章原始发表日；若用户要「今天发布」才传 `--date` 覆盖。

## 固化约定（已写进脚本，勿改）

- 文章：`src/content/posts/<年>/<月>/<slug>.md`
- 图片：`public/images/posts/<年>/<月>/<slug>-NN.<ext>` + `<slug>-cover.jpg`，正文用绝对路径引用
- frontmatter：`title / date(字符串) / description / category / tags / cover`
- 正文 `h1` 降级为 `##`（保证文章页 H1 唯一为标题）
- 顶部加引用注明原文出处与链接
- 博客用 react-markdown 无 `rehype-raw`，**必须转纯 Markdown**，不能塞原始 HTML
- 图片下载幂等（已存在则跳过）

## 跑完之后（验证，必做）

1. `npm run build` — 确认 `/posts/<年>/<月>/<slug>/` 路由生成、无类型错误
2. 抽查生成的 post 文件，**修微信编辑器残留**（如相邻 span 各贡献一个字造成的「用用」之类重复字，这是明显的编辑产物非作者意图）
3. 确认图片为有效图片（`file <img>` 非 HTML 错误页）
4. 报告：文章路径、图片数、路由、验证结果；提示用户提交+推送+部署
<!-- END:wechat-sync-workflow -->
