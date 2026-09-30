<script setup lang="ts">
const cases = [
  {
    location: 'Austin, TX Metro',
    vans: '6 Vans',
    headline: '+$138,000 / mo',
    focus: 'Focus: 200A Panel Replacements',
    body: 'Replaced shared HomeAdvisor leads with dedicated territorial inbound funnels. Booked 31 panel upgrades in first 35 days.',
  },
  {
    location: 'Phoenix Valley, AZ',
    vans: '11 Vans',
    headline: '44 EV Stations',
    focus: 'Focus: Fleet Commercial Chargers',
    body: 'Automated qualification filtered out single residential plugs; locked 4 commercial fleet warehouse contracts across Maricopa County.',
  },
  {
    location: 'Denver Front Range, CO',
    vans: '4 Vans',
    headline: '9.4x Ad Spend ROI',
    focus: 'Focus: Backup Generators & Rewires',
    body: 'Direct integration to ServiceTitan schedule dispatch. Zero time lost chasing unqualified price shoppers.',
  },
]
</script>

<template>
  <section class="py-16 sm:py-20 bg-[#0b1326] border-b border-[#2d3449]/60 relative z-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
        <div>
          <div class="text-xs font-mono text-[#f59e0b] uppercase tracking-widest mb-1.5">
            Field Verified
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] tracking-tight">
            Recent Territory Deployments
          </h2>
        </div>
        <p class="text-xs font-mono text-[#94a3b8] mt-2 sm:mt-0">
          Audited ServiceTitan & FieldEdge partner data
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        <div
          v-for="item in cases"
          :key="item.location"
          class="bg-[#171f33] border border-[#2d3449] rounded-lg p-5 sm:p-6"
        >
          <div class="flex items-center justify-between text-xs font-mono text-[#94a3b8] mb-3">
            <span>{{ item.location }}</span>
            <span class="text-[#56e5a9] font-bold">{{ item.vans }}</span>
          </div>
          <div class="text-xl sm:text-2xl font-extrabold text-[#f8fafc] font-mono tabular-nums mb-1">
            {{ item.headline }}
          </div>
          <div class="text-xs font-mono text-[#f59e0b] uppercase mb-2">
            {{ item.focus }}
          </div>
          <p class="text-xs text-[#94a3b8] leading-relaxed">
            {{ item.body }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
