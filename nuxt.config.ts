import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    // Set NUXT_LEAD_WEBHOOK_URL in your environment (Zapier, Make, Slack, Google Sheets, etc.).
    // Form submissions are POSTed there as JSON. Without it, leads are only logged to the server console.
    leadWebhookUrl: '',
  },
  app: {
    head: {
      title: 'Go Kugs Volt | Google Ads for electrical contractors',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Google Ads and Local Services Ads for electrical contractors, run by Harrison at Go Kugs. One electrician per service area.',
        },
        { name: 'theme-color', content: '#f6f7f5' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          // FONT: swap this URL together with the font variables in app/assets/css/main.css
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400..900&display=swap',
        },
      ],
    },
  },
})
