/**
 * Base URL for verification links (QR + manual URLs).
 * Uses current origin so local dev and deployed builds stay in sync.
 */
export function getVerificationUrl(offerId) {
  if (!offerId) return ""

  const safeId = encodeURIComponent(offerId)
  const base = import.meta.env.BASE_URL || "/"
  const normalizedBase = base.endsWith("/") ? base : `${base}/`

  if (typeof window !== "undefined") {
    return `${window.location.origin}${normalizedBase}verify/${safeId}`
  }

  return `${normalizedBase}verify/${safeId}`
}
