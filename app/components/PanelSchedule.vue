<script setup lang="ts">
const circuits = [
  {
    n: 1,
    title: 'Google Search Ads',
    body: 'Campaigns built around the jobs you want, like panel upgrades, EV chargers and rewires, in the area you actually serve.',
  },
  {
    n: 2,
    title: 'Local Services Ads',
    body: 'Setup and management of your Local Services profile, the ads with the Google Guaranteed badge at the top of the page.',
  },
  {
    n: 3,
    title: 'Call tracking',
    body: 'Calls from your ads are tracked, so you can see which ones came from ads and which turned into jobs.',
  },
  {
    n: 4,
    title: 'Monthly reporting',
    body: 'A plain-English report each month: what you spent, how many calls came in, and what each one cost.',
  },
  {
    n: 5,
    title: 'One-to-one service',
    body: 'You deal with me directly. No account managers, no handoffs to a junior.',
  },
  {
    n: 6,
    title: 'Your area, only you',
    body: "I won't run ads for another electrician whose service area overlaps yours.",
  },
]
</script>

<template>
  <section id="included" class="scroll-mt-16 py-20 sm:py-28">
    <div class="mx-auto max-w-6xl px-5 sm:px-8">
      <div class="max-w-2xl">
        <h2 class="font-display text-3xl sm:text-4xl">What you get</h2>
        <p class="mt-3 text-lg text-slate">Six things, all handled by one person.</p>
      </div>

      <!-- Styled like a breaker panel: a steel door with six labeled circuits -->
      <div class="mt-12 rounded-md border-2 border-graphite bg-steel p-2 sm:p-3">
        <ol class="grid overflow-hidden rounded-[3px] bg-paper md:grid-cols-2">
          <li
            v-for="(c, i) in circuits"
            :key="c.n"
            :class="[
              'flex gap-5 p-6 sm:p-7',
              i > 0 ? 'border-t border-steel-dark' : '',
              i === 1 ? 'md:border-t-0' : '',
              i % 2 === 1 ? 'md:border-l md:border-steel-dark' : '',
            ]"
          >
            <BreakerGlyph :n="c.n" class="mt-0.5" />
            <div>
              <h3 class="text-lg font-bold">{{ c.title }}</h3>
              <p class="mt-1.5 max-w-md leading-relaxed text-slate">{{ c.body }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
