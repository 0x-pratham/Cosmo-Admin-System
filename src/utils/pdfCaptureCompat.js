/**
 * html2canvas (used by html2pdf.js) cannot parse modern CSS color functions like
 * `oklch()`, which Tailwind v4 emits. We mirror the live DOM into the cloned
 * document using computed styles (resolved to rgb/hex in browsers) and strip
 * stylesheets/classes so the canvas step never sees raw oklch rules.
 */

export function sanitizeCssColorFunctions(value) {
  if (typeof value !== "string" || !value) return value

  return value
    .replace(/\boklch\([^)]*\)/gi, "#64748b")
    .replace(/\blab\([^)]*\)/gi, "#64748b")
    .replace(/\blch\([^)]*\)/gi, "#64748b")
    .replace(/\bhwb\([^)]*\)/gi, "#64748b")
    .replace(/\bcolor\([^)]*\)/gi, "#64748b")
}

function copyComputedStyles(sourceEl, targetEl) {
  if (
    sourceEl.nodeType !== Node.ELEMENT_NODE ||
    targetEl.nodeType !== Node.ELEMENT_NODE
  ) {
    return
  }

  const computed = window.getComputedStyle(sourceEl)

  for (let i = 0; i < computed.length; i++) {
    const prop = computed[i]

    try {
      let val = computed.getPropertyValue(prop)

      if (!val) continue

      val = sanitizeCssColorFunctions(val)

      targetEl.style.setProperty(prop, val, computed.getPropertyPriority(prop))
    } catch {
      /* invalid property for inline style */
    }
  }

  const srcChildren = sourceEl.children
  const tgtChildren = targetEl.children
  const n = Math.min(srcChildren.length, tgtChildren.length)

  for (let i = 0; i < n; i++) {
    copyComputedStyles(srcChildren[i], tgtChildren[i])
  }
}

export function stripClassNames(rootEl) {
  if (rootEl.nodeType !== Node.ELEMENT_NODE) return

  rootEl.removeAttribute("class")

  for (const child of rootEl.children) {
    stripClassNames(child)
  }
}

export function removeExternalStylesFromClone(clonedDoc) {
  clonedDoc.querySelectorAll('link[rel="stylesheet"]').forEach((node) => {
    node.remove()
  })

  clonedDoc.querySelectorAll("style").forEach((node) => {
    node.remove()
  })
}

/**
 * @param {Document} clonedDoc - html2canvas clone
 * @param {HTMLElement} originalRoot - live `#offer-letter` node
 * @param {string} elementId
 */
export function prepareCloneForHtml2Canvas(clonedDoc, originalRoot, elementId) {
  const clonedRoot = clonedDoc.getElementById(elementId)

  if (!clonedRoot || !originalRoot) return

  copyComputedStyles(originalRoot, clonedRoot)
  stripClassNames(clonedRoot)
  removeExternalStylesFromClone(clonedDoc)
}
