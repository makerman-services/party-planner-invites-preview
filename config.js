/* Optional AI mode. Leave aiEndpoint empty to stay fully in-browser. Point it at the api/ server to switch AI ideas on.
   appName: the product name in ONE place (Mal's choice; Legal: always shown as "My Party by Makerman Services", two words, no ®). Change it here to rename the app. */
window.PP_CONFIG = { aiEndpoint: '', appName: 'My Party', brand: 'by Makerman Services',
  /* Separate invitation app (its own repo + service). Empty = button hidden. */
  inviteAppUrl: 'https://makerman-services.github.io/invite-engine-preview/',
  /* Full-page backgrounds (Legal-passed photo-real art, faded cream centre). Fixed layer behind everything; clicks pass through.
     Swap or add art here. notice = extra line shown wherever that page is used. Empty list = no picker. */
  pageArtLabel: 'AI-generated art, made with Grok Imagine',
  pageBgs: [
    /* Canva AI paid art (Legal pass /workspace/ops/legal/canva-paid-art-pass-2026-11-03.md, sources in ART-SOURCES.md). label overrides pageArtLabel. */
    { id: 'kids', name: "Kids' party table (photo)", src: 'img/canva-kids-page.webp', ai: true, label: 'Made with Canva AI' },
    { id: 'adult', name: 'Party tables (photo)', src: 'img/canva-adult-page.webp', ai: true, label: 'Made with Canva AI' },
    /* Grok Imagine (preview only; Mal 17:37: Imagine stays in posts and previews, remove before sale) */
    { id: 'seniors', name: 'Classic tea party (photo)', src: 'img/seniors-page-classic-faded.jpg', ai: true }
  ] };
