<script setup lang="ts">
import { site } from '~/data/site'

const { percent, minimum } = site.pricing
const breakEven = minimum / percent // spend where 20% equals the minimum

const adSpend = ref(4000)
const rawFee = computed(() => adSpend.value * percent)
const fee = computed(() => Math.max(minimum, Math.round(rawFee.value)))
const atMinimum = computed(() => rawFee.value < minimum)
const total = computed(() => adSpend.value + fee.value)
</script>

<template>
  <section id="pricing" class="scroll-mt-16 bg-graphite py-20 text-paper sm:py-28">
    <div class="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
      <div class="lg:col-span-6">
        <h2 class="font-display text-[clamp(1.9rem,4vw,3.25rem)] leading-[0.98]">
          <span class="block">{{ percent * 100 }}% of ad spend.</span>
          <span class="block">{{ formatMoney(minimum) }} minimum.</span>
        </h2>
        <p class="mt-6 max-w-lg text-lg leading-relaxed text-paper/75">
          Your ad budget goes straight to Google, with no markup from me. My fee is {{ percent * 100 }}% of what you spend each month, with a {{ formatMoney(minimum) }} minimum. The minimum applies until you spend {{ formatMoney(breakEven) }} a month.
        </p>

        <div class="mt-10 max-w-lg border-l-4 border-cable pl-4">
          <p class="text-lg leading-relaxed">
            Electrical Local Services Ads leads averaged <span class="font-display">$39</span> each in February 2026. Across home services in the same study, regular Google Search ads averaged <span class="font-display">$104</span> per lead.
          </p>
          <p class="mt-2 text-sm text-paper/55">
            Source:
            <a
              href="https://searchlightdigital.io/google-local-service-ads-cost-per-lead/"
              target="_blank"
              rel="noopener"
              class="underline underline-offset-2 hover:text-paper"
            >SearchLight Digital LSA benchmark</a>, 888 contractors, February 2026.
          </p>
        </div>
      </div>

      <div class="lg:col-span-6">
        <div class="rounded-md bg-paper p-6 text-graphite sm:p-8">
          <div class="flex items-baseline justify-between gap-4">
            <label for="spend" class="font-semibold">Monthly ad spend</label>
            <output for="spend" class="font-display text-2xl">
              {{ formatMoney(adSpend) }}
            </output>
          </div>
          <input
            id="spend"
            v-model.number="adSpend"
            type="range"
            min="1000"
            max="15000"
            step="250"
            class="mt-4 w-full cursor-pointer accent-graphite"
          >
          <div class="mt-1 flex justify-between text-sm text-slate">
            <span>$1,000</span>
            <span>$15,000</span>
          </div>

          <dl class="mt-7 divide-y divide-steel-dark border-y border-steel-dark">
            <div class="flex items-baseline justify-between gap-4 py-3.5">
              <dt class="text-slate">Paid to Google</dt>
              <dd class="font-semibold">{{ formatMoney(adSpend) }}</dd>
            </div>
            <div class="flex items-baseline justify-between gap-4 py-3.5">
              <dt class="text-slate">
                My fee
                <span class="block text-sm">
                  {{ atMinimum ? `${formatMoney(minimum)} minimum applies` : `${percent * 100}% of ${formatMoney(adSpend)}` }}
                </span>
              </dt>
              <dd class="font-semibold">{{ formatMoney(fee) }}</dd>
            </div>
            <div class="flex items-baseline justify-between gap-4 py-3.5">
              <dt class="font-semibold">Total per month</dt>
              <dd class="font-display text-xl">{{ formatMoney(total) }}</dd>
            </div>
          </dl>

          <NuxtLink
            to="/#check"
            class="mt-6 block rounded-[4px] bg-cable px-5 py-3.5 text-center font-bold text-graphite transition-colors hover:bg-cable-dark"
          >
            Check your area
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
