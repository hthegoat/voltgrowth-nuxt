<script setup lang="ts">
import { ArrowRight, Check, CheckCircle2, Clock, Percent, ShieldCheck, Tag } from '@lucide/vue'

const { zipInput, openClaimModal } = useClaimModal()

// Interactive pricing state
const adSpend = ref(4000)
const presets = [2000, 4000, 7500]

const managementFee = computed(() => Math.max(500, Math.round(adSpend.value * 0.2)))
const isMinimumFloor = computed(() => adSpend.value * 0.2 < 500)
const totalOutlay = computed(() => adSpend.value + managementFee.value)
const estMonthlyLeads = computed(() => Math.round(adSpend.value / 140))
const estClosedJobs = computed(() => Math.round(estMonthlyLeads.value * 0.45))
const estRevenueGross = computed(() => estClosedJobs.value * 3400)
const estRoiMultiple = computed(() => (estRevenueGross.value / totalOutlay.value).toFixed(1))

const plans = [
  {
    name: 'Starter Territory',
    range: '1–2 Vans',
    price: '$500',
    priceSuffix: '/ month',
    note: 'Minimum fee baseline ($1.5k–$2.5k ad spend)',
    noteClass: 'text-[#f59e0b]',
    description:
      'Ideal for master electricians transitioning off shared lead sites like Angi to exclusive localized territory dominance.',
    features: [
      'Single 15-mile protected territory radius',
      'Automated $75 repair triage & filter',
      '200A/400A panel upgrade campaign setup',
      'Direct phone call & email lead dispatch',
    ],
    cta: 'Select Starter Plan',
    highlight: false,
  },
  {
    name: 'Growth Fleet',
    range: '3–6 Vans',
    price: '20%',
    priceSuffix: 'of Ad Spend',
    note: 'Typically $600 – $1,300/mo ($3k–$6.5k spend)',
    noteClass: 'text-[#56e5a9]',
    description:
      'Engineered to keep multiple electrician crews fully booked with high-dollar panel replacements and commercial EV chargers.',
    features: [
      'Expanded 20-mile county territory lock',
      'Multi-service campaigns (Panels + Commercial EV)',
      'Deep ServiceTitan / Housecall Pro webhook sync',
      'Automated call recording & estimator qualification triage',
      'Bi-weekly negative keyword negative pruning',
    ],
    cta: 'Claim Growth Fleet',
    highlight: true,
    badge: 'Most Popular for Fleets',
  },
  {
    name: 'Enterprise MEP',
    range: '7+ Vans / Multi-Branch',
    price: '20%',
    priceSuffix: 'of Ad Spend',
    note: 'Custom scale for $7,500+ monthly spend',
    noteClass: 'text-[#56e5a9]',
    description:
      'Full multi-county territory ring-fencing for large enterprise MEP firms demanding heavy commercial infrastructure and whole-building jobs.',
    features: [
      'Multi-county exclusive geographic lock',
      'Commercial rewires, generators & heavy fit-outs',
      'Custom multi-dispatcher zone routing',
      'Dedicated senior ads engineer & weekly audit calls',
      'Right of first refusal on adjacent territory expansion',
    ],
    cta: 'Consult Enterprise',
    highlight: false,
  },
]
</script>

<template>
  <section id="pricing" class="py-16 sm:py-24 bg-[#131b2e] border-b border-[#2d3449]/60 relative z-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 max-w-2xl mx-auto">
        <div class="inline-flex items-center gap-1.5 text-xs font-mono text-[#f59e0b] uppercase tracking-widest mb-2">
          <Tag class="w-3.5 h-3.5" />
          <span>Transparent Trade Pricing</span>
        </div>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#f8fafc] tracking-tight">
          Performance Pricing Tied to Van Output
        </h2>
        <p class="text-xs sm:text-base text-[#94a3b8] mt-2 text-balance leading-relaxed">
          No bloated retainers or mysterious agency markups. We charge a minimum of <span class="text-[#f8fafc] font-bold">$500/month</span> or <span class="text-[#f59e0b] font-bold">20% of managed ad spend</span>—scaling as your vans get booked.
        </p>
      </div>

      <!-- Interactive pricing estimator -->
      <div class="bg-[#171f33] border border-[#334155] rounded-lg p-5 sm:p-8 mb-12 shadow-2xl">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#2d3449]">
          <div>
            <h3 class="text-base sm:text-lg font-bold text-[#f8fafc] flex items-center gap-2">
              <span>Interactive Ad Spend & Fee Estimator</span>
            </h3>
            <p class="text-xs font-mono text-[#94a3b8] mt-0.5">
              See the exact management fee and expected pipeline return for your target ad budget:
            </p>
          </div>
          <div class="text-xs font-mono text-[#56e5a9] bg-[#56e5a9]/10 px-3 py-1 rounded border border-[#56e5a9]/30 self-start sm:self-auto flex items-center gap-1.5">
            <Check class="w-3.5 h-3.5" />
            <span>0% Ad Spend Markup</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <!-- Slider controller -->
          <div class="space-y-6">
            <div>
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs sm:text-sm font-semibold text-[#f8fafc]">Target Monthly Ad Spend</span>
                <span class="text-base sm:text-lg font-bold font-mono text-[#f59e0b] tabular-nums px-2.5 py-0.5 bg-[#131b2e] border border-[#2d3449] rounded">
                  ${{ formatNumber(adSpend) }} <span class="text-xs font-normal text-[#94a3b8]">/ mo</span>
                </span>
              </div>

              <input
                v-model.number="adSpend"
                type="range"
                min="1500"
                max="12000"
                step="500"
                aria-label="Target monthly ad spend"
                class="w-full h-3 bg-[#222a3d] rounded-lg appearance-none cursor-pointer accent-[#f59e0b]"
              >

              <div class="flex justify-between text-[11px] font-mono text-[#94a3b8] mt-2">
                <span>$1,500</span>
                <span>$4,000</span>
                <span>$8,000</span>
                <span>$12,000</span>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="preset in presets"
                :key="preset"
                type="button"
                :class="[
                  'py-2 px-2.5 rounded border text-xs font-mono transition-colors cursor-pointer text-center',
                  adSpend === preset
                    ? 'bg-[#222a3d] border-[#f59e0b] text-[#f8fafc]'
                    : 'bg-[#131b2e] border-[#2d3449] text-[#94a3b8] hover:text-[#f8fafc]',
                ]"
                @click="adSpend = preset"
              >
                ${{ formatNumber(preset) }} Budget
              </button>
            </div>

            <div class="p-3 bg-[#131b2e] border border-[#2d3449] rounded text-xs text-[#94a3b8] space-y-1.5">
              <div class="flex items-center gap-2 text-[#dae2fd]">
                <Percent class="w-4 h-4 text-[#f59e0b] shrink-0" />
                <span class="font-semibold">Fee Calculation Formula:</span>
              </div>
              <p class="font-mono text-[11px] pl-6 text-[#94a3b8]">
                <span v-if="isMinimumFloor" class="text-[#f59e0b]">
                  20% of ${{ formatNumber(adSpend) }} = ${{ Math.round(adSpend * 0.2) }} (Under $500 baseline → Minimum $500/mo fee applied)
                </span>
                <span v-else class="text-[#56e5a9]">
                  20% of ${{ formatNumber(adSpend) }} = ${{ formatNumber(managementFee) }}/mo fee
                </span>
              </p>
            </div>
          </div>

          <!-- Yield breakdown -->
          <div class="bg-[#131b2e] border border-[#2d3449] rounded-lg p-5 sm:p-6 space-y-4">
            <div class="grid grid-cols-2 gap-3 pb-4 border-b border-[#2d3449]">
              <div>
                <div class="text-[11px] font-mono text-[#94a3b8]">VoltGrowth Fee</div>
                <div class="text-xl sm:text-2xl font-bold font-mono text-[#f8fafc] tabular-nums mt-0.5">
                  ${{ formatNumber(managementFee) }}
                  <span class="text-xs font-normal text-[#94a3b8]"> / mo</span>
                </div>
                <div class="text-[10px] font-mono text-[#56e5a9] mt-0.5">
                  {{ isMinimumFloor ? 'Minimum $500 floor' : '20% of ad spend' }}
                </div>
              </div>
              <div>
                <div class="text-[11px] font-mono text-[#94a3b8]">Direct Ad Budget</div>
                <div class="text-xl sm:text-2xl font-bold font-mono text-[#dae2fd] tabular-nums mt-0.5">
                  ${{ formatNumber(adSpend) }}
                  <span class="text-xs font-normal text-[#94a3b8]"> / mo</span>
                </div>
                <div class="text-[10px] font-mono text-[#94a3b8] mt-0.5">
                  Billed direct by Google
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 pt-1">
              <div>
                <div class="text-[11px] font-mono text-[#94a3b8]">Est. Closed Jobs</div>
                <div class="text-lg sm:text-xl font-bold font-mono text-[#f59e0b] tabular-nums mt-0.5">
                  ~{{ estClosedJobs }} High-Ticket
                </div>
                <div class="text-[10px] font-mono text-[#94a3b8]">Avg $3,400 ticket</div>
              </div>
              <div>
                <div class="text-[11px] font-mono text-[#94a3b8]">Est. Added Gross</div>
                <div class="text-lg sm:text-xl font-bold font-mono text-[#56e5a9] tabular-nums mt-0.5">
                  ${{ formatNumber(estRevenueGross) }}
                  <span class="text-xs font-normal text-[#94a3b8]"> / mo</span>
                </div>
                <div class="text-[10px] font-mono text-[#56e5a9]">
                  ~{{ estRoiMultiple }}x Estimated ROI
                </div>
              </div>
            </div>

            <div class="pt-3 border-t border-[#2d3449]">
              <button
                type="button"
                class="w-full bg-[#f59e0b] hover:bg-[#ffb95f] text-[#2a1700] py-3 rounded font-mono font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(245,158,11,0.25)] cursor-pointer transition-all"
                @click="openClaimModal(zipInput || '78701')"
              >
                <span>Lock Territory at ${{ formatNumber(adSpend) }}/mo Spend</span>
                <ArrowRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 3 capacity plan cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          v-for="plan in plans"
          :key="plan.name"
          :class="[
            'bg-[#171f33] rounded-lg p-6 flex flex-col justify-between',
            plan.highlight
              ? 'border-2 border-[#f59e0b] relative shadow-[0_0_24px_rgba(245,158,11,0.15)]'
              : 'border border-[#2d3449] hover:border-[#2d3449] transition-colors',
          ]"
        >
          <div
            v-if="plan.badge"
            class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f59e0b] text-[#2a1700] text-[10px] font-mono font-extrabold uppercase px-3 py-0.5 rounded-full tracking-wider shadow"
          >
            {{ plan.badge }}
          </div>

          <div>
            <div class="flex justify-between items-center mb-3">
              <span
                :class="[
                  'text-xs font-mono uppercase tracking-wider',
                  plan.highlight ? 'text-[#f59e0b]' : 'text-[#94a3b8]',
                ]"
              >
                {{ plan.name }}
              </span>
              <span
                :class="[
                  'text-[10px] font-mono px-2 py-0.5 rounded bg-[#131b2e] border',
                  plan.highlight
                    ? 'text-[#f59e0b] border-[#f59e0b]/40'
                    : 'text-[#dae2fd] border-[#2d3449]',
                ]"
              >
                {{ plan.range }}
              </span>
            </div>
            <div class="mb-4">
              <div class="flex items-baseline gap-1">
                <span class="text-3xl font-extrabold text-[#f8fafc] font-mono tabular-nums">{{ plan.price }}</span>
                <span class="text-xs font-mono text-[#94a3b8]">{{ plan.priceSuffix }}</span>
              </div>
              <div :class="['text-xs font-mono mt-1', plan.noteClass]">
                {{ plan.note }}
              </div>
            </div>
            <p class="text-xs text-[#94a3b8] leading-relaxed mb-5">
              {{ plan.description }}
            </p>

            <div class="space-y-2.5 text-xs text-[#dae2fd] pt-4 border-t border-[#2d3449]">
              <div v-for="feature in plan.features" :key="feature" class="flex items-start gap-2">
                <Check class="w-3.5 h-3.5 text-[#56e5a9] shrink-0 mt-0.5" />
                <span>{{ feature }}</span>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-[#2d3449]">
            <button
              type="button"
              :class="[
                'w-full py-2.5 rounded font-mono font-bold text-xs uppercase cursor-pointer transition-colors',
                plan.highlight
                  ? 'bg-[#f59e0b] hover:bg-[#ffb95f] text-[#2a1700] shadow'
                  : 'bg-[#131b2e] hover:bg-[#222a3d] border border-[#2d3449] hover:border-[#f59e0b] text-[#f8fafc]',
              ]"
              @click="openClaimModal(zipInput || '78701')"
            >
              {{ plan.cta }}
            </button>
          </div>
        </div>
      </div>

      <!-- Core guarantees banner -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono text-[#94a3b8] bg-[#171f33]/60 p-4 rounded-lg border border-[#2d3449]/70">
        <div class="flex items-center gap-2">
          <ShieldCheck class="w-4 h-4 text-[#56e5a9] shrink-0" />
          <span>You own Google Ads account directly</span>
        </div>
        <div class="flex items-center gap-2">
          <CheckCircle2 class="w-4 h-4 text-[#56e5a9] shrink-0" />
          <span>Strict 1-contractor exclusivity per territory</span>
        </div>
        <div class="flex items-center gap-2">
          <Clock class="w-4 h-4 text-[#56e5a9] shrink-0" />
          <span>Month-to-month after 90-day onboarding</span>
        </div>
      </div>
    </div>
  </section>
</template>
