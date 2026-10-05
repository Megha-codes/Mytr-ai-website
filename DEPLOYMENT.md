# Deployment

This site is a Next.js app with `output: 'export'` (see `next.config.mjs`) —
`npm run build` produces a fully static `out/` directory, which is what
actually gets served. There is no CI/CD; deploys are manual, over SSH.

## Server layout

Everything lives on one VPS (`srv927140`) that also hosts other, unrelated
sites (esyprocure.com, api.mytr.ai, triyambaq.com) via the same nginx
install — don't assume mytr.ai is the only thing on this box.

| What | Path |
|---|---|
| Git clone (source of truth) | `/root/CODES/mytrai/Mytr-ai-website` |
| Live docroot (nginx `root`) | `/var/www/mytr-website/out` |
| ⚠️ Looks similar, **not used** | `/var/www/mytr-ai-website` — a stray/stale copy from a past mistaken deploy; nginx does not point here. Safe to ignore or delete. |

The two `/var/www/mytr*` paths are one character apart (`mytr-website` vs.
`mytr-ai-website`) and it's easy to rsync into the wrong one — confirm the
real docroot first if ever in doubt:

```
nginx -T 2>/dev/null | grep -i "server_name\|root "
```

## Deploy steps

```
cd /root/CODES/mytrai/Mytr-ai-website
git pull
npm run build
rsync -a --delete --exclude 'mytr-ai.apk' out/ /var/www/mytr-website/out/
```

Verify:

```
curl -s https://mytr.ai/spike-lab | grep -o '<title>[^<]*</title>'
```

If this is a brand-new clone (no `node_modules/`), run `npm install` before
`npm run build`.

## The APK file

`/var/www/mytr-website/out/mytr-ai.apk` is **not** part of the Next.js
build — it's a large (~57MB) binary that was placed on the server by hand
and isn't tracked in this repo. `rsync --delete` would otherwise wipe it
out on every deploy, which is why it's excluded above. The site links to
it at `/mytr-ai.apk` (`app/page.jsx`, `app/components/Nav.jsx`) — if the
file is ever moved or renamed on the server, those links need updating to
match.

## Local dev notes (Windows)

If `npm`/`node` aren't found in PowerShell, the PATH needs a manual fix
for that session:

```
$env:Path += ";C:\Program Files\nodejs"
```
