const STORAGE_KEY = "cosmolix-offer-registry-v1"

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    // Extra safety: ensure we are dealing with a standard object
    return (parsed && typeof parsed === "object" && !Array.isArray(parsed)) ? parsed : {}
  } catch (error) {
    console.error("Registry Read Error:", error)
    return {}
  }
}

export function saveOfferRecord(offerId, payload) {
  if (!offerId) return

  const all = readAll()
  
  // Create a clean record entry
  all[offerId] = {
    ...payload,
    offerId,
    // Ensure we capture the exact time of generation for verification audit
    updatedAt: new Date().toISOString(),
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch (error) {
    // This usually triggers in "Incognito/Private" mode or if LocalStorage is full
    console.warn("Registry Save Failed (Quota or Private Mode):", error)
  }
}

export function getOfferRecord(offerId) {
  if (!offerId) return null
  
  const all = readAll()
  const record = all[offerId]
  
  if (!record) {
    console.warn(`No record found for ID: ${offerId}`)
    return null
  }
  
  return record
}