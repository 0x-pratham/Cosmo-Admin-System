/**
 * Sanitizes both oklch and oklab color functions to a safe Hex fallback.
 */
export function sanitizeCssColorFunctions(value) {
  if (typeof value !== "string" || !value) return value
  
  // Catch both oklch and oklab
  if (value.includes("oklch") || value.includes("oklab")) {
    return "#0f172a"
  }
  return value
}

/**
 * @param {Document} clonedDoc - The internal document used by html2canvas
 * @param {HTMLElement} originalRoot - The actual live DOM element
 * @param {string} elementId - The ID of the container ('offer-letter')
 */
export function prepareCloneForHtml2Canvas(clonedDoc, originalRoot, elementId) {
  const clonedRoot = clonedDoc.getElementById(elementId)
  if (!clonedRoot) return

  // 1. Force a white background/dark text on the root to clear global defaults
  clonedRoot.style.setProperty("background-color", "#ffffff", "important")
  clonedRoot.style.setProperty("color", "#0f172a", "important")

  // 2. Deep sanitize all elements in the clone
  const allClonedElements = clonedRoot.querySelectorAll("*")
  
  allClonedElements.forEach((el) => {
    // Check inline styles for oklch OR oklab
    const inlineStyle = el.getAttribute("style") || ""
    if (inlineStyle.includes("oklch") || inlineStyle.includes("oklab")) {
      // Regex updated to catch oklab as well
      const sanitized = inlineStyle.replace(/(oklch|oklab)\([^)]*\)/g, "#0f172a")
      el.setAttribute("style", sanitized)
    }

    try {
      // We look at the computed style from the ORIGINAL element (live DOM)
      // because the clone's styles might not be fully computed yet.
      const originalEl = Array.from(originalRoot.querySelectorAll("*"))[
        Array.from(allClonedElements).indexOf(el)
      ];
      
      const computed = window.getComputedStyle(originalEl || el)
      
      const propertiesToFix = [
        "color", 
        "background-color", 
        "border-color", 
        "fill", 
        "stroke"
      ]

      propertiesToFix.forEach(prop => {
        const val = computed.getPropertyValue(prop)
        // Check for both modern color functions
        if (val && (val.includes("oklch") || val.includes("oklab"))) {
          const fallback = prop === "background-color" ? "#ffffff" : "#0f172a"
          el.style.setProperty(prop, fallback, "important")
        }
      })
    } catch (e) {
      // Silently fail if style computation is blocked
    }
  })

  // 3. Scrub Style Tags: This is where global Tailwind/Radix variables live
  const styleTags = clonedDoc.querySelectorAll("style")
  styleTags.forEach(tag => {
    if (tag.innerHTML.includes("oklch") || tag.innerHTML.includes("oklab")) {
      // Use a global regex to replace all instances in the CSS sheet
      tag.innerHTML = tag.innerHTML.replace(/(oklch|oklab)\([^)]*\)/g, "#0f172a")
    }
  })
}