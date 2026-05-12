import html2pdf from "html2pdf.js"

import { prepareCloneForHtml2Canvas } from "@/utils/pdfCaptureCompat"

export const exportOfferLetterPdf = async ({
  elementId = "offer-letter",
  studentName = "Student",
  offerId = "CPL-001",
}) => {
  const element = document.getElementById(elementId)

  if (!element) {
    return Promise.reject(new Error("Offer letter element not found"))
  }

  element.scrollIntoView({ block: "nearest", inline: "nearest" })
  await new Promise((resolve) => {
    requestAnimationFrame(() => resolve())
  })

  const safeName = String(studentName || "Student").replace(/[/\\?%*:|"<>]/g, "_")
  const safeId = String(offerId || "offer").replace(/[/\\?%*:|"<>]/g, "_")

  const opt = {
    margin: [0, 0, 0, 0],

    filename: `${safeName}_${safeId}.pdf`,

    image: {
      type: "jpeg",
      quality: 0.98,
    },

    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,

      onclone(clonedDoc) {
        const originalRoot = document.getElementById(elementId)

        prepareCloneForHtml2Canvas(clonedDoc, originalRoot, elementId)
      },
    },

    jsPDF: {
      unit: "px",
      format: "a4",
      orientation: "portrait",
    },

    pagebreak: {
      mode: ["css", "legacy"],
      before: ".page-break-before",
      after: ".page-break-after",
      avoid: ".no-break",
    },
  }

  return html2pdf().set(opt).from(element).save()
}
