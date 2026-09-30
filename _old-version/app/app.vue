<script setup lang="ts">
const { modalOpen, mobileMenuOpen, closeModal } = useClaimModal()

// Close modal / mobile menu on Escape
const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeModal()
    mobileMenuOpen.value = false
  }
}

onMounted(() => window.addEventListener('keydown', onKeyDown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  document.body.style.overflow = 'unset'
})

// Prevent background scroll when modal or mobile menu is open
watch(
  [modalOpen, mobileMenuOpen],
  ([modal, menu]) => {
    if (import.meta.client) {
      document.body.style.overflow = modal || menu ? 'hidden' : 'unset'
    }
  },
  { immediate: true },
)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
