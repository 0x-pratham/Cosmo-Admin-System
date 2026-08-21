import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom" // Keep this import for the Back button
import Certificate from "@/components/letter/Certificate"
import LoadingButton from "@/components/ui/LoadingButton"
import { domains } from "@/data/domains"
import { getNextCertificateId } from "@/utils/getNextCertificateId"
import { exportCertificatePdf } from "@/utils/exportCertificatePdf"
import { saveCertificateToSupabase } from "@/utils/saveCertificateToSupabase"

export default function CertificateDashboard() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    studentName: "Student Name",
    studentEmail: "",
    domainKey: "software_development",
    startDate: "", // Changed to empty to let the date picker be blank initially
    endDate: "",
  })

  const [certificateId, setCertificateId] = useState("")
  const [isIdEditable, setIsIdEditable] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState(null)

  const CERT_WIDTH = 1123
  const CERT_HEIGHT = 794
  const previewRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = previewRef.current
    if (!el) return

    const updateScale = () => {
      const availableWidth = el.clientWidth
      setScale(Math.min(availableWidth / CERT_WIDTH, 1))
    }

    updateScale()
    const observer = new ResizeObserver(updateScale)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const generateInitialId = async () => {
      try {
        const newId = await getNextCertificateId(formData.domainKey)
        setCertificateId(newId)
      } catch (error) {
        console.error("INITIAL CERT ID ERROR:", error)
      }
    }
    generateInitialId()
  }, [])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (field === "domainKey" && !isIdEditable) {
      getNextCertificateId(value)
        .then(setCertificateId)
        .catch((error) => console.error("DOMAIN CERT ID ERROR:", error))
    }
  }

  // Format date helper for the certificate preview (turns "YYYY-MM-DD" into "DD Month YYYY")
  const formatDateForPreview = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const handleExportPdf = async () => {
    try {
      setIsExporting(true)
      setExportError(null)

      if (!formData.studentEmail) {
        throw new Error("Student email is required to send the certificate.");
      }

      const selectedDomain = domains[formData.domainKey]
      
      // Use formatted dates for the actual PDF generation
      const formattedStartDate = formatDateForPreview(formData.startDate) || formData.startDate;
      const formattedEndDate = formatDateForPreview(formData.endDate) || formData.endDate;

      // 1. Generate & Upload PDF
      const pdfUrl = await exportCertificatePdf({
        studentName: formData.studentName,
        certificateId,
      })

      // 2. Save Data to Supabase Database
      await saveCertificateToSupabase({
        certificateId,
        studentName: formData.studentName,
        studentEmail: formData.studentEmail,
        domainKey: formData.domainKey,
        domainName: selectedDomain?.domainName ?? "",
        role: selectedDomain?.role ?? "",
        startDate: formattedStartDate, // Save formatted date
        endDate: formattedEndDate,     // Save formatted date
        pdfUrl,
      })

      // 3. Send Email to Candidate
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "certificate",
          studentName: formData.studentName,
          studentEmail: formData.studentEmail,
          domainName: selectedDomain?.domainName ?? "",
          role: selectedDomain?.role ?? "",
          startDate: formattedStartDate, // Send formatted date
          endDate: formattedEndDate,     // Send formatted date
          certificateId: certificateId,
          verificationLink: pdfUrl, 
        }),
      });

      const result = await emailResponse.json();
      if (!emailResponse.ok || !result.success) {
        throw new Error(result.message || "Certificate saved, but failed to send email.");
      }

      alert("Certificate Exported & Email Sent Successfully!");
    } catch (error) {
      console.error("CERTIFICATE EXPORT FAILED:", error)
      setExportError(error.message || "Failed to process certificate.")
    } finally {
      setIsExporting(false)
    }
  }

  const selectedDomain = domains[formData.domainKey]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200">
      <div className="max-w-[1600px] mx-auto grid grid-cols-[420px_1fr] gap-8 p-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-[28px] shadow-xl border border-slate-200/80 p-8 h-fit sticky top-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Completion Certificate</h2>
            <p className="text-sm text-slate-500 mt-1">
              Fill in the intern's details to generate a verified completion certificate.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Student Full Name</label>
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => handleChange("studentName", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Student Email</label>
              <input
                type="email"
                value={formData.studentEmail}
                onChange={(e) => handleChange("studentEmail", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                placeholder="e.g. john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Domain</label>
              <select
                value={formData.domainKey}
                onChange={(e) => handleChange("domainKey", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black bg-white"
              >
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
                <option value="unity_game_development">Unity Game Development</option>

              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                {/* Changed to type="date" for calendar picker */}
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                {/* Changed to type="date" for calendar picker */}
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 border border-slate-700 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Certificate No.</p>
                <button
                  type="button"
                  onClick={() => setIsIdEditable((prev) => !prev)}
                  className="text-[11px] font-semibold text-orange-400 hover:text-orange-300"
                >
                  {isIdEditable ? "Lock" : "Edit"}
                </button>
              </div>

              {isIdEditable ? (
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  className="mt-3 w-full bg-slate-800 text-white text-lg font-bold tracking-[0.1em] rounded-lg px-3 py-2 outline-none border border-slate-600 focus:border-orange-400"
                />
              ) : (
                <p className="mt-3 text-xl font-bold text-white tracking-[0.18em] break-all">
                  {certificateId}
                </p>
              )}
            </div>

            {exportError && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {exportError}
              </div>
            )}

            <LoadingButton loading={isExporting} onClick={handleExportPdf}>
              Generate & Send Certificate
            </LoadingButton>
          </div>
        </div>

        <div ref={previewRef} className="pb-20" style={{ width: "100%" }}>
          <div style={{ width: CERT_WIDTH * scale, height: CERT_HEIGHT * scale }}>
            <div
              style={{
                width: CERT_WIDTH,
                height: CERT_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <Certificate
                studentName={formData.studentName}
                domainName={selectedDomain?.domainName ?? ""}
                role={selectedDomain?.role ?? ""}
                startDate={formatDateForPreview(formData.startDate) || formData.startDate}
                endDate={formatDateForPreview(formData.endDate) || formData.endDate}
                certificateId={certificateId}
              />
            </div>
          </div>

          <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
            <div id="certificate-render-target" style={{ width: CERT_WIDTH, height: CERT_HEIGHT }}>
              <Certificate
                studentName={formData.studentName}
                domainName={selectedDomain?.domainName ?? ""}
                role={selectedDomain?.role ?? ""}
                startDate={formatDateForPreview(formData.startDate) || formData.startDate}
                endDate={formatDateForPreview(formData.endDate) || formData.endDate}
                certificateId={certificateId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}