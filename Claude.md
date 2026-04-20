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

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + WooCommerce headless

### Routing

All user-facing pages live under [app/\[locale\]/](app/[locale]/) for i18n. Supported locales are `ua` (default) and `en`, handled by **next-intl** with `prefix: "as-needed"` — Ukrainian URLs have no prefix, English gets `/en/`. Locale detection is disabled; the default is always `ua`.

The i18n configuration lives in [i18n/routing.ts](i18n/routing.ts) (locale definitions), [i18n/request.ts](i18n/request.ts) (server config), and [i18n/navigation.ts](i18n/navigation.ts) (typed `Link`, `redirect`, etc.).

[proxy.ts](proxy.ts) is the actual middleware file (re-exported via `middleware.ts`). It handles:
- `www.` → canonical redirects (301)
- Legacy `/shares/*` URLs → new catalog product URLs or WordPress `/info/*` pages
- `/home` → `/` redirect
- `next-intl` locale middleware
- Injecting `X-Robots-Tag: noindex, nofollow` on test domains

Product URLs follow the pattern: `/catalog/sub-catalog/product/[productId]?category=[slug]`

### Data Layer

Products and categories come from WooCommerce via REST API. The WooCommerce client is initialized in [utils/woocommerce.setup.ts](utils/woocommerce.setup.ts) using `@woocommerce/woocommerce-rest-api` with Basic Auth (`WC_CONSUMER_KEY` / `WC_CONSUMER_SECRET`).

Cached server-side fetch functions live in [utils/woo.server.ts](utils/woo.server.ts) using React `cache()` with 300s revalidation:
- `getCategoriesCached(locale)` — all categories (paginated, per_page=100)
- `getProductsByCategoryCached(locale, categoryId)` — products for a category
- `getProductsByBrandCached(locale, categoryIds, brandId)` — products filtered by brand
- `getCategoryBySlugCached(locale, slug)` — single category by slug
- `getCategoryAndProducts(locale, slug?, categoriesRaw?)` — combined category + products
- `buildBreadcrumbTrail(locale, categorySlug, productName?, productId?)` — walks parent hierarchy; excludes container category IDs `[50, 52, 55, 57]`

TypeScript types for WooCommerce models are in [utils/woocomerce.types.ts](utils/woocomerce.types.ts).

API routes at [app/api/](app/api/) proxy WooCommerce calls (`/api/woocommerce/`, `/api/woo/`, `/api/catalog/bootstrap`) and handle contact form submissions via **Resend** (`/api/send`, `/api/sendService`, `/api/sendProjectings`).

### Component Structure

Components follow atomic design under [app/\[locale\]/components/](app/[locale]/components/):
- `atoms/` — smallest reusable pieces (Button, Loader, Skeleton, Breadcrumbs, hreflang)
- `molecules/` — composed components (Header, Footer, Nav, Slider, Sidebar, GoogleMaps). Desktop/Mobile variants are split into separate files (e.g. `DesktopHeader.tsx`, `MobileHeader.tsx`).
- `templates/` — page-level layout wrappers (`MainLayout`)
- `contexts/` — React Context (product sidebar filter state)
- `hooks/` — `useIsMobile`, `useNavigateTo`, `useLocaleSwitcherHrefs`

Most components are Server Components by default; interactive ones carry `"use client"`.

### Styling

Tailwind CSS 4 utilities are primary. CSS Modules (`*.module.css`) handle component-scoped styles. Theme values use CSS custom properties (HSL variables). Use `cn()` from [utils/cn.ts](utils/cn.ts) for conditional class merging (`clsx` + `tailwind-merge`).

### i18n

Translation strings are in [messages/ua.json](messages/ua.json) and [messages/en.json](messages/en.json). In Server Components use `getTranslations()`; in Client Components use `useTranslations()`. Translation namespaces map to page names (e.g. `Index`, `Catalog1`, `Product`, `Header`, `Footer`).

### Environment Variables

Required at runtime:
- `NEXT_PUBLIC_WORDPRESS_RITE_URL` — WooCommerce API base URL
- `WC_CONSUMER_KEY` / `WC_CONSUMER_SECRET` — WooCommerce REST API credentials
- `NEXT_PUBLIC_GOOGLE_MAP_API` — Google Maps API key
- `RESEND_API_KEY_FOR_CONTACTS` / `RESEND_FROM` — Resend email service

See [.env-example](.env-example) for the full list.

### Path Aliases (tsconfig)

```
@app/*      → ./app/*
@atoms/*    → ./app/components/atoms/*
@molecules/ → ./app/components/molecules/*
@pages/*    → ./pages/*
```
