<script setup lang="ts">
import { Activity, Check, ShieldCheck, Truck } from '@lucide/vue'

type JobType = 'panel' | 'ev' | 'commercial'

const activeJobType = ref<JobType>('panel')

const steps = [
  {
    label: '01 / CAPTURE',
    icon: Activity,
    title: 'Local Intent',
    body: 'Target homeowners and GCs searching specifically for panel swaps, rewiring, and commercial infrastructure in your immediate postal area.',
    check: 'High-intent keyword routing',
  },
  {
    label: '02 / QUALIFY',
    icon: ShieldCheck,
    title: 'Instant Filter',
    body: 'Automated screening screens out small $75 repairs, routing only high-margin projects straight to your estimator or lead dispatcher.',
    check: 'Minimum $1,800 ticket threshold',
  },
  {
    label: '03 / BOOK',
    icon: Truck,
    title: 'Direct to Dispatch',
    body: 'Confirmed leads sync straight into ServiceTitan or FieldEdge with tracked job ticket ROI at every step, directly to your vans.',
    check: 'Instant CRM & dispatch sync',
  },
]

const jobTabs: { id: JobType; label: string }[] = [
  { id: 'panel', label: 'Panel Swaps (200A)' },
  { id: 'ev', label: 'EV Fleet Charging' },
  { id: 'commercial', label: 'Heavy Infrastructure' },
]

const jobDetails: Record<
  JobType,
  { label: string; headline: string; body: string; highlight?: boolean }[]
> = {
  panel: [
    {
      label: 'Target Customer',
      headline: 'Older Homes Adding Heat Pumps / AC',
      body: 'Homeowners upgrading from 100A Federal Pacific or Zinsco panels to modern 200A or 400A mains.',
    },
    {
      label: 'Qualification Filter',
      headline: 'Immediate Replacement Intent',
      body: 'Auto-qualifies home ownership, main breaker amperage, and utility company coordination window.',
    },
    {
      label: 'Typical Ticket Yield',
      headline: '$3,200 – $5,400',
      body: 'Average 1-day van turnaround with 62% gross profit margin.',
      highlight: true,
    },
  ],
  ev: [
    {
      label: 'Target Customer',
      headline: 'Commercial Depots & High-End Residential',
      body: 'Fleet operators, multifamily complexes, and high-income homeowners needing Level 2/3 fast stations.',
    },
    {
      label: 'Qualification Filter',
      headline: 'Pre-Screened Load Calculation',
      body: 'Captures existing service panel capacity, distance to parking bays, and utility transformer load.',
    },
    {
      label: 'Typical Ticket Yield',
      headline: '$4,800 – $14,500',
      body: 'Commercial installation margins with repeat multi-station maintenance agreements.',
      highlight: true,
    },
  ],
  commercial: [
    {
      label: 'Target Customer',
      headline: 'Commercial Fit-Outs & Full Rewires',
      body: 'General contractors, retail remodels, light industrial facilities, and backup generator transfers.',
    },
    {
      label: 'Qualification Filter',
      headline: 'Scope & Blueprint Verification',
      body: 'Filters out small fixture repairs; requires architectural plans or full-building service scope.',
    },
    {
      label: 'Typical Ticket Yield',
      headline: '$8,000 – $28,000',
      body: 'Multi-day crew deployments with predictable staged invoicing and material prepays.',
      highlight: true,
    },
  ],
}
</script>

<template>
  <section id="how-it-works" class="py-16 sm:py-24 md:py-28 bg-[#0b1326] border-b border-[#2d3449]/60 relative z-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
        <div class="text-xs font-mono text-[#f59e0b] uppercase tracking-widest mb-2">
          The VoltGrowth System
        </div>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
          How It Works
        </h2>
        <p class="text-[#94a3b8] text-sm sm:text-base mt-2 text-balance">
          Zero bloat. Mechanical, high-margin customer acquisition designed exclusively for electrical contractors.
        </p>
      </div>

      <!-- 3 step cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
        <div
          v-for="step in steps"
          :key="step.label"
          class="bg-[#171f33] border border-[#2d3449] rounded-lg p-6 sm:p-8 flex flex-col justify-between hover:border-[#f59e0b]/50 transition-all duration-200"
        >
          <div>
            <div class="text-xs font-mono text-[#f59e0b] mb-4 tracking-widest uppercase flex items-center justify-between">
              <span>{{ step.label }}</span>
              <component :is="step.icon" class="w-4 h-4 text-[#f59e0b]" />
            </div>
            <h3 class="text-lg sm:text-xl font-bold text-[#f8fafc] mb-2 sm:mb-3">
              {{ step.title }}
            </h3>
            <p class="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
              {{ step.body }}
            </p>
          </div>
          <div class="mt-6 pt-4 border-t border-[#2d3449] text-xs font-mono text-[#56e5a9] flex items-center gap-1.5">
            <Check class="w-3.5 h-3.5 shrink-0" /> {{ step.check }}
          </div>
        </div>
      </div>

      <!-- Channel selector showcase -->
      <div class="bg-[#131b2e] border border-[#2d3449] rounded-lg p-5 sm:p-8">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#2d3449]">
          <div>
            <h3 class="text-base sm:text-lg font-bold text-[#f8fafc]">
              Pre-Configured High-Margin Job Channels
            </h3>
            <p class="text-xs font-mono text-[#94a3b8] mt-1">
              Inspect the filtered acquisition pipeline for your preferred electrical job profiles:
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 bg-[#171f33] border border-[#2d3449] rounded-md">
            <button
              v-for="tab in jobTabs"
              :key="tab.id"
              type="button"
              :class="[
                'px-3 py-2 text-xs font-mono rounded transition-colors cursor-pointer text-center min-h-[40px] flex items-center justify-center',
                activeJobType === tab.id
                  ? 'bg-[#f59e0b] text-[#2a1700] font-bold shadow'
                  : 'text-[#94a3b8] hover:text-[#f8fafc]',
              ]"
              @click="activeJobType = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Selected channel details -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-sm">
          <div
            v-for="card in jobDetails[activeJobType]"
            :key="card.label"
            class="bg-[#171f33]/40 p-4 rounded border border-[#2d3449]/50"
          >
            <div class="text-xs font-mono text-[#f59e0b] uppercase mb-1">{{ card.label }}</div>
            <p
              v-if="card.highlight"
              class="text-[#56e5a9] font-mono font-bold text-lg sm:text-xl tabular-nums"
            >
              {{ card.headline }}
            </p>
            <p v-else class="text-[#f8fafc] font-semibold">{{ card.headline }}</p>
            <p class="text-xs text-[#94a3b8] mt-1.5 leading-relaxed">
              {{ card.body }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
