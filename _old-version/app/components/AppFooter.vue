<script setup lang="ts">
const showPolicy = () => {
  alert(
    'VoltGrowth Territory Policy: Strictly 1 electrical contractor per 15-mile service boundary. 20% of ad spend or $500/mo minimum. No shared or resold leads.',
  )
}
</script>

<template>
  <footer class="bg-[#060e20] border-t border-[#2d3449]/40 relative z-10">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-[#94a3b8]">
      <div class="flex items-center gap-2 font-mono text-xs">
        <span class="text-[#f8fafc] font-bold">VoltGrowth</span>
        <span>•</span>
        <span>© 2025 VoltGrowth Performance Marketing</span>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono">
        <a href="#territory" class="hover:text-[#f59e0b] transition-colors">Check Territory</a>
        <a href="#pricing" class="hover:text-[#f59e0b] transition-colors">Pricing Details</a>
        <a href="#how-it-works" class="hover:text-[#f59e0b] transition-colors">System Specs</a>
        <a href="#faq" class="hover:text-[#f59e0b] transition-colors">Contractor FAQ</a>
        <button
          type="button"
          class="hover:text-[#f59e0b] transition-colors cursor-pointer"
          @click="showPolicy"
        >
          Exclusivity Policy
        </button>
      </div>
    </div>
  </footer>
</template>
