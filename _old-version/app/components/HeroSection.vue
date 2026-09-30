<script setup lang="ts">
import { ArrowRight, Lock, MapPin } from '@lucide/vue'

interface TerritoryResult {
  zip: string
  metro: string
  status: 'available' | 'locked' | 'reviewing'
  monthlySearches: number
  estHighTicketJobs: number
  avgTicket: number
  topServices: string[]
}

const { zipInput, openClaimModal } = useClaimModal()

const searching = ref(false)
const territoryResult = ref<TerritoryResult | null>(null)
const zipInputId = useId()

const quickCities = [
  { name: 'Austin', zip: '78701' },
  { name: 'Phoenix', zip: '85001' },
  { name: 'Denver', zip: '80202' },
  { name: 'Atlanta', zip: '30301' },
  { name: 'Nashville', zip: '37203' },
]

const searchTerritory = (customZip?: string) => {
  const query = (customZip || zipInput.value).trim()
  if (!query) return

  searching.value = true
  territoryResult.value = null

  // Fast, responsive 400ms verification lookup
  setTimeout(async () => {
    const cleanZip = query.replace(/[^\w\s]/gi, '')
    const isLocked = cleanZip.includes('90210') || cleanZip.toLowerCase().includes('miami')

    territoryResult.value = {
      zip: query.toUpperCase(),
      metro:
        query.length === 5 && !isNaN(Number(query))
          ? `Metro Territory #${query}`
          : `${query} Service Region`,
      status: isLocked ? 'locked' : 'available',
      monthlySearches: isLocked ? 840 : 1380,
      estHighTicketJobs: isLocked ? 0 : 24,
      avgTicket: 3450,
      topServices: [
        '200A/400A Heavy-Up Panel Swaps',
        'Level 2/3 Fast EV Chargers',
        'Sub-panel & Commercial Rewiring',
      ],
    }
    searching.value = false

    // Smooth scroll to result once it has rendered
    await nextTick()
    document
      .getElementById('territory-result-view')
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, 400)
}

const quickLookup = (zip: string) => {
  zipInput.value = zip
  searchTerritory(zip)
}
</script>

<template>
  <section class="relative pt-10 sm:pt-14 pb-16 sm:pb-24 overflow-hidden border-b border-[#2d3449]/60 z-10">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
      <!-- Exclusivity pill -->
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#171f33] border border-[#2d3449] text-[#f59e0b] text-[11px] sm:text-xs font-mono tracking-wide mb-6 sm:mb-8 shadow-inner">
        <span class="inline-block w-2 h-2 rounded-full bg-[#56e5a9] ring-4 ring-[#56e5a9]/20 animate-pulse shrink-0" />
        <span>Single-Contractor Exclusivity</span>
      </div>

      <!-- Primary headline -->
      <h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#f8fafc] tracking-tight leading-[1.12] mb-5 sm:mb-6 max-w-3xl text-balance">
        Predictable high-ticket jobs for electrical contractors.
      </h1>

      <!-- Subtitle -->
      <p class="text-sm sm:text-lg text-[#94a3b8] max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 text-balance font-normal">
        We handle your ads, local SEO, and dispatch automation so your vans stay booked with panel upgrades, EV chargers, and commercial service.
      </p>

      <!-- Territory search form -->
      <form
        id="territory"
        class="w-full max-w-xl flex flex-col sm:flex-row gap-3 mb-3"
        @submit.prevent="searchTerritory()"
      >
        <div class="relative flex-1">
          <label :for="zipInputId" class="sr-only">Enter your ZIP code or service area</label>
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
            <MapPin class="w-4 h-4" />
          </div>
          <input
            :id="zipInputId"
            v-model="zipInput"
            type="text"
            placeholder="Enter your ZIP code or service area"
            class="w-full bg-[#131b2e] border border-[#2d3449] focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] rounded px-4 py-3.5 pl-10 text-[#dae2fd] text-sm sm:text-base outline-none transition-colors placeholder:text-[#94a3b8]/60 font-medium min-h-[48px]"
            required
          >
        </div>
        <button
          type="submit"
          :disabled="searching"
          class="bg-[#f59e0b] hover:bg-[#ffb95f] disabled:opacity-75 text-[#2a1700] px-6 py-3.5 rounded text-sm sm:text-base font-bold tracking-tight transition-all duration-150 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.25)] shrink-0 cursor-pointer active:translate-y-0.5 min-h-[48px]"
        >
          <template v-if="searching">
            <div class="w-4 h-4 border-2 border-[#2a1700] border-t-transparent rounded-full animate-spin" />
            <span>Scanning Territory...</span>
          </template>
          <template v-else>
            <span>Check My Territory</span>
            <ArrowRight class="w-4 h-4" />
          </template>
        </button>
      </form>

      <!-- Quick preset buttons -->
      <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4 text-xs font-mono text-[#94a3b8]">
        <span class="text-[#94a3b8]/70 mr-1">Quick lookups:</span>
        <button
          v-for="item in quickCities"
          :key="item.zip"
          type="button"
          class="px-2.5 py-1 rounded bg-[#171f33] border border-[#2d3449]/70 hover:border-[#f59e0b]/50 hover:text-[#f8fafc] transition-colors cursor-pointer min-h-[32px] flex items-center"
          @click="quickLookup(item.zip)"
        >
          {{ item.zip }} ({{ item.name }})
        </button>
      </div>

      <!-- Exclusivity footnote -->
      <p class="text-xs text-[#94a3b8] font-mono tracking-tight">
        Strict 1-contractor exclusivity per territory • No long-term lock-in
      </p>

      <!-- Territory result card -->
      <div
        v-if="territoryResult"
        id="territory-result-view"
        class="mt-6 sm:mt-8 w-full max-w-xl bg-[#171f33] border border-[#334155] rounded-lg p-5 sm:p-6 text-left shadow-2xl relative animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 pb-4 border-b border-[#2d3449]">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-mono uppercase tracking-wider text-[#94a3b8]">
                Territory Verification Result
              </span>
              <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-[#222a3d] text-[#dae2fd]">
                {{ territoryResult.zip }}
              </span>
            </div>
            <h4 class="text-base sm:text-lg font-bold text-[#f8fafc] mt-1">
              {{ territoryResult.metro }}
            </h4>
          </div>

          <div
            v-if="territoryResult.status === 'available'"
            class="self-start flex items-center gap-1.5 px-3 py-1 bg-[#56e5a9]/10 border border-[#56e5a9]/40 text-[#56e5a9] text-xs font-bold rounded uppercase font-mono"
          >
            <span class="w-2 h-2 rounded-full bg-[#56e5a9] animate-pulse" />
            Available Now
          </div>
          <div
            v-else
            class="self-start flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/40 text-rose-400 text-xs font-bold rounded uppercase font-mono"
          >
            <Lock class="w-3.5 h-3.5" />
            Locked Territory
          </div>
        </div>

        <template v-if="territoryResult.status === 'available'">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-4">
            <div class="bg-[#131b2e] p-3 rounded border border-[#2d3449]">
              <div class="text-[10px] sm:text-[11px] font-mono text-[#94a3b8]">Monthly Search Vol</div>
              <div class="text-base sm:text-lg font-bold text-[#f8fafc] font-mono tabular-nums">
                {{ formatNumber(territoryResult.monthlySearches) }}+
              </div>
            </div>
            <div class="bg-[#131b2e] p-3 rounded border border-[#2d3449]">
              <div class="text-[10px] sm:text-[11px] font-mono text-[#94a3b8]">Avg Ticket Value</div>
              <div class="text-base sm:text-lg font-bold text-[#56e5a9] font-mono tabular-nums">
                ${{ formatNumber(territoryResult.avgTicket) }}
              </div>
            </div>
            <div class="bg-[#131b2e] p-3 rounded border border-[#2d3449] col-span-2 sm:col-span-1">
              <div class="text-[10px] sm:text-[11px] font-mono text-[#94a3b8]">Est. Monthly Capacity</div>
              <div class="text-base sm:text-lg font-bold text-[#f59e0b] font-mono tabular-nums">
                ~{{ territoryResult.estHighTicketJobs }} High-Ticket
              </div>
            </div>
          </div>

          <div class="mb-5">
            <div class="text-xs font-mono text-[#94a3b8] mb-2 uppercase tracking-wider">
              High-Yield Inbound Work In This Zip:
            </div>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="srv in territoryResult.topServices"
                :key="srv"
                class="text-xs bg-[#222a3d] text-[#dae2fd] px-2.5 py-1 rounded border border-[#2d3449]"
              >
                {{ srv }}
              </span>
            </div>
          </div>

          <button
            type="button"
            class="w-full bg-[#f59e0b] hover:bg-[#ffb95f] text-[#2a1700] py-3.5 px-4 rounded font-bold text-sm tracking-tight flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(245,158,11,0.3)] transition-all cursor-pointer font-mono uppercase min-h-[48px]"
            @click="openClaimModal(territoryResult.zip)"
          >
            <span>Reserve Exclusivity for {{ territoryResult.zip }}</span>
            <ArrowRight class="w-4 h-4" />
          </button>
          <p class="text-[11px] text-[#94a3b8] text-center mt-2 font-mono">
            Zero obligation. 24-hour temporary hold applied once submitted.
          </p>
        </template>

        <div v-else>
          <p class="text-sm text-[#94a3b8] mb-4">
            This territory currently has an active exclusive electrical partner contract. No secondary contractors permitted in this radius.
          </p>
          <button
            type="button"
            class="w-full bg-[#222a3d] hover:bg-[#2d3449] text-[#f8fafc] py-3 px-4 rounded text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer min-h-[44px]"
            @click="openClaimModal(territoryResult.zip)"
          >
            Join Waitlist for Next Cycle
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
