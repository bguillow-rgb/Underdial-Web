// Site-wide constants. Single source of truth for the Astro site.
// Update these as the project evolves; everything else (schema, footer,
// social cards, llms.txt) reads from here.

export const SITE = {
  name: 'Underdial',
  // Legal operating entity behind the app/site. Surfaced in the footer and
  // Organization schema (legalName) for brand-entity consistency, and mirrors
  // the App Store developer display name.
  legalEntity: 'Timberline Ventures LLC',
  tagline: 'The Watch Buyer\u2019s Advisor',
  description:
    'Underdial is an iOS app for watch buyers. Check any watch under $1,000 against the collection you already own, your budget, and your wrist size, get a clear verdict, spot cheaper alternatives to the same style, and audit your whole box.',
  url: 'https://underdial.com',
  locale: 'en-US',
  supportEmail: 'support@underdial.com',
  // Set when the App Store listing is live. Until then, download CTAs show a
  // \u201Ccoming soon\u201D state instead of a broken link.
  appStoreUrl: '', // e.g. 'https://apps.apple.com/app/underdial/id0000000000'
  bundleId: 'com.bobguillow.underdial',
  appleTeamId: 'ZNS5TNLB2D',
  // Founder / publisher, used for Person and Organization schema. The
  // /about page is the canonical entity anchor.
  founder: {
    name: 'Bob Guillow',
    role: 'Founder',
    sameAs: [
      // Add LinkedIn / X / GitHub when ready. Empty entries are filtered out
      // before rendering so it\u2019s safe to leave them blank.
      // 'https://www.linkedin.com/in/...',
      // 'https://x.com/...',
    ],
  },
  // Organization-level sameAs, canonical identifiers for the brand entity.
  // Used in OrganizationSchema. Add Underdial\u2019s Wikidata QID here once the
  // entity exists to close the Knowledge-Graph chain.
  orgSameAs: [] as string[],
  // Analytics + tracking. All values come from env vars at build time so
  // local builds and forks don't fire analytics.
  analytics: {
    ga4Id: import.meta.env.PUBLIC_GA4_ID ?? '',
    gscVerification: import.meta.env.PUBLIC_GSC_VERIFICATION ?? '',
    indexNowKey: import.meta.env.PUBLIC_INDEXNOW_KEY ?? '',
  },
  // Brand colors, cool graphite + antique brass. Mirrors the watch
  // category: technical dials, steel cases, warm metal hands and indices on a
  // light, legible background.
  theme: {
    bg: '#0D1015',      // dial black (instrument background)
    card: '#161C25',    // raised panel
    text: '#ECEFF4',    // lume white
    muted: '#9AA4B2',   // steel
    accent: '#C9A24B',  // brass
    border: '#2E3744',
  },
};

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Blog', href: '/articles' },
  { label: 'About', href: '/about' },
  { label: 'Support', href: '/support' },
];

export const FOOTER_NAV = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Delete Data', href: '/delete-account' },
];
