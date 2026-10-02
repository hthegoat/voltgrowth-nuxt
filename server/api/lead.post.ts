interface LeadBody {
  type?: string
  zip?: string
  name?: string
  business?: string
  phone?: string
  email?: string
  callTest?: boolean
  attribution?: Record<string, unknown> | null
  website?: string // honeypot: real people never fill this in
}

const clean = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

const ATTRIBUTION_KEYS = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'landingPage',
  'referrer',
] as const

export default defineEventHandler(async (event) => {
  const body = (await readBody<LeadBody>(event)) || {}

  // Bots fill every field; quietly accept and drop.
  if (clean(body.website)) return { ok: true }

  const a = body.attribution && typeof body.attribution === 'object' ? body.attribution : {}
  const attribution = Object.fromEntries(ATTRIBUTION_KEYS.map((k) => [k, clean(a[k], 300)]))

  const lead = {
    type: body.type === 'waitlist' ? 'waitlist' : 'claim',
    zip: clean(body.zip, 5),
    name: clean(body.name),
    business: clean(body.business),
    phone: clean(body.phone, 40),
    email: clean(body.email),
    callTest: body.callTest === true,
    submittedAt: new Date().toISOString(),
    ...attribution,
  }

  const missing = (['zip', 'name', 'phone', 'email'] as const).filter((k) => !lead[k])
  if (missing.length) {
    throw createError({ statusCode: 400, statusMessage: `Missing: ${missing.join(', ')}` })
  }
  if (!/^\d{5}$/.test(lead.zip) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    throw createError({ statusCode: 400, statusMessage: 'Check the ZIP code and email address.' })
  }

  const { leadWebhookUrl } = useRuntimeConfig(event)

  if (!leadWebhookUrl) {
    console.log('[lead] NUXT_LEAD_WEBHOOK_URL not set, lead only logged:', lead)
    return { ok: true }
  }

  // Google Apps Script answers POSTs with a redirect, so follow it and read the final reply.
  let status = 0
  let text = ''
  try {
    const res = await fetch(leadWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      redirect: 'follow',
    })
    status = res.status
    text = await res.text()
  } catch (err) {
    console.error('[lead] webhook unreachable', err, lead)
    throw createError({ statusCode: 502, statusMessage: 'Could not send your details.' })
  }

  let reply: any = null
  try {
    reply = JSON.parse(text)
  } catch {
    // Not JSON: usually a Google sign-in page, meaning the web app isn't set to "Anyone".
  }

  if (!reply?.ok) {
    console.error(
      `[lead] webhook did not confirm the lead (HTTP ${status}). Reply starts with:`,
      text.slice(0, 300),
      lead,
    )
    throw createError({ statusCode: 502, statusMessage: 'Could not send your details.' })
  }

  console.log('[lead] sent to webhook:', lead.email, lead.zip)
  return { ok: true }
})
