# Underdial — Marketing & Content Site

The public-facing site at https://underdial.com. Built with Astro,
deployed through GitHub Pages from `/docs`.

## Local development

```bash
cd web
npm install
npm run dev    # http://localhost:4321
```

## Build

```bash
npm run build
```

Output is in `web/dist`.

## Deploy

GitHub Pages serves `/docs` from `main`. Day-to-day deploy is one
script + one push:

```bash
cd web
npm run build
bash scripts/deploy-to-docs.sh
cd ..
git add docs && git commit -m "publish: <what changed>" && git push
```

GitHub Pages picks up the change and rebuilds in ~60 sec.

The repo must be **public** OR on a paid GitHub plan for Pages to
work. After the first publish, verify Pages is configured at:
Settings → Pages → Source = "Deploy from a branch", Branch = `main`,
Folder = `/docs`.

(Optional, after publishing new articles) ping IndexNow so search
engines re-crawl quickly:

```bash
PUBLIC_INDEXNOW_KEY=<your-key> bash scripts/indexnow-ping.sh
```

## Structure

```
web/
├── public/                 # static assets copied verbatim to dist/
│   ├── CNAME
│   ├── robots.txt          # allows AI crawlers explicitly
│   ├── llms.txt            # canonical content index for LLMs
│   ├── favicon.png
│   └── icon-512.png
├── src/
│   ├── consts.ts           # single source of truth for SITE config
│   ├── content/
│   │   ├── config.ts       # collection schemas (articles, pillar)
│   │   ├── articles/       # detail-tier posts (markdown/MDX)
│   │   └── pillar/         # pillar pages (markdown/MDX)
│   ├── components/
│   │   ├── schema/         # JSON-LD components per schema type
│   │   ├── QuickAnswer.astro
│   │   ├── FAQ.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ArticleLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       ├── features.astro
│       ├── support.astro
│       ├── privacy.astro
│       ├── terms.astro
│       ├── delete-account.astro
│       ├── 404.astro
│       └── articles/
│           ├── index.astro
│           └── [...slug].astro
└── astro.config.mjs        # sitemap + MDX integrations
```

## SEO / AEO infrastructure

This site is set up against the SEO/Content/ASO playbook in `~/.claude/CLAUDE.md`.

- **Schema** — JSON-LD on every page: `Organization` + `WebSite` (global),
  `MobileApplication` (homepage, with `applicationSubCategory: Watches`),
  `AboutPage` + `Person` (about page), `Article` + `Speakable` (articles),
  `BreadcrumbList`, `FAQPage`.
- **AEO** — `llms.txt` at root, `robots.txt` allows AI crawlers, every page
  has a Quick Answer block (id="quick-answer") that Speakable schema points
  at, FAQ at the bottom of content pages with `FAQPage` schema.
- **E-E-A-T** — `/about` is the entity anchor with founder bio and editorial
  standards. Articles are bylined and dated.
- **Sitemap** — generated automatically on each build by `@astrojs/sitemap`.

## Affiliate disclosure

Some watch detail pages and articles include "Buy from" links to
retailers via the Awin affiliate network. These are affiliate links — see
the footer and `/terms` for the disclosure language. Pages that include
affiliate links must surface that fact near the link itself, per FTC guidance.

## Adding a new article

Create a markdown file under `src/content/articles/`. Frontmatter is enforced
by `src/content/config.ts`.

```markdown
---
title: "What's the best watch movement under $1,000?"
description: "Field-tested answer for buyers comparing automatic, quartz, and Meca-Quartz movements in the sub-$1,000 band."
tier: "cluster"
targetQuery: "best watch movement under 1000"
relatedQueries:
  - "automatic vs quartz watch"
  - "is a Seiko automatic worth it"
quickAnswer: "Under $1,000, a Japanese or Swiss automatic (Seiko, Miyota, Sellita) gives you mechanical character and decent accuracy, while a good quartz movement is more accurate and lower-maintenance. Pick automatic for the hobby and feel, quartz for set-and-forget daily wear."
publishedAt: "2026-06-14"
author: "Bob Guillow"
relatedSlugs:
  - "watch-archetypes-explained"
faqs:
  - q: "Is an automatic watch worth it under $1,000?"
    a: "Yes, if you value the sweeping seconds hand and the mechanical hobby. Expect ±15-25 seconds per day and a service every several years. If accuracy and zero maintenance matter more, quartz wins at any price."
---

Body content here. Use H2 questions like "What does an automatic movement cost
to own?" — these become AI extraction targets.
```
