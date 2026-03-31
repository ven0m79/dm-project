# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server
npm run lint       # Run ESLint
```

No test suite is configured.

## Architecture

**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind CSS + WooCommerce headless

### Routing

All user-facing pages live under [app/\[locale\]/](app/[locale]/) for i18n. Supported locales are `ua` (default) and `en`, handled by **next-intl** with `prefix: "as-needed"` — Ukrainian URLs have no prefix, English gets `/en/`.

[middleware.ts](middleware.ts) (proxy.ts) handles:
- `www.` → canonical redirects (301)
- Legacy URL → new catalog URL redirects
- Proxying `/info/*` to `https://info.dm-project.com.ua` (WordPress site)
- Injecting `noindex` robots tag on test domains

### Data Layer

Products and categories come from WooCommerce via REST API. Cached server-side fetch functions live in [utils/woocommerce.ts](utils/woocommerce.ts) using React `cache()`:
- `fetchWooCommerceCategories(locale)` — all categories
- `fetchWooCommerceProductsBasedOnCategory(id, locale)` — products per category
- `fetchWooCommerceProductDetails(id, locale)` — single product with variations
- `fetchWooCommerceProductsTitles(searchTerm, locale)` — search

API route handlers at [app/api/](app/api/) proxy WooCommerce calls and handle contact form submissions via **Resend**.

### Component Structure

Components follow atomic design under [app/\[locale\]/components/](app/[locale]/components/):
- `atoms/` — smallest reusable pieces (Button, Loader, Breadcrumbs)
- `molecules/` — composed components (Header, Footer, Slider, Sidebar, GoogleMaps)
- `templates/` — page-level layout wrappers
- `contexts/` — React Context (product sidebar filter state)
- `hooks/` — custom hooks (`useIsMobile`)

Most components are Server Components by default; interactive ones carry `"use client"`.

### Styling

Tailwind CSS utilities are primary. CSS Modules (`*.module.css`) handle component-scoped styles. Theme values use CSS custom properties (HSL variables). Use `cn()` from [app/\[locale\]/components/molecules/lib/cn.ts](app/[locale]/components/molecules/lib/cn.ts) for conditional class merging (`clsx` + `tailwind-merge`).

### i18n

Translation strings are in [messages/ua.json](messages/ua.json) and [messages/en.json](messages/en.json). In Server Components use `getTranslations()`; in Client Components use `useTranslations()`. Translation namespaces map to page names (e.g. `Index`, `Catalog1`).

### Path Aliases (tsconfig)

```
@app/*      → ./app/*
@atoms/*    → ./app/components/atoms/*
@molecules/ → ./app/components/molecules/*
@pages/*    → ./pages/*
```