<script setup lang="ts">
const stats = [
  {
    value: '$4.2M+',
    label: 'Revenue Generated',
    note: 'Verified partner ticket gross across commercial & residential',
  },
  {
    value: '100%',
    label: 'Territory Exclusivity',
    note: 'Strict 1-partner rule per postal boundary, zero lead cannibalization',
  },
  {
    value: '14-Day',
    label: 'Rapid Deployment',
    note: 'Full campaign build, automated screening, and CRM webhook live',
  },
]
</script>

<template>
  <section id="results" class="border-b border-[#2d3449]/60 bg-[#131b2e] py-8 sm:py-10 relative z-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#2d3449]">
        <div v-for="stat in stats" :key="stat.label" class="pt-4 md:pt-0">
          <div class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#f8fafc] font-display tracking-tight tabular-nums">
            {{ stat.value }}
          </div>
          <div class="text-[#94a3b8] mt-1.5 sm:mt-2 font-mono uppercase tracking-wider text-xs">
            {{ stat.label }}
          </div>
          <p class="text-xs text-[#94a3b8]/70 mt-1 max-w-xs mx-auto">
            {{ stat.note }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
