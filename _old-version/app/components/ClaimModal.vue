<script setup lang="ts">
import { ArrowRight, Check, ShieldCheck, X } from '@lucide/vue'

const { modalOpen, claimSuccess, closeModal } = useClaimModal()

const contractorName = ref('')
const companyName = ref('')
const phone = ref('')
const email = ref('')
const vansCount = ref('3-5')

const modalNameId = useId()
const modalCompanyId = useId()
const modalPhoneId = useId()
const modalEmailId = useId()
const modalVansId = useId()

const handleClaimSubmit = () => {
  claimSuccess.value = true
}

const inputClass =
  'w-full bg-[#131b2e] border border-[#2d3449] focus:border-[#f59e0b] rounded px-3 py-2.5 text-sm text-[#f8fafc] outline-none min-h-[44px]'
</script>

<template>
  <div
    v-if="modalOpen"
    role="dialog"
    aria-modal="true"
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
  >
    <div class="bg-[#171f33] border border-[#334155] rounded-lg max-w-md w-full p-5 sm:p-6 text-left shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto">
      <button
        type="button"
        class="absolute top-4 right-4 text-[#94a3b8] hover:text-[#f8fafc] transition-colors cursor-pointer p-1 rounded"
        aria-label="Close modal"
        @click="closeModal"
      >
        <X class="w-5 h-5" />
      </button>

      <!-- Success state -->
      <div v-if="claimSuccess" class="text-center py-4 sm:py-6">
        <div class="w-12 h-12 rounded-full bg-[#56e5a9]/20 border border-[#56e5a9] text-[#56e5a9] flex items-center justify-center mx-auto mb-4">
          <Check class="w-6 h-6" />
        </div>
        <h3 class="text-lg sm:text-xl font-bold text-[#f8fafc] mb-2">
          Territory Hold Active
        </h3>
        <p class="text-xs text-[#94a3b8] leading-relaxed mb-6 font-mono">
          Your provisional territory reservation has been logged. Our electrical dispatch engineer will review your fleet capacity and reach out within 1 business hour.
        </p>
        <div class="p-3 bg-[#131b2e] rounded border border-[#2d3449] text-xs font-mono text-[#dae2fd] text-left mb-6 space-y-1">
          <div><span class="text-[#94a3b8]">Company:</span> {{ companyName || 'Master Craft Electric' }}</div>
          <div><span class="text-[#94a3b8]">Contact:</span> {{ phone || '(555) 019-2831' }}</div>
          <div><span class="text-[#94a3b8]">Model:</span> 20% of Ad Spend ($500/mo min)</div>
          <div><span class="text-[#94a3b8]">Status:</span> Priority Screening (14-Day Cycle)</div>
        </div>
        <button
          type="button"
          class="w-full bg-[#f59e0b] hover:bg-[#ffb95f] text-[#2a1700] py-3 rounded font-mono font-bold text-xs uppercase cursor-pointer transition-colors min-h-[44px]"
          @click="closeModal"
        >
          Return to Dashboard
        </button>
      </div>

      <!-- Form state -->
      <template v-else>
        <div class="mb-4 sm:mb-5">
          <div class="flex items-center gap-2 text-xs font-mono text-[#f59e0b] uppercase tracking-wider mb-1">
            <ShieldCheck class="w-4 h-4" />
            <span>Exclusive Territory Lock</span>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-[#f8fafc]">
            Lock Your Service Radius
          </h3>
          <p class="text-xs text-[#94a3b8] mt-1 font-mono">
            Ensure competing contractors in your postal region cannot purchase your qualified lead volume.
          </p>
        </div>

        <form class="space-y-3.5" @submit.prevent="handleClaimSubmit">
          <div>
            <label :for="modalNameId" class="block text-xs font-mono text-[#94a3b8] mb-1">
              Your Name / Title *
            </label>
            <input
              :id="modalNameId"
              v-model="contractorName"
              type="text"
              required
              autocomplete="name"
              placeholder="e.g. Dave Miller, Master Electrician"
              :class="inputClass"
            >
          </div>

          <div>
            <label :for="modalCompanyId" class="block text-xs font-mono text-[#94a3b8] mb-1">
              Electrical Business Name *
            </label>
            <input
              :id="modalCompanyId"
              v-model="companyName"
              type="text"
              required
              autocomplete="organization"
              placeholder="e.g. Ampere Electric LLC"
              :class="inputClass"
            >
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label :for="modalPhoneId" class="block text-xs font-mono text-[#94a3b8] mb-1">
                Direct Phone *
              </label>
              <input
                :id="modalPhoneId"
                v-model="phone"
                type="tel"
                required
                autocomplete="tel"
                placeholder="(555) 000-0000"
                :class="inputClass"
              >
            </div>
            <div>
              <label :for="modalVansId" class="block text-xs font-mono text-[#94a3b8] mb-1">
                Active Vans
              </label>
              <select :id="modalVansId" v-model="vansCount" :class="inputClass">
                <option value="1-2">1-2 Vans ($500 Min)</option>
                <option value="3-5">3-5 Vans (20% Ad Spend)</option>
                <option value="6-10">6-10 Vans (20% Ad Spend)</option>
                <option value="11+">11+ Vans (Enterprise MEP)</option>
              </select>
            </div>
          </div>

          <div>
            <label :for="modalEmailId" class="block text-xs font-mono text-[#94a3b8] mb-1">
              Business Email *
            </label>
            <input
              :id="modalEmailId"
              v-model="email"
              type="email"
              required
              autocomplete="email"
              placeholder="dave@ampereelectric.com"
              :class="inputClass"
            >
          </div>

          <div class="pt-2">
            <button
              type="submit"
              class="w-full bg-[#f59e0b] hover:bg-[#ffb95f] text-[#2a1700] py-3.5 rounded font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(245,158,11,0.25)] transition-all cursor-pointer min-h-[48px]"
            >
              <span>Confirm 24-Hour Exclusivity Hold</span>
              <ArrowRight class="w-4 h-4" />
            </button>
            <p class="text-[10px] text-[#94a3b8] text-center mt-2 font-mono">
              Pricing: $500 min or 20% of ad spend. No credit card required to hold territory.
            </p>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>
