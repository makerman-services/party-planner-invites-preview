/* Optional AI mode. Leave aiEndpoint empty to stay fully in-browser. Point it at the api/ server to switch AI ideas on.
   appName: the product name in ONE place (Mal's choice; Legal: always shown as "My Party by Makerman Services", two words, no ®). Change it here to rename the app. */
window.PP_CONFIG = { aiEndpoint: '', appName: 'My Party', brand: 'by Makerman Services',
  /* Separate invitation app (its own repo + service). Empty = button hidden. */
  inviteAppUrl: 'https://makerman-services.github.io/invite-engine-preview/',
  /* Full-page backgrounds (Legal-passed photo-real art, faded cream centre). Fixed layer behind everything; clicks pass through.
     Swap or add art here. notice = extra line shown wherever that page is used. Empty list = no picker. */
  pageArtLabel: 'AI-generated art, made with Grok Imagine',
  pageBgs: [
    { id: 'kids', name: "Kids' party: clown, magician & party table (photo)", src: 'img/kids-page-party-v2-faded.jpg', ai: true, notice: 'Illustration only. Entertainers are booked by the host.' },
    { id: 'adult', name: 'Party tables (photo)', src: 'img/adult-page-elegant-faded.jpg', ai: true },
    { id: 'seniors', name: 'Classic tea party (photo)', src: 'img/seniors-page-classic-faded.jpg', ai: true }
  ] };
