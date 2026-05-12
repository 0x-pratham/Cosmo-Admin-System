const STORAGE_KEY = "cosmolix-offer-registry-v1"

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return typeof parsed === "object" && parsed !== null ? parsed : {}
  } catch {
    return {}
  }
}

export function saveOfferRecord(offerId, payload) {
  if (!offerId) return

  const all = readAll()
  all[offerId] = {
    ...payload,
    offerId,
    updatedAt: new Date().toISOString(),
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch {
    /* quota / private mode */
  }
}

export function getOfferRecord(offerId) {
  if (!offerId) return null
  const all = readAll()
  return all[offerId] ?? null
}
