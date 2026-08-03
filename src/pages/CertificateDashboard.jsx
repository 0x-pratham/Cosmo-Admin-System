import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Certificate from "@/components/letter/Certificate"
import LoadingButton from "@/components/ui/LoadingButton"
import { domains } from "@/data/domains"
import { getNextCertificateId } from "@/utils/getNextCertificateId"
import { exportCertificatePdf } from "@/utils/exportCertificatePdf"
import { saveCertificateToSupabase } from "@/utils/saveCertificateToSupabase"
import cosmolixLogo from "@/logo/cosmolix-logo.png"
import { FiAward } from "react-icons/fi"

export default function CertificateDashboard() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    domainKey: "software_development",
    startDate: "",
    endDate: "",
  })

  const [certificateId, setCertificateId] = useState("")
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState(null)

  const CERT_WIDTH = 1123
  const CERT_HEIGHT = 794
  const previewRef = useRef(null)
  const [scale, setScale] = useState(1)

  // Recalculate scale for the 2-column layout
  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    const updateScale = () => {
      const availableWidth = el.clientWidth
      // We scale it down so it fits perfectly in the right pane without overflow
      setScale(Math.min(availableWidth / CERT_WIDTH, 1))
    }
    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    getNextCertificateId(formData.domainKey).then(setCertificateId).catch(console.error)
  }, [])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === "domainKey") {
      getNextCertificateId(value).then(setCertificateId)
    }
  }

  const handleExportPdf = async () => {
    try {
      setIsExporting(true)
      setExportError(null)

      if (!formData.studentEmail || !formData.studentName) {
        throw new Error("Student Name and Email are required.");
      }

      const selectedDomain = domains[formData.domainKey]
      const pdfUrl = await exportCertificatePdf({ studentName: formData.studentName, certificateId })

      await saveCertificateToSupabase({
        certificateId,
        studentName: formData.studentName,
        studentEmail: formData.studentEmail,
        domainKey: formData.domainKey,
        domainName: selectedDomain?.domainName ?? "",
        role: selectedDomain?.role ?? "",
        startDate: formData.startDate,
        endDate: formData.endDate,
        pdfUrl,
      })

      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "certificate",
          studentName: formData.studentName,
          studentEmail: formData.studentEmail,
          domainName: selectedDomain?.domainName ?? "",
          role: selectedDomain?.role ?? "",
          startDate: formData.startDate,
          endDate: formData.endDate,
          certificateId: certificateId,
          verificationLink: pdfUrl, 
        }),
      });

      const result = await emailResponse.json();
      if (!emailResponse.ok || !result.success) throw new Error(result.message)

      alert("Certificate Exported & Email Sent Successfully!");
      window.location.reload()
    } catch (error) {
      setExportError(error.message || "Failed to process certificate.")
    } finally {
      setIsExporting(false)
    }
  }

  const selectedDomain = domains[formData.domainKey]

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-20">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-10 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={cosmolixLogo} alt="Cosmolix" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-[11px] font-bold text-[#D35C18] tracking-widest uppercase mb-1">Cosmolix HRMS</p>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Times New Roman, serif' }}>Certificate Generator</h1>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            &larr; Back to Hub
          </button>
        </div>
      </header>

      {/* 2-Column Grid Layout */}
      <main className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-10 px-10 pt-10">
        
        {/* Left Pane - Sticky Form */}
        <div className="flex flex-col gap-6 sticky top-32 h-fit">
          
          {/* Certificate ID Card */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex items-center justify-between">
             <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Credential No.</p>
                <p className="text-xl font-mono font-bold text-[#D35C18]">{certificateId || "..."}</p>
             </div>
             <div className="h-12 w-12 rounded-full bg-[#FFF2EB] flex items-center justify-center text-[#D35C18]">
                <FiAward size={24} />
             </div>
          </div>

          {/* Input Form */}
          <div className="bg-white p-8 rounded-[28px] border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 mb-6" style={{ fontFamily: 'Times New Roman, serif' }}>Intern Details</h2>
            
            <div className="space-y-5">
              <div>
                 <label className="block text-[13px] font-bold text-slate-700 uppercase tracking-wide mb-2">Student Full Name <span className="text-red-500">*</span></label>
                 <input type="text" value={formData.studentName} onChange={(e) => handleChange("studentName", e.target.value)} className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#D35C18] outline-none transition-all" placeholder="e.g. Prathamesh Bhil" />
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-slate-700 uppercase tracking-wide mb-2">Student Email <span className="text-red-500">*</span></label>
                 <input type="email" value={formData.studentEmail} onChange={(e) => handleChange("studentEmail", e.target.value)} className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#D35C18] outline-none transition-all" placeholder="e.g. prathamesh@example.com" />
              </div>

              <div>
                 <label className="block text-[13px] font-bold text-slate-700 uppercase tracking-wide mb-2">Domain <span className="text-red-500">*</span></label>
                 <select value={formData.domainKey} onChange={(e) => handleChange("domainKey", e.target.value)} className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#D35C18] outline-none transition-all">
                    <option value="software_development">Software Engineering</option>
                    <option value="uiux_design">UI/UX Design</option>
                    <option value="quality_assurance">Quality Assurance & Testing</option>
                    <option value="digital_marketing">Digital Marketing & Growth</option>
                    <option value="content_marketing">Content Strategy & Social Media</option>
                    <option value="business_development">Business Development</option>
                    <option value="hr_operations">Human Resources & Operations</option>
                    <option value="client_relations">Client Success & Customer Relations</option>
                    <option value="finance_accounts">Finance & Accounts</option>
                    <option value="project_coordination">Project Management Office</option>
                    <option value="game_marketing">Game Marketing</option>
                    <option value="fullstack">Full Stack Web Development</option>
                    <option value="ai_ml">Machine Learning & AI</option>
                    <option value="cybersecurity">Cybersecurity & Ethical Hacking</option>
                    <option value="mobileapp">Mobile App Development</option>
                    <option value="iot">Internet of Things (IoT)</option>
                    <option value="datascience">Data Science & Analytics</option>
                 </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-[13px] font-bold text-slate-700 uppercase tracking-wide mb-2">Start Date <span className="text-red-500">*</span></label>
                   <input type="text" value={formData.startDate} onChange={(e) => handleChange("startDate", e.target.value)} className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#D35C18] outline-none transition-all" placeholder="22 May 2026" />
                </div>
                <div>
                   <label className="block text-[13px] font-bold text-slate-700 uppercase tracking-wide mb-2">End Date <span className="text-red-500">*</span></label>
                   <input type="text" value={formData.endDate} onChange={(e) => handleChange("endDate", e.target.value)} className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:border-[#D35C18] outline-none transition-all" placeholder="22 Aug 2026" />
                </div>
              </div>
            </div>
            
            {/* Generate Button inside the form panel */}
            <div className="mt-8 pt-6 border-t border-slate-100">
               {exportError && <p className="text-xs text-red-500 font-bold mb-3 bg-red-50 px-3 py-2 rounded-lg border border-red-200">{exportError}</p>}
               <LoadingButton loading={isExporting} onClick={handleExportPdf}>
                 Generate & Send Certificate
               </LoadingButton>
            </div>
            
          </div>
        </div>

        {/* Right Pane - Live Preview */}
        <div className="flex flex-col h-full">
          <div className="mb-4 flex items-center justify-between px-2">
             <h2 className="text-lg font-bold text-slate-800">Live Preview</h2>
             <span className="text-xs font-bold text-[#15803D] bg-[#F0FDF4] px-3 py-1 rounded-full border border-[#DCFCE7]">Auto-Updating</span>
          </div>
          
          <div ref={previewRef} className="w-full bg-[#ECE8E3] rounded-[28px] border border-slate-200 shadow-inner flex items-center justify-center p-10 bg-[radial-gradient(#D6D0C4_1px,transparent_1px)]" style={{ backgroundSize: '20px 20px', minHeight: '700px' }}>
            
            <div style={{ width: CERT_WIDTH * scale, height: CERT_HEIGHT * scale }} className="shadow-2xl transition-transform duration-300">
              <div style={{ width: CERT_WIDTH, height: CERT_HEIGHT, transform: `scale(${scale})`, transformOrigin: "top left" }}>
                <Certificate
                  studentName={formData.studentName}
                  domainName={selectedDomain?.domainName ?? ""}
                  role={selectedDomain?.role ?? ""}
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  certificateId={certificateId}
                />
              </div>
            </div>

          </div>

          {/* Hidden Target for PDF generation */}
          <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
            <div id="certificate-render-target" style={{ width: CERT_WIDTH, height: CERT_HEIGHT }}>
              <Certificate studentName={formData.studentName} domainName={selectedDomain?.domainName ?? ""} role={selectedDomain?.role ?? ""} startDate={formData.startDate} endDate={formData.endDate} certificateId={certificateId} />
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}