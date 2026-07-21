import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import { prepareCloneForHtml2Canvas } from "@/utils/pdfCaptureCompat"
import { uploadPdf } from "@/utils/uploadPdf"

export const exportOfferLetterPdf = async ({
  elementId = "offer-letter",
  studentName = "Student",
  offerId = "CPL-001",
}) => {
  const container = document.getElementById(elementId)

  if (!container) {
    return Promise.reject(new Error("Offer letter element not found"))
  }

  // Ensure the element is scrolled into view so all assets are active
  container.scrollIntoView({ block: "nearest", inline: "nearest" })

  const safeName = String(studentName || "Student").replace(/[/\\?%*:|"<>]/g, "_")
  const safeId = String(offerId || "offer").replace(/[/\\?%*:|"<>]/g, "_")
  const fileName = `${safeName}_${safeId}.pdf`

  // Select all individual pages dynamically (Page 1 and Page 2)
  const pages = Array.from(container.querySelectorAll(".offer-page"))
  
  if (pages.length === 0) {
    return Promise.reject(new Error("No pages found to export"))
  }

  // Initialize PDF exactly at A4 size
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [794, 1123],
    hotfixes: ["px_scaling"],
  })

  try {
    // Loop through each page, capture it, and add to PDF
    for (let i = 0; i < pages.length; i++) {
      const pageElement = pages[i]

      const canvas = await html2canvas(pageElement, {
        scale: 3, // High scale for professional print quality
        useCORS: true,
        logging: false,
        letterRendering: true,
        windowWidth: 800,
        onclone: (clonedDoc) => {
          prepareCloneForHtml2Canvas(clonedDoc, pageElement, elementId)
        },
      })

      const imgData = canvas.toDataURL("image/jpeg", 1.0)

      // Add a new PDF page for every page after the first one
      if (i > 0) {
        pdf.addPage([794, 1123], "portrait")
      }

      // Paint the canvas exact to the edges (0, 0, width, height)
      pdf.addImage(imgData, "JPEG", 0, 0, 794, 1123)
    }

    // Generate Blob for Supabase
    const pdfBlob = pdf.output("blob")

    // UPLOAD TO SUPABASE
    const publicUrl = await uploadPdf({
      blob: pdfBlob,
      fileName,
    })

    // STILL DOWNLOAD LOCALLY
    pdf.save(fileName)

    return publicUrl
  } catch (err) {
    console.error("PDF Engine Error:", err)
    throw err
  }
}