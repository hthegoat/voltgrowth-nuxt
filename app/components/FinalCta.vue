<template>
  <section class="border-t border-steel-dark bg-steel py-20 sm:py-24">
    <div class="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
      <div class="max-w-2xl">
        <h2 class="font-display text-[clamp(2rem,4.4vw,3.25rem)] leading-[0.98] text-balance">
          Once an area's taken, it's taken.
        </h2>
        <p class="mt-4 text-lg text-slate">It takes a few seconds to see if yours is still open.</p>
      </div>
      <NuxtLink
        to="/#check"
        class="shrink-0 rounded-[4px] bg-cable px-7 py-4 text-lg font-bold text-graphite transition-colors hover:bg-cable-dark"
      >
        Check your area
      </NuxtLink>
    </div>
  </section>
</template>
