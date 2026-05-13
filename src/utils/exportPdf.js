import html2pdf from "html2pdf.js"
import { prepareCloneForHtml2Canvas } from "@/utils/pdfCaptureCompat"
import { uploadPdf } from "@/utils/uploadPdf"

export const exportOfferLetterPdf = async ({
  elementId = "offer-letter",
  studentName = "Student",
  offerId = "CPL-001",
}) => {
  const element = document.getElementById(elementId)

  if (!element) {
    return Promise.reject(new Error("Offer letter element not found"))
  }

  // Ensure the element is scrolled into view so all assets are "active" in the browser
  element.scrollIntoView({ block: "nearest", inline: "nearest" })

  const safeName = String(studentName || "Student").replace(/[/\\?%*:|"<>]/g, "_")
  const safeId = String(offerId || "offer").replace(/[/\\?%*:|"<>]/g, "_")

  const opt = {
    margin: 0,
    filename: `${safeName}_${safeId}.pdf`,
    image: { type: "jpeg", quality: 1.0 },
    html2canvas: {
      scale: 3, // High scale for professional print quality
      useCORS: true, // Necessary for loading logos/stamps from other domains or assets
      logging: false,
      letterRendering: true,
      windowWidth: 800, // Fixed width to ensure Tailwind 'sm' or 'md' breakpoints don't trigger
      onclone: (clonedDoc) => {
        // This is the critical step that strips the 'oklch' colors before the crash
        prepareCloneForHtml2Canvas(clonedDoc, element, elementId)
      },
    },
    jsPDF: {
      unit: "px",
      format: [794, 1123], // Exact A4 dimensions at 96 DPI
      orientation: "portrait",
      hotfixes: ["px_scaling"],
    },
  }

  try {
    // We execute the generation
    const worker =
  html2pdf()
    .set(opt)
    .from(element)

const pdfBlob =
  await worker.outputPdf("blob")

// FILE NAME
const fileName =
  `${safeName}_${safeId}.pdf`

// UPLOAD TO SUPABASE
const publicUrl =
  await uploadPdf({
    blob: pdfBlob,
    fileName,
  })

// STILL DOWNLOAD LOCALLY
await worker.save()

return publicUrl
  } catch (err) {
    console.error("PDF Engine Error:", err)
    throw err
  }
}