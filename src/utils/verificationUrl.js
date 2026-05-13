/**
 * Generates a full verification URL for a given offer ID.
 * This is used by the VerificationQR component and email service.
 */
export function getVerificationUrl(offerId) {
  if (!offerId) return ""

  // URL-safe encoding for the ID (handles slashes like CPL/INT/...)
  const safeId = encodeURIComponent(offerId)
  
  /**
   * Determine the base origin. 
   * In the browser, window.location.origin dynamically adapts (e.g., localhost vs cosmolix.co.in).
   * In a non-browser environment (like server-side rendering), it defaults to the production URL.
   */
  const origin = typeof window !== "undefined" 
    ? window.location.origin 
    : "https://cosmolix.co.in"

  // Construct the final verification route
  return `${origin}/verify/${safeId}`
}