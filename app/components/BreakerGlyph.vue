<script setup lang="ts">
// A breaker seen from the front, toggle flipped on. Pass `n` to print a circuit number on it.
defineProps<{ n?: number }>()
</script>

<template>
  <svg v-if="n" aria-hidden="true" viewBox="0 0 48 28" class="h-7 w-12 shrink-0">
    <rect x="0.5" y="0.5" width="47" height="27" rx="4" fill="var(--color-graphite)" />
    <rect x="6" y="7" width="18" height="14" rx="2" fill="#3a3f44" />
    <rect x="6" y="7" width="10" height="14" rx="2" fill="var(--color-cable)" />
    <text
      x="36"
      y="18.5"
      font-size="12"
      font-weight="800"
      fill="var(--color-paper)"
      text-anchor="middle"
      font-family="var(--display-family)"
    >{{ n }}</text>
  </svg>
  <svg v-else aria-hidden="true" viewBox="0 0 32 20" class="h-5 w-8 shrink-0">
    <rect x="0.5" y="0.5" width="31" height="19" rx="3" fill="var(--color-graphite)" />
    <rect x="5" y="5" width="22" height="10" rx="1.5" fill="#3a3f44" />
    <rect x="5" y="5" width="12" height="10" rx="1.5" fill="var(--color-cable)" />
  </svg>
</template>
