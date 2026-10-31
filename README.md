# MaidMatch - booking site

The public website of MaidMatch, a home-cleaning service in France. A visitor
describes the home, picks the days they are available and a time slot, sees an
estimated price, and sends a request. The team then confirms by phone.

This is one of three projects that work together:

| Project | Role | Main tools |
| --- | --- | --- |
| [maid_match](https://github.com/mansouriorg/maid_match) | Public booking site | Next.js 16, React 19, Tailwind CSS 4, Zustand |
| [maid_match_admin](https://github.com/mansouriorg/maid_match_admin) | Back office for the team | Next.js 16, Socket.IO client |
| [maid_match_serveur](https://github.com/mansouriorg/maid_match_serveur) | REST API and live notifications | NestJS 11, Prisma 7, PostgreSQL |

## What it does

- A four-step booking wizard covering the contact details, the home (type,
  rooms, bathrooms, address, cleaning type, extras), the days and time slot,
  and a final summary. Progress is kept in the browser, so a visitor can come
  back later and continue.
- An estimated price based on the hourly rate set in the admin. The server
  always computes the final price again; the site never decides it.
- Messages appear in the page, next to the field concerned, instead of pop-ups.
- Legal notice and privacy pages (`/mentions-legales` and `/privacy`). All the
  company details come from one file, `lib/business.ts`.
- Search and sharing: page titles and descriptions, `sitemap.xml`,
  `robots.txt`, and a sharing picture generated at build time.
- Accessibility: every field has a label, buttons have names, selected options
  are announced, keyboard focus is visible, text contrast is at least 4.5:1,
  and animations stop when the visitor asks for reduced motion.

## Run it locally

Requirements: Node.js 24.22.1 or newer (`nvm use` picks version 24 from
`.nvmrc`) and pnpm 10. The API must be running on http://localhost:3000.

    cp .env.example .env
    pnpm install
    pnpm dev -p 3001

Then open http://localhost:3001.

## Settings

Both values are public (they end up in the browser), so never put a secret here.

- `NEXT_PUBLIC_API_URL`: address of the API (default http://localhost:3000).
- `NEXT_PUBLIC_SITE_URL`: public address of this site, used for the sitemap and
  the sharing picture.

## Checks

    pnpm exec eslint .
    pnpm exec tsc --noEmit
    pnpm build

## Where things are

- `app/`: the pages (home, booking, success, legal notice, privacy, not found).
- `features/booking-wizard/`: the wizard steps and their shared state
  (`store/use-wizard-store.ts`).
- `lib/site.ts`: site name and address. `lib/business.ts`: company details for
  the legal pages.

## Dependencies

pnpm only installs package versions that are at least 14 days old
(`minimumReleaseAge` in `pnpm-workspace.yaml`). This protects against a
malicious version being published and installed before anyone notices. A
security fix that cannot wait is listed by name under
`minimumReleaseAgeExclude` and pinned to an exact version in `overrides`.
