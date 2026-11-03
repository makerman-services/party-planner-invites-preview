/* Optional AI mode. Leave aiEndpoint empty to stay fully in-browser. Point it at the api/ server to switch AI ideas on.
   appName: the product name in ONE place (Mal's choice; Legal: always shown as "My Party by Makerman Services", two words, no ®). Change it here to rename the app. */
window.PP_CONFIG = { aiEndpoint: '', appName: 'My Party', brand: 'by Makerman Services',
  /* Separate invitation app (its own repo + service). Empty = button hidden. */
  inviteAppUrl: 'https://makerman-services.github.io/invite-engine-preview/' };
