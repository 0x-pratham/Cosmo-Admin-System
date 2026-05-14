export function getVerificationUrl(offerId) {
  if (!offerId) return ""

  const safeId = encodeURIComponent(offerId)

  const origin = typeof window !== "undefined" 
    ? window.location.origin 
    : "https://admin.cosmolix.co.in"

  // Construct the final verification route
  return `${origin}/verify/${safeId}`
}