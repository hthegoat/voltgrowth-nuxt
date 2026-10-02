<script setup lang="ts">
import { site } from '~/data/site'

const { zip, status, wantsCallTest, check, reset } = useArea()

const zipDraft = ref(zip.value)
const zipError = ref('')

const form = reactive({ name: '', phone: '', email: '', website: '' })
const sending = ref(false)
const sendError = ref('')
const sent = ref(false)

const onCheck = () => {
  zipError.value = ''
  if (!check(zipDraft.value)) {
    zipError.value = 'Enter a 5-digit ZIP code.'
  }
}

const changeZip = () => {
  reset()
  sent.value = false
  sendError.value = ''
  nextTick(() => document.getElementById('zip-input')?.focus())
}

const onSubmit = async () => {
  sending.value = true
  sendError.value = ''
  const type = status.value === 'taken' ? 'waitlist' : 'claim'
  try {
    await $fetch('/api/lead', {
      method: 'POST',
      body: {
        ...form,
        zip: zip.value,
        type,
        callTest: wantsCallTest.value,
        attribution: getAttribution(),
      },
    })
    sent.value = true
    // Google Ads form conversion (only fires once the Google tag IDs are set in data/site.ts)
    trackLeadConversion({ email: form.email, phone: form.phone, zip: zip.value, type })
  } catch (err: any) {
    sendError.value =
      err?.data?.statusMessage || 'Your details didn\'t send. Check your connection and try again.'
  } finally {
    sending.value = false
  }
}

const fieldClass =
  'w-full rounded-[4px] border border-steel-dark bg-paper px-3.5 py-3 text-base text-graphite placeholder:text-slate/60 focus:border-graphite focus:outline-none'
</script>

<template>
  <div id="check" class="scroll-mt-24 rounded-md border-2 border-graphite bg-steel p-5 sm:p-7">
    <!-- Step 1: ZIP -->
    <template v-if="!status">
      <h2 class="font-display text-2xl">Is your area open?</h2>
      <p class="mt-2 text-[15px] leading-relaxed text-slate">
        I take one electrician per service area. Enter your shop's ZIP code to see if yours is available.
      </p>

      <form class="mt-5" novalidate @submit.prevent="onCheck">
        <label for="zip-input" class="block text-sm font-semibold">ZIP code</label>
        <div class="mt-1.5 flex flex-col gap-2.5 sm:flex-row">
          <input
            id="zip-input"
            v-model="zipDraft"
            type="text"
            inputmode="numeric"
            autocomplete="postal-code"
            maxlength="5"
            placeholder="e.g. 78701"
            :aria-invalid="!!zipError"
            aria-describedby="zip-error"
            :class="[fieldClass, 'sm:flex-1']"
          >
          <button
            type="submit"
            class="rounded-[4px] bg-cable px-5 py-3 text-base font-bold text-graphite transition-colors hover:bg-cable-dark"
          >
            Check my area
          </button>
        </div>
        <p id="zip-error" class="mt-2 min-h-5 text-sm font-medium text-fault" aria-live="polite">{{ zipError }}</p>
      </form>
    </template>

    <!-- Step 3: sent -->
    <div v-else-if="sent" aria-live="polite">
      <h2 class="font-display text-2xl">
        {{ status === 'taken' ? `You're on the waitlist for ${zip}.` : `${zip} is held for you.` }}
      </h2>
      <p class="mt-2 text-[15px] leading-relaxed text-slate">
        <template v-if="status === 'taken'">I'll email you if the area opens up.</template>
        <template v-else-if="site.bookingUrl">
          Pick a time for a short call and I'll hold your area until then.
        </template>
        <template v-else>
          I'll get in touch soon to set up a call about your jobs, service area and budget.
        </template>
        <template v-if="wantsCallTest"> Your missed-call test results will come by email.</template>
      </p>
      <a
        v-if="status === 'open' && site.bookingUrl"
        :href="site.bookingUrl"
        target="_blank"
        rel="noopener"
        class="mt-5 block rounded-[4px] bg-cable px-5 py-3.5 text-center text-base font-bold text-graphite transition-colors hover:bg-cable-dark"
      >
        Pick a call time
      </a>
      <button type="button" class="mt-4 text-sm font-semibold underline underline-offset-4" @click="changeZip">
        Check another ZIP code
      </button>
    </div>

    <!-- Step 2: result and details -->
    <div v-else aria-live="polite">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h2 class="font-display text-2xl">
            {{ zip }} is {{ status }}.
          </h2>
          <p class="mt-2 text-[15px] leading-relaxed text-slate">
            <template v-if="status === 'open'">
              Leave your details and I'll call to talk through your area and budget. I'll hold the area while we talk.
            </template>
            <template v-else>
              I already work with an electrician who serves this area. Join the waitlist and I'll let you know if it opens up.
            </template>
          </p>
        </div>
        <button
          type="button"
          class="shrink-0 pt-1.5 text-sm font-semibold underline underline-offset-4"
          @click="changeZip"
        >
          Change
        </button>
      </div>

      <form class="mt-5 grid gap-3.5 sm:grid-cols-2" @submit.prevent="onSubmit">
        <div>
          <label for="lead-name" class="block text-sm font-semibold">Your name</label>
          <input id="lead-name" v-model="form.name" required autocomplete="name" :class="[fieldClass, 'mt-1.5']">
        </div>
        <div>
          <label for="lead-phone" class="block text-sm font-semibold">Phone</label>
          <input
            id="lead-phone"
            v-model="form.phone"
            type="tel"
            required
            autocomplete="tel"
            :class="[fieldClass, 'mt-1.5']"
          >
        </div>
        <div class="sm:col-span-2">
          <label for="lead-email" class="block text-sm font-semibold">Email</label>
          <input
            id="lead-email"
            v-model="form.email"
            type="email"
            required
            autocomplete="email"
            :class="[fieldClass, 'mt-1.5']"
          >
        </div>

        <label class="flex cursor-pointer items-start gap-2.5 text-[15px] sm:col-span-2">
          <input v-model="wantsCallTest" type="checkbox" class="mt-1 size-4 shrink-0 accent-graphite">
          <span>Also send me the free missed-call test</span>
        </label>

        <!-- Honeypot, hidden from people -->
        <div class="hidden" aria-hidden="true">
          <label for="lead-website">Website</label>
          <input id="lead-website" v-model="form.website" tabindex="-1" autocomplete="off">
        </div>

        <div class="sm:col-span-2">
          <button
            type="submit"
            :disabled="sending"
            class="w-full rounded-[4px] bg-cable px-5 py-3.5 text-base font-bold text-graphite transition-colors hover:bg-cable-dark disabled:opacity-60"
          >
            {{ sending ? 'Sending…' : status === 'open' ? 'Hold my area' : 'Join the waitlist' }}
          </button>
          <p v-if="sendError" class="mt-2 text-sm font-medium text-fault">{{ sendError }}</p>
          <p class="mt-2.5 text-[13px] text-slate">
            No cost to hold an area. See the
            <NuxtLink to="/privacy" class="underline underline-offset-2">privacy policy</NuxtLink>
            for how your details are used.
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
