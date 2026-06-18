# Evolve Mobiles Premium Multi-Page Catalogue Plan

## Summary

Build a premium, mobile-first Evolve Mobiles website as a frontend catalogue and lead-generation site. The first version will not include database, admin, payments, or authentication; it will use curated local product data and route every buying, exchange, and service action through WhatsApp.

Use a dark luxury tech style: obsidian background, electric cobalt CTAs, restrained gold offer accents, real phone/product imagery, dense premium catalogue layouts, and a fixed WhatsApp connect button at the lower-right of every page.

## Key Changes

- Convert the original 12-week platform plan into a focused multi-page premium catalogue.
- Build these routes:
  - `/` premium homepage with hero, featured phones, brand strip, deal section, services, and store trust signals.
  - `/phones` catalogue grid with search, brand chips, price filters, storage/RAM filters, and sort controls.
  - `/phones/[slug]` product detail page with gallery, specs, variants, EMI estimate, exchange CTA, and WhatsApp enquiry.
  - `/offers` current deals, exchange bonuses, EMI offers, and limited-time banners.
  - `/exchange` exchange estimator-style page with device/condition inputs and WhatsApp booking CTA.
  - `/service` repair/service booking presentation with issue categories and WhatsApp booking CTA.
  - `/stores` Chennai store/contact page with address cards, hours, click-to-call, and map embed placeholder.
- Add a fixed lower-right WhatsApp connect component:
  - Desktop: pill button with WhatsApp icon and text like "Chat on WhatsApp".
  - Mobile: compact circular button above the browser safe area.
  - Opens `https://wa.me/<number>?text=<encoded message>`.
  - Uses contextual messages per page/product, for example product name and selected variant on product detail pages.
- Use local seed data for brands, products, offers, specs, services, and stores so the frontend is complete without a backend.
- Keep "Add to Cart" out of v1 unless it redirects to WhatsApp enquiry; no fake checkout.

## Implementation Changes

- Use **Next.js App Router + TypeScript + Tailwind CSS + Lucide React** to match the original premium plan and keep SEO-friendly routing.
- Store catalogue data in local typed modules, for example products, brands, offers, stores, and service categories.
- Create shared UI components:
  - Navbar with sticky dark glass treatment and mobile menu.
  - Footer with store/contact/service links.
  - ProductCard, OfferCard, BrandChip, SpecsTable, FilterBar, WhatsAppButton.
  - FloatingWhatsApp component mounted globally in the root layout.
- Design requirements:
  - Premium dark UI with cobalt primary actions and gold only for deals/discounts.
  - No oversized generic landing page; the first viewport must immediately signal Evolve Mobiles and phone shopping.
  - Use real phone/product images or reliable remote image URLs, with stable dimensions and `next/image`.
  - Mobile layout must prioritize catalogue browsing, thumb-friendly filters, and persistent WhatsApp conversion.
- SEO basics:
  - Unique metadata per route.
  - Product detail pages get product-style titles/descriptions.
  - Homepage targets "mobile shop Chennai".
  - Offers page targets "mobile phone offers Chennai".
- WhatsApp behavior:
  - Global button default message: "Hi Evolve Mobiles, I want to know today's mobile offers."
  - Product page message: "Hi Evolve Mobiles, I'm interested in [Product] [Variant]. Please share best price and availability."
  - Exchange page message includes selected old phone and condition when available.
  - Service page message includes selected repair issue when available.

## Test Plan

- Run lint/type/build checks after implementation.
- Manually verify:
  - All routes load on desktop and mobile widths.
  - Lower-right WhatsApp button is visible, not overlapping content, and opens the correct encoded `wa.me` URL.
  - Product filters/search/sort work on `/phones`.
  - Product detail pages render correct product data and contextual WhatsApp messages.
  - Mobile navigation opens/closes correctly.
  - Text does not overflow buttons/cards at 375px, 414px, 768px, 1280px, and 1920px.
- Use browser screenshots if a dev server is started, especially for homepage, catalogue, product detail, and mobile WhatsApp placement.

## Assumptions

- The first implementation is frontend-only with local data; backend, admin, database, Razorpay, Redis, and Cloudinary are deferred.
- The WhatsApp number will use the placeholder from the plan until a real number is provided.
- The project directory is currently empty, so implementation can scaffold a fresh Next.js app.
- Brand remains **Evolve Mobiles, Chennai**.
- Primary conversion goal is WhatsApp enquiry, followed by store visit and phone call.
