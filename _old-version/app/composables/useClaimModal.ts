/**
 * Shared UI state used across the header, hero, calculator, pricing and modal.
 * useState keeps it SSR-safe and shared between components.
 */
export const useClaimModal = () => {
  const zipInput = useState<string>('zipInput', () => '')
  const modalOpen = useState<boolean>('modalOpen', () => false)
  const mobileMenuOpen = useState<boolean>('mobileMenuOpen', () => false)
  const claimSuccess = useState<boolean>('claimSuccess', () => false)

  const openClaimModal = (customZip?: string) => {
    if (customZip) zipInput.value = customZip
    modalOpen.value = true
    mobileMenuOpen.value = false
  }

  const closeModal = () => {
    modalOpen.value = false
    claimSuccess.value = false
  }

  return { zipInput, modalOpen, mobileMenuOpen, claimSuccess, openClaimModal, closeModal }
}
