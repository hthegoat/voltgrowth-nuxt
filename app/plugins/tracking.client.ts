// Runs once in the browser: saves ad click IDs, loads the Google tag,
// and counts taps on any tel: link (header, footer, anywhere) as a phone conversion.
export default defineNuxtPlugin(() => {
  captureAttribution()
  loadGoogleTag()

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as Element | null
      if (target?.closest?.('a[href^="tel:"]')) trackCallClick()
    },
    { capture: true },
  )
})
