<script setup lang="ts">
import { site } from '~/data/site'

const links = [
  { to: '/#included', label: 'What you get' },
  { to: '/#pricing', label: 'Pricing' },
  { to: '/#faq', label: 'Questions' },
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-steel-dark bg-paper/90 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
      <NuxtLink to="/" class="flex items-center gap-2.5 rounded-sm" :aria-label="`${site.brand} home`">
        <BreakerGlyph />
        <span class="flex items-baseline gap-1.5 leading-none">
          <span class="text-[15px] font-medium text-slate">{{ site.parent }}</span>
          <span class="font-display text-lg">Volt</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-7 text-[15px] md:flex" aria-label="Main">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-slate transition-colors hover:text-graphite"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-4">
        <a
          v-if="site.phone"
          :href="`tel:${site.phone.replace(/[^\d+]/g, '')}`"
          class="text-sm font-semibold"
        >
          <span class="sm:hidden">Call</span>
          <span class="hidden sm:inline">{{ site.phone }}</span>
        </a>
        <NuxtLink
          to="/#check"
          class="rounded-[4px] bg-graphite px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-black"
        >
          Check your area
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
