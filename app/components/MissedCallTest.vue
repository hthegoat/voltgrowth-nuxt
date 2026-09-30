<script setup lang="ts">
const { wantsCallTest } = useArea()
</script>

<template>
  <section class="border-t border-steel-dark bg-steel py-20 sm:py-24">
    <div class="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
      <div class="lg:col-span-7">
        <h2 class="font-display text-3xl sm:text-4xl text-balance">Find out how many calls you're missing.</h2>
        <p class="mt-5 max-w-xl text-lg leading-relaxed text-slate">
          Before we talk about ads, I'll call your shop three times at different times of day, the way a customer would.
          Then I'll send you a short write-up: who answered, how long it took, and whether anyone asked to book the job.
          It's free, whether or not we work together.
        </p>
        <NuxtLink
          to="/#check"
          class="mt-8 inline-block rounded-[4px] bg-graphite px-6 py-3.5 font-bold text-paper transition-colors hover:bg-black"
          @click="wantsCallTest = true"
        >
          Get the free call test
        </NuxtLink>
      </div>

      <figure class="self-end border-t-2 border-graphite pt-5 lg:col-span-5">
        <p class="text-lg leading-relaxed">
          Only about half of callers to home services businesses reach a person, and more than half of businesses never ask the caller to book the job.
        </p>
        <figcaption class="mt-3 text-sm text-slate">
          Invoca Home Services Lead Conversion Benchmarks, 2026, based on 70M+ calls.
        </figcaption>
      </figure>
    </div>
  </section>
</template>
