<script setup lang="ts">
import { site } from '~/data/site'
</script>

<template>
  <section class="border-b border-steel-dark">
    <div class="mx-auto grid max-w-6xl gap-x-10 gap-y-12 px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-24 lg:grid-cols-12">
      <h1 class="font-display text-[clamp(2.35rem,7.6vw,5.9rem)] leading-[0.93] lg:col-span-12">
        <span class="block">Google Ads for</span>
        <span class="block">electricians.</span>
        <span class="block">One per area.</span>
      </h1>

      <!-- On phones the checker sits right under the intro; on desktop it runs alongside intro and proof -->
      <p class="max-w-[34rem] text-lg leading-relaxed text-slate sm:text-xl lg:col-span-7 lg:row-start-2">
        I'm {{ site.owner }}, and I run Google Ads and Local Services Ads for electrical contractors. I only work with one electrician in any service area, so I'm never bidding against my own client.
      </p>

      <div class="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-2">
        <AreaChecker />
      </div>

      <div class="flex max-w-[34rem] items-center gap-4 self-start border-l-4 border-cable pl-4 lg:col-span-7 lg:row-start-3">
        <p class="text-base leading-snug">
          <span class="font-display text-2xl">{{ site.revenueProof }}</span>
          in revenue generated for the businesses I run ads for through {{ site.parent }}.
        </p>
      </div>
    </div>
  </section>
</template>
