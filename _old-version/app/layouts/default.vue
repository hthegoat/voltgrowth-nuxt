<template>
  <div class="min-h-screen bg-[#0b1326] text-[#dae2fd] font-sans antialiased selection:bg-[#f59e0b] selection:text-[#0b1326] relative overflow-x-hidden">
    <!-- Subtle blueprint grid overlay -->
    <div class="fixed inset-0 blueprint-grid pointer-events-none opacity-40 z-0" />

    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
    <ClaimModal />
  </div>
</template>
