import { takenZips } from '~/data/territories'

export type AreaStatus = 'open' | 'taken'

/** Shared ZIP state so the header and final CTA can send people to the checker. */
export const useArea = () => {
  const zip = useState<string>('area-zip', () => '')
  const status = useState<AreaStatus | null>('area-status', () => null)
  const wantsCallTest = useState<boolean>('area-call-test', () => false)

  const check = (value: string) => {
    const clean = value.replace(/\D/g, '').slice(0, 5)
    if (clean.length !== 5) return false
    zip.value = clean
    status.value = takenZips.includes(clean) ? 'taken' : 'open'
    return true
  }

  const reset = () => {
    status.value = null
  }

  return { zip, status, wantsCallTest, check, reset }
}
