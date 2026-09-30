<script setup lang="ts">
import { site } from '~/data/site'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-graphite text-paper/70">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm sm:px-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p class="text-paper">
          <span class="font-semibold">{{ site.brand }}</span>
          is the electrician service from {{ site.parent }}.
        </p>
        <p class="mt-1">© {{ year }} {{ site.parent }}</p>
      </div>
      <div class="flex flex-wrap gap-x-6 gap-y-2">
        <a :href="`mailto:${site.email}`" class="hover:text-paper">{{ site.email }}</a>
        <a v-if="site.phone" :href="`tel:${site.phone.replace(/[^\d+]/g, '')}`" class="hover:text-paper">{{ site.phone }}</a>
        <NuxtLink to="/privacy" class="hover:text-paper">Privacy policy</NuxtLink>
      </div>
    </div>
  </footer>
</template>
