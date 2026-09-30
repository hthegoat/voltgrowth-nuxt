<script setup lang="ts">
const steps = [
  { title: 'Check your area', body: "Enter your ZIP code. If it's open, I'll hold it while we talk." },
  { title: 'Have a short call', body: 'We go over the jobs you want more of, where you work, and your budget.' },
  { title: 'Go live', body: 'I build your campaigns and Local Services profile, set up call tracking, and turn them on.' },
]
</script>

<template>
  <section class="border-t border-steel-dark py-20 sm:py-24">
    <div class="mx-auto max-w-6xl px-5 sm:px-8">
      <h2 class="font-display text-3xl sm:text-4xl">How it starts</h2>
      <ol class="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
        <li v-for="(step, i) in steps" :key="step.title" class="border-t-2 border-graphite pt-5">
          <span class="font-display text-4xl">{{ i + 1 }}</span>
          <h3 class="mt-3 text-xl font-bold">{{ step.title }}</h3>
          <p class="mt-2 max-w-xs leading-relaxed text-slate">{{ step.body }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
