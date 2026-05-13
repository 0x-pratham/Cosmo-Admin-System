import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import OfferLetter from "@/components/letter/OfferLetter"
import LoadingButton from "@/components/ui/LoadingButton"
import { useAuth } from "@/context/AuthContext"
import { domains } from "@/data/domains"
import { exportOfferLetterPdf } from "@/utils/exportPdf"
import { saveOfferToSupabase } from "@/utils/saveOfferToSupabase"
import { getNextOfferId } from "@/utils/getNextOfferId"

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout, authDisabled } = useAuth()

  const [formData, setFormData] = useState({
    studentName: "Student Name",
    studentEmail: "",
    prn: "2023000000",
    college: "Student College Name",
    domainKey: "cybersecurity",
    startDate: "22 May 2026",
    endDate: "22 August 2026",
    mode: "Hybrid",
  })

  const [offerId, setOfferId] =
  useState("")

  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState(null)

  useEffect(() => {

  const generateInitialId = async () => {

    try {

      const newId =
        await getNextOfferId(
          formData.domainKey
        )

      setOfferId(newId)

    } catch (error) {

      console.error(
        "INITIAL ID ERROR:",
        error
      )
    }
  }

  generateInitialId()

}, [])

  const handleChange = (field, value) => {
    const updatedData = {
      ...formData,
      [field]: value,
    }

    setFormData(updatedData)

    if (field === "domainKey") {

  const updateOfferId =
    async () => {

      try {

        const newId =
          await getNextOfferId(value)

        setOfferId(newId)

      } catch (error) {

        console.error(
          "DOMAIN ID ERROR:",
          error
        )
      }
    }

  updateOfferId()
}
  }

  // Inside Dashboard.jsx
  const handleExportPdf = async () => {
    try {
      setIsExporting(true);
      setExportError(null);

      const selectedDomain = domains[formData.domainKey];

      // 1. Generate the PDF
      const pdfUrl =
  await exportOfferLetterPdf({
    studentName:
      formData.studentName,

    offerId,
  })


await saveOfferToSupabase({

  offerId,

  studentName:
    formData.studentName,

  studentEmail:
    formData.studentEmail,

  prn:
    formData.prn,

  college:
    formData.college,

  domainKey:
    formData.domainKey,

  domainName:
    selectedDomain?.domainName ?? "",

  role:
    selectedDomain?.role ?? "",

  startDate:
    formData.startDate,

  endDate:
    formData.endDate,

  mode:
    formData.mode,

  pdfUrl,
})

      

      // 2. Send Email
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          domainName: selectedDomain?.domainName ?? "",
          role: selectedDomain?.role ?? "",
          offerId,
          verificationLink: pdfUrl,
        }),
      });

      // Check if the response is actually JSON before parsing
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json();
        if (!result.success) throw new Error(result.message || "Server rejected request");
      } else {
        // If it's not JSON, check if the status was at least "OK"
        if (!response.ok) throw new Error(`Server Error: ${response.status}`);
      }

      alert("Offer Letter Exported & Email Sent Successfully");
    } catch (error) {
      console.error("PROCESS FAILED:", error);

      setExportError(error.message || "Failed to export PDF or send email.");
    } finally {
      setIsExporting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200">
      <div className="backdrop-blur-xl bg-slate-950/90 text-white px-8 py-5 border-b border-slate-800 shadow-2xl sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-6">
          <div className="space-y-1">
  <div className="flex items-center gap-2">
    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>

    <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400 font-semibold">
      Cosmolix HR Workspace
    </p>
  </div>

  <h1 className="text-3xl font-bold tracking-tight text-white">
    Internship Offer Letter Generator
  </h1>

  <p className="text-sm text-slate-400">
    Generate verified internship offer letters with secure QR validation.
  </p>
</div>

          <div className="flex items-center gap-3">
            {!authDisabled && (
              <button
                type="button"
                onClick={() => {
                  logout()
                  navigate("/login", { replace: true })
                }}
                className="text-sm font-medium text-slate-300 hover:text-white border border-slate-600 rounded-xl px-4 py-2 hover:bg-slate-800/80 transition-colors"
              >
                Sign out
              </button>
            )}
            <LoadingButton loading={isExporting} onClick={handleExportPdf} fullWidth={false}>
              Export PDF
            </LoadingButton>
            
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-[420px_1fr] gap-8 p-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-[28px] shadow-xl border border-slate-200/80 p-8 h-fit sticky top-28">
        <div className="mb-8">
  <h2 className="text-2xl font-bold text-slate-900">
    Candidate Details
  </h2>

  <p className="text-sm text-slate-500 mt-1">
    Fill in the intern information to generate a verified offer letter.
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
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">PRN / Student ID</label>
              <input
                type="text"
                value={formData.prn}
                onChange={(e) => handleChange("prn", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">College Name</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => handleChange("college", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Domain</label>
              <select
                value={formData.domainKey}
                onChange={(e) => handleChange("domainKey", e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black bg-white"
              >
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                <input
                  type="text"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                <input
                  type="text"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 border border-slate-700 shadow-lg">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Offer Letter ID</p>
              <p className="mt-3 text-xl font-bold text-white tracking-[0.18em] break-all">{offerId}</p>
            </div>

            {exportError && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {exportError}
              </div>
            )}

            <LoadingButton loading={isExporting} onClick={handleExportPdf}>
              Export Official PDF
            </LoadingButton>
          </div>
        </div>

        <div className="overflow-auto pb-20">
          <OfferLetter {...formData} offerId={offerId} />
        </div>
      </div>
    </div>
  )
}