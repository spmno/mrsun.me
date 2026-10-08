#!/usr/bin/env node
// Submit every URL from dist/sitemap.xml to IndexNow (Bing/Yandex/Naver/Seznam; Google does not use it).
// Run AFTER the deploy is live: IndexNow fetches public/<key>.txt at the site root to verify ownership.
// Usage: node scripts/submit-indexnow.mjs [--dry-run]
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITEMAP_PATH = 'dist/sitemap.xml';
const PUBLIC_DIR = 'public';
const KEY_FILE_RE = /^[a-z0-9-]{8,128}\.txt$/; // IndexNow spec: key = 8-128 chars of [a-z0-9-], file name is the key
const MAX_URLS_PER_REQUEST = 10000;

async function loadKey() {
  const candidates = (await readdir(PUBLIC_DIR)).filter((name) => KEY_FILE_RE.test(name));
  if (candidates.length === 0) {
    throw new Error(
      `No IndexNow key file (<key>.txt) found in ${PUBLIC_DIR}/. Create one with \`openssl rand -hex 16\`, write it to public/<key>.txt, and rebuild.`
    );
  }
  if (candidates.length > 1) {
    throw new Error(
      `Multiple IndexNow key files in ${PUBLIC_DIR}/: ${candidates.join(', ')} — keep exactly one.`
    );
  }
  const key = (await readFile(join(PUBLIC_DIR, candidates[0]), 'utf8')).trim();
  if (key.length < 8) {
    throw new Error(`Key file ${candidates[0]} is empty or too short — it must contain the key itself.`);
  }
  return key;
}

function parseSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');

  const urls = parseSitemapUrls(await readFile(SITEMAP_PATH, 'utf8'));
  if (urls.length === 0) {
    throw new Error(`No <loc> entries in ${SITEMAP_PATH} — run \`npm run build\` first.`);
  }
  if (urls.length > MAX_URLS_PER_REQUEST) {
    throw new Error(`${urls.length} URLs exceed the ${MAX_URLS_PER_REQUEST}-URL single-request limit.`);
  }

  const site = new URL(urls[0]);
  const key = await loadKey();
  const keyLocation = `${site.origin}/${key}.txt`;

  if (dryRun) {
    console.log('[dry-run] endpoint   :', ENDPOINT);
    console.log('[dry-run] host       :', site.host);
    console.log('[dry-run] keyLocation:', keyLocation);
    console.log(`[dry-run] URLs (${urls.length}):`);
    for (const url of urls) console.log('  ', url);
    return;
  }

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: site.host, key, keyLocation, urlList: urls }),
  });

  if (response.ok) {
    const note = response.status === 202 ? ' (accepted — key validation still in progress)' : '';
    console.log(`HTTP ${response.status}${note} — submitted.`);
    return;
  }
  const body = await response.text();
  throw new Error(`IndexNow returned HTTP ${response.status}${body ? `: ${body}` : ''}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
