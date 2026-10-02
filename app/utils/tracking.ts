import { site } from '~/data/site'

/**
 * Ad click tracking.
 * - Saves gclid / gbraid / wbraid and UTM tags when someone lands from an ad, so they
 *   travel with the lead into the Google Sheet (needed for offline conversion uploads).
 * - Loads the Google tag and fires conversions, but only once IDs are set in data/site.ts.
 */

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const STORAGE_KEY = 'gkv_attribution'
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000 // Google Ads accepts clicks up to 90 days old

export const ATTRIBUTION_PARAMS = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

export type Attribution = Partial<Record<(typeof ATTRIBUTION_PARAMS)[number] | 'landingPage' | 'referrer', string>>

/** Run on page load. A visit with ad params replaces older ones (last click wins). */
export const captureAttribution = () => {
  try {
    const url = new URL(window.location.href)
    const found: Attribution = {}
    for (const p of ATTRIBUTION_PARAMS) {
      const v = url.searchParams.get(p)
      if (v) found[p] = v.slice(0, 300)
    }
    const hasParams = Object.keys(found).length > 0
    if (!hasParams && getAttribution()) return // keep the earlier ad click

    found.landingPage = (url.origin + url.pathname).slice(0, 300)
    if (document.referrer) found.referrer = document.referrer.slice(0, 300)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...found, savedAt: Date.now() }))
  } catch {
    // Storage blocked (private mode etc). Leads still send, just without attribution.
  }
}

export const getAttribution = (): Attribution | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const { savedAt, ...data } = JSON.parse(raw)
    if (!savedAt || Date.now() - savedAt > MAX_AGE_MS) return null
    return data as Attribution
  } catch {
    return null
  }
}

export const loadGoogleTag = () => {
  const { adsId, ga4Id } = site.google
  const primary = adsId || ga4Id
  if (!primary || window.gtag) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag needs the real arguments object, not an array
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  if (adsId) window.gtag('config', adsId)
  if (ga4Id) window.gtag('config', ga4Id)

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${primary}`
  document.head.appendChild(s)
}

const toE164 = (phone: string) => {
  const d = phone.replace(/\D/g, '')
  if (d.length === 10) return `+1${d}`
  if (d.length === 11 && d.startsWith('1')) return `+${d}`
  return undefined
}

/** Fire after a lead is saved. Sends hashed-by-Google user data for enhanced conversions. */
export const trackLeadConversion = (lead: { email: string; phone: string; zip: string; type: string }) => {
  const gtag = window.gtag
  if (!gtag) return
  const { adsId, formConversionLabel } = site.google

  gtag('set', 'user_data', { email: lead.email.trim().toLowerCase(), phone_number: toE164(lead.phone) })
  if (adsId && formConversionLabel) {
    gtag('event', 'conversion', { send_to: `${adsId}/${formConversionLabel}` })
  }
  gtag('event', 'generate_lead', { lead_type: lead.type, zip: lead.zip })
}

export const trackCallClick = () => {
  const gtag = window.gtag
  if (!gtag) return
  const { adsId, callConversionLabel } = site.google
  if (adsId && callConversionLabel) {
    gtag('event', 'conversion', { send_to: `${adsId}/${callConversionLabel}` })
  }
  gtag('event', 'phone_click')
}
