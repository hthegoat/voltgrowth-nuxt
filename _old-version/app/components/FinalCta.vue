<script setup lang="ts">
import { ArrowRight, Zap } from '@lucide/vue'

const { zipInput, openClaimModal } = useClaimModal()
</script>

<template>
  <section class="py-16 sm:py-20 bg-[#131b2e] relative z-10">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <div class="w-12 h-12 rounded bg-[#171f33] border border-[#f59e0b]/50 text-[#f59e0b] flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
        <Zap class="w-6 h-6 fill-[#f59e0b]" />
      </div>
      <h2 class="text-2xl sm:text-4xl font-extrabold text-[#f8fafc] tracking-tight mb-3 sm:mb-4 text-balance">
        Own your service territory before your competitor locks it.
      </h2>
      <p class="text-[#94a3b8] text-xs sm:text-base max-w-xl mx-auto mb-6 sm:mb-8 text-balance">
        We partner with strictly one electrical contractor per market radius. Verify availability for your ZIP codes today.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          class="w-full sm:w-auto bg-[#f59e0b] hover:bg-[#ffb95f] text-[#2a1700] px-6 sm:px-8 py-3.5 rounded font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(245,158,11,0.3)] transition-all cursor-pointer font-mono uppercase min-h-[48px]"
          @click="openClaimModal(zipInput || '78701')"
        >
          <span>Lock My Territory Exclusivity</span>
          <ArrowRight class="w-4 h-4" />
        </button>
        <a
          href="#territory"
          class="text-xs font-mono text-[#94a3b8] hover:text-[#f8fafc] transition-colors py-2 px-4"
        >
          Back to ZIP code search ↑
        </a>
      </div>
    </div>
  </section>
</template>
