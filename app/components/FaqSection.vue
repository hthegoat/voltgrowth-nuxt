<script setup lang="ts">
import { site } from '~/data/site'

const pct = `${site.pricing.percent * 100}%`
const min = formatMoney(site.pricing.minimum)

const faqs = [
  {
    q: 'How much does it cost?',
    a: `${pct} of your monthly ad spend, with a ${min} monthly minimum. Your ad spend is paid directly to Google, and I don't mark it up.`,
  },
  {
    q: 'How much should I spend on ads?',
    a: "It depends on your area and how much work your crews can take on. We'll settle on a number during the first call, and the calculator above shows what you'd pay me at each level.",
  },
  {
    q: 'What does "one electrician per area" mean?',
    a: "Once we start, I won't take on another electrician whose service area overlaps yours. We agree on your area at the start, usually by the ZIP codes or towns you cover.",
  },
  {
    q: 'What if my area is taken?',
    a: "Join the waitlist from the area checker. If the area opens up, you'll hear from me first.",
  },
  {
    q: 'Who will I be working with?',
    a: `Me, ${site.owner}. I run ${site.parent}, a Google Ads consultancy, and I've generated ${site.revenueProof} in revenue for the businesses I run ads for. There's no team to get handed off to.`,
  },
  {
    q: 'Do you do SEO or build websites?',
    a: 'No. I focus on Google Ads and Local Services Ads, with call tracking and monthly reporting, and do those well.',
  },
]
</script>

<template>
  <section id="faq" class="scroll-mt-16 py-20 sm:py-28">
    <div class="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-12">
      <h2 class="font-display text-3xl sm:text-4xl lg:col-span-4">
        Questions
      </h2>
      <div class="border-t-2 border-graphite lg:col-span-8">
        <details
          v-for="item in faqs"
          :key="item.q"
          class="group border-b border-steel-dark"
        >
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden"
          >
            {{ item.q }}
            <span
              aria-hidden="true"
              class="relative size-4 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:bg-graphite after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2 after:bg-graphite after:transition-transform group-open:after:scale-y-0"
            />
          </summary>
          <p class="max-w-2xl pb-6 text-[17px] leading-relaxed text-slate">{{ item.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
