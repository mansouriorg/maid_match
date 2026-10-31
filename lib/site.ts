export const SITE_NAME = "MaidMatch";

// The public address of the site, without a trailing slash. Set
// NEXT_PUBLIC_SITE_URL in .env to the real address when the site goes online.
// The default is only meant for local development.
export const siteUrl: string = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");
