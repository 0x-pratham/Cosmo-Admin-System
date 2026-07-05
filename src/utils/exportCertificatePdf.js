import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { supabase } from "@/lib/supabase"
 
export async function exportCertificatePdf({ studentName, certificateId }) {
  const node = document.getElementById("certificate-render-target")
 
  if (!node) {
    throw new Error("Certificate preview not found on the page.")
  }
 
  const canvas = await html2canvas(node, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#FAF6EF",
  })
 
  const imgData = canvas.toDataURL("image/png")
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  })
 
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight)
 
  const pdfBlob = pdf.output("blob")
 
  const fileName = `${certificateId}-${studentName.replace(/\s+/g, "_")}.pdf`

  const { error: uploadError } = await supabase.storage
    .from("certificates")
    .upload(fileName, pdfBlob, {
      contentType: "application/pdf",
      upsert: true,
    })
 
  if (uploadError) throw uploadError
 
  const { data } = supabase.storage.from("certificates").getPublicUrl(fileName)
 
  return data.publicUrl
}
 