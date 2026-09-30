interface LeadBody {
  type?: string
  zip?: string
  name?: string
  business?: string
  phone?: string
  email?: string
  callTest?: boolean
  website?: string // honeypot: real people never fill this in
}

const clean = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export default defineEventHandler(async (event) => {
  const body = (await readBody<LeadBody>(event)) || {}

  // Bots fill every field; quietly accept and drop.
  if (clean(body.website)) return { ok: true }

  const lead = {
    type: body.type === 'waitlist' ? 'waitlist' : 'claim',
    zip: clean(body.zip, 5),
    name: clean(body.name),
    business: clean(body.business),
    phone: clean(body.phone, 40),
    email: clean(body.email),
    callTest: body.callTest === true,
    submittedAt: new Date().toISOString(),
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

  try {
    await $fetch(leadWebhookUrl, { method: 'POST', body: lead })
  } catch (err) {
    console.error('[lead] webhook failed', err, lead)
    throw createError({ statusCode: 502, statusMessage: 'Could not send your details.' })
  }

  return { ok: true }
})
