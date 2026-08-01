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

  container.scrollIntoView({ block: "nearest", inline: "nearest" })

  const safeName = String(studentName || "Student").replace(/[/\\?%*:|"<>]/g, "_")
  const safeId = String(offerId || "offer").replace(/[/\\?%*:|"<>]/g, "_")
  const fileName = `${safeName}_${safeId}.pdf`

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [794, 1123],
    hotfixes: ["px_scaling"],
  })

  try {
    // FIX 2, 3, & 4: devicePixelRatio scale, removed letterRendering, fixed canvas width/height
    const canvas = await html2canvas(container, {
      scale: window.devicePixelRatio || 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: 794,
      height: 1123,
      scrollX: 0,
      scrollY: 0,
      removeContainer: true,

      onclone: (clonedDoc) => {
        prepareCloneForHtml2Canvas(clonedDoc, container, elementId)
      },
    })

    // FIX 7: Highest quality PNG data URL
    const imgData = canvas.toDataURL("image/png", 1.0)

    // FIX 1: Natural aspect ratio calculation to prevent force-stretching
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST")

    const pdfBlob = pdf.output("blob")

    const publicUrl = await uploadPdf({
      blob: pdfBlob,
      fileName,
    })

    pdf.save(fileName)

    return publicUrl
  } catch (err) {
    console.error("PDF Engine Error:", err)
    throw err
  }
}