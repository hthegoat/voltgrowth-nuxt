<script setup lang="ts">
import { ArrowRight, Calculator, Minus, Plus, ShieldCheck } from '@lucide/vue'

type ServiceType = 'panel' | 'ev' | 'commercial'

const { zipInput, openClaimModal } = useClaimModal()

const calcVans = ref(4)
const calcServiceType = ref<ServiceType>('panel')

const serviceRates = {
  panel: { name: '200A / 400A Panel Swaps', avgTicket: 3200, jobsPerVan: 5 },
  ev: { name: 'Commercial & Fleet EV Chargers', avgTicket: 5800, jobsPerVan: 3 },
  commercial: { name: 'Whole-Home & Commercial Rewire', avgTicket: 8400, jobsPerVan: 2 },
}

const serviceOptions: { id: ServiceType; label: string; avg: string }[] = [
  { id: 'panel', label: 'Panel Upgrades', avg: '$3,200 avg' },
  { id: 'ev', label: 'EV Commercial', avg: '$5,800 avg' },
  { id: 'commercial', label: 'Heavy Rewire', avg: '$8,400 avg' },
]

const activeRate = computed(() => serviceRates[calcServiceType.value])
const monthlyJobs = computed(() => calcVans.value * activeRate.value.jobsPerVan)
const addedMonthlyRevenue = computed(() => monthlyJobs.value * activeRate.value.avgTicket)
const addedAnnualRevenue = computed(() => addedMonthlyRevenue.value * 12)
</script>

<template>
  <section id="calculator" class="py-16 sm:py-24 bg-[#131b2e] border-b border-[#2d3449]/60 relative z-10">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-10 sm:mb-12">
        <div class="inline-flex items-center gap-1.5 text-xs font-mono text-[#f59e0b] uppercase tracking-wider mb-2">
          <Calculator class="w-3.5 h-3.5" />
          <span>Interactive ROI Calculator</span>
        </div>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
          Calculate Your Territory Pipeline Yield
        </h2>
        <p class="text-[#94a3b8] text-xs sm:text-base mt-2 max-w-xl mx-auto text-balance">
          Dial in your current van fleet capacity to see the projected monthly and annual high-ticket revenue unlocked in an exclusive territory.
        </p>
      </div>

      <div class="bg-[#171f33] border border-[#334155] rounded-lg p-5 sm:p-8 md:p-10 shadow-2xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <!-- Controls column -->
          <div class="space-y-6 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-3">
                <span class="text-sm font-semibold text-[#f8fafc]">Active Service Vans / Crews</span>
                <span class="text-sm sm:text-base font-bold font-mono text-[#f59e0b] tabular-nums px-2.5 py-0.5 bg-[#131b2e] border border-[#2d3449] rounded">
                  {{ calcVans }} {{ calcVans === 1 ? 'Van' : 'Vans' }}
                </span>
              </div>

              <div class="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Decrease van count"
                  class="w-10 h-10 rounded bg-[#131b2e] border border-[#2d3449] hover:border-[#f59e0b] text-[#dae2fd] flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform"
                  @click="calcVans = Math.max(1, calcVans - 1)"
                >
                  <Minus class="w-4 h-4" />
                </button>

                <input
                  v-model.number="calcVans"
                  type="range"
                  min="1"
                  max="15"
                  aria-label="Number of active service vans"
                  class="flex-1 h-3 bg-[#222a3d] rounded-lg appearance-none cursor-pointer accent-[#f59e0b]"
                >

                <button
                  type="button"
                  aria-label="Increase van count"
                  class="w-10 h-10 rounded bg-[#131b2e] border border-[#2d3449] hover:border-[#f59e0b] text-[#dae2fd] flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform"
                  @click="calcVans = Math.min(15, calcVans + 1)"
                >
                  <Plus class="w-4 h-4" />
                </button>
              </div>

              <div class="flex justify-between text-[11px] font-mono text-[#94a3b8] mt-2">
                <span>1 Van</span>
                <span>5 Vans</span>
                <span>10 Vans</span>
                <span>15 Vans</span>
              </div>
            </div>

            <!-- Service profile buttons -->
            <div>
              <span class="text-sm font-semibold text-[#f8fafc] block mb-2">Primary High-Ticket Focus</span>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  v-for="item in serviceOptions"
                  :key="item.id"
                  type="button"
                  :class="[
                    'p-3 rounded border text-left transition-all cursor-pointer min-h-[48px]',
                    calcServiceType === item.id
                      ? 'bg-[#222a3d] border-[#f59e0b] text-[#f8fafc] shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                      : 'bg-[#131b2e] border-[#2d3449] text-[#94a3b8] hover:border-[#2d3449]',
                  ]"
                  @click="calcServiceType = item.id"
                >
                  <div class="text-xs font-bold leading-tight">{{ item.label }}</div>
                  <div class="text-[11px] font-mono text-[#56e5a9] mt-1">{{ item.avg }}</div>
                </button>
              </div>
            </div>

            <div class="p-3 bg-[#131b2e] border border-[#2d3449] rounded text-xs text-[#94a3b8] flex items-center gap-2">
              <ShieldCheck class="w-4 h-4 text-[#56e5a9] shrink-0" />
              <span>Exclusivity locks these lead calls directly to your phones and CRM without shared bidding.</span>
            </div>
          </div>

          <!-- Output column -->
          <div class="bg-[#131b2e] border border-[#2d3449] rounded-lg p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div class="text-xs font-mono text-[#94a3b8] uppercase tracking-wider mb-1">
                Estimated Territory Pipeline
              </div>
              <div class="flex flex-wrap items-baseline gap-2 mb-4">
                <span class="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] font-mono tabular-nums">
                  +{{ monthlyJobs }}
                </span>
                <span class="text-xs sm:text-sm text-[#94a3b8]">Qualified High-Ticket Jobs / Month</span>
              </div>

              <div class="space-y-4 pt-4 border-t border-[#2d3449]">
                <div>
                  <div class="text-xs font-mono text-[#94a3b8]">Projected Added Monthly Revenue</div>
                  <div class="text-xl sm:text-2xl font-extrabold text-[#56e5a9] font-mono tabular-nums">
                    ${{ formatNumber(addedMonthlyRevenue) }} <span class="text-xs font-normal text-[#94a3b8]">/ mo</span>
                  </div>
                </div>

                <div>
                  <div class="text-xs font-mono text-[#94a3b8]">Projected Added Annual Revenue</div>
                  <div class="text-2xl sm:text-3xl font-extrabold text-[#f59e0b] font-mono tabular-nums">
                    ${{ formatNumber(addedAnnualRevenue) }} <span class="text-xs font-normal text-[#94a3b8]">/ yr</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-[#2d3449]">
              <button
                type="button"
                class="w-full bg-[#f59e0b] hover:bg-[#ffb95f] text-[#2a1700] py-3.5 rounded font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(245,158,11,0.25)] transition-all cursor-pointer font-mono uppercase min-h-[48px]"
                @click="openClaimModal(zipInput || '78701')"
              >
                <span>Claim Capacity for {{ calcVans }} Vans</span>
                <ArrowRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
