<script setup lang="ts">
import { ArrowRight, Menu, X, Zap } from '@lucide/vue'

const { zipInput, mobileMenuOpen, openClaimModal } = useClaimModal()

const mobileLinks = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#results', label: 'Results' },
  { href: '#calculator', label: 'Capacity Calculator' },
  { href: '#pricing', label: 'Pricing (20% / $500 Min)', accent: true },
  { href: '#faq', label: 'Contractor FAQ' },
  { href: '#territory', label: 'Territory Checker' },
]
</script>

<template>
  <header class="sticky top-0 z-50 bg-[#060e20]/95 backdrop-blur-md border-b border-[#2d3449]/50 w-full transition-colors">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between">
      <!-- Logo brand lockup -->
      <a
        href="#"
        class="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] rounded py-1"
      >
        <div class="w-8 h-8 sm:w-9 sm:h-9 rounded bg-[#171f33] border border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.2)] group-hover:border-[#f59e0b] transition-all shrink-0">
          <Zap class="w-4 h-4 sm:w-5 sm:h-5 fill-[#f59e0b]" />
        </div>
        <div class="flex flex-col">
          <div class="flex items-center tracking-tight leading-none">
            <span class="font-extrabold text-[15px] sm:text-[17px] text-[#f8fafc]">VOLT</span>
            <span class="font-extrabold text-[15px] sm:text-[17px] text-[#f59e0b]">GROWTH</span>
          </div>
          <span class="text-[8px] sm:text-[9px] font-mono tracking-widest text-[#94a3b8] uppercase mt-0.5">
            Marketing For Electricians
          </span>
        </div>
      </a>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-[#94a3b8]">
        <a href="#how-it-works" class="hover:text-[#dae2fd] transition-colors py-2">How It Works</a>
        <a href="#results" class="hover:text-[#dae2fd] transition-colors py-2">Results</a>
        <a href="#calculator" class="hover:text-[#dae2fd] transition-colors py-2">Capacity Calculator</a>
        <a href="#pricing" class="hover:text-[#dae2fd] transition-colors py-2 flex items-center gap-1.5 text-[#f8fafc]">
          <span>Pricing</span>
          <span class="text-[10px] font-mono px-1.5 py-0.5 bg-[#f59e0b]/20 text-[#f59e0b] rounded border border-[#f59e0b]/30">20% / $500</span>
        </a>
        <a href="#faq" class="hover:text-[#dae2fd] transition-colors py-2">FAQ</a>
        <a href="#territory" class="hover:text-[#dae2fd] transition-colors py-2">Territory Check</a>
      </nav>

      <!-- Desktop primary CTA -->
      <div class="hidden sm:flex items-center gap-3">
        <button
          type="button"
          class="bg-[#f59e0b] hover:bg-[#ffb95f] text-[#2a1700] text-xs sm:text-sm font-bold tracking-tight px-4 sm:px-5 py-2.5 rounded font-mono uppercase transition-all duration-150 flex items-center gap-2 shadow-[0_0_16px_rgba(245,158,11,0.25)] hover:shadow-[0_0_24px_rgba(245,158,11,0.4)] active:translate-y-0.5 cursor-pointer min-h-[44px]"
          @click="openClaimModal(zipInput || '78701')"
        >
          <span>Check Availability</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>

      <!-- Mobile buttons -->
      <div class="flex sm:hidden items-center gap-2">
        <button
          type="button"
          class="bg-[#f59e0b] hover:bg-[#ffb95f] text-[#2a1700] text-[11px] font-bold font-mono uppercase px-2.5 py-1.5 rounded flex items-center gap-1 min-h-[36px]"
          @click="openClaimModal()"
        >
          <span>Check</span>
          <ArrowRight class="w-3 h-3" />
        </button>
        <button
          type="button"
          class="w-11 h-11 flex items-center justify-center text-[#dae2fd] bg-[#171f33] border border-[#2d3449] rounded hover:border-[#f59e0b]/50 transition-colors cursor-pointer"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle Navigation Menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <X v-if="mobileMenuOpen" class="w-5 h-5" />
          <Menu v-else class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile navigation drawer -->
    <div
      v-if="mobileMenuOpen"
      class="md:hidden border-t border-[#2d3449] bg-[#060e20] px-5 py-6 space-y-4 animate-in slide-in-from-top-2 duration-150 shadow-2xl"
    >
      <div class="flex flex-col space-y-3 font-mono text-sm">
        <a
          v-for="(link, i) in mobileLinks"
          :key="link.href"
          :href="link.href"
          :class="[
            'py-2 flex items-center justify-between',
            link.accent ? 'text-[#f59e0b] font-bold' : 'text-[#dae2fd] hover:text-[#f59e0b]',
            i < mobileLinks.length - 1 ? 'border-b border-[#2d3449]/40' : '',
          ]"
          @click="mobileMenuOpen = false"
        >
          <span>{{ link.label }}</span>
          <ArrowRight :class="['w-4 h-4', link.accent ? 'text-[#f59e0b]' : 'text-[#94a3b8]']" />
        </a>
      </div>

      <div class="pt-2">
        <button
          type="button"
          class="w-full bg-[#f59e0b] text-[#2a1700] py-3 rounded font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(245,158,11,0.25)] min-h-[48px]"
          @click="openClaimModal()"
        >
          <span>Reserve Territory Exclusivity</span>
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </header>
</template>
