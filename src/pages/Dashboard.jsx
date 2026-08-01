import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import OfferLetter from "@/components/letter/OfferLetter"
import LoadingButton from "@/components/ui/LoadingButton"
import { useAuth } from "@/context/AuthContext"
import { domains } from "@/data/domains"
import { exportOfferLetterPdf } from "@/utils/exportPdf"
import { saveOfferToSupabase } from "@/utils/saveOfferToSupabase"
import { getNextOfferId } from "@/utils/getNextOfferId"
import cosmolixLogo from "@/logo/cosmolix-logo.png"

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout, authDisabled } = useAuth()

  const [formData, setFormData] = useState({
    studentName: "Student Name",
    studentEmail: "",
    prn: "2023000000",
    college: "Student College Name",
    domainKey: "software_development",
    startDate: "2026-05-22",
    endDate: "2026-08-22",
    mode: "Hybrid",
  })

  const [offerId, setOfferId] = useState("")
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState(null)

  useEffect(() => {
    const generateInitialId = async () => {
      try {
        const newId = await getNextOfferId(formData.domainKey)
        setOfferId(newId)
      } catch (error) {
        console.error("INITIAL ID ERROR:", error)
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
      const updateOfferId = async () => {
        try {
          const newId = await getNextOfferId(value)
          setOfferId(newId)
        } catch (error) {
          console.error("DOMAIN ID ERROR:", error)
        }
      }

      updateOfferId()
    }
  }

  const handleExportPdf = async () => {
    try {
      setIsExporting(true)
      setExportError(null)

      const selectedDomain = domains[formData.domainKey]

      const pdfUrl = await exportOfferLetterPdf({
        studentName: formData.studentName,
        offerId,
      })

      await saveOfferToSupabase({
        offerId,
        studentName: formData.studentName,
        studentEmail: formData.studentEmail,
        prn: formData.prn,
        college: formData.college,
        domainKey: formData.domainKey,
        domainName: selectedDomain?.domainName ?? "",
        role: selectedDomain?.role ?? "",
        startDate: formData.startDate,
        endDate: formData.endDate,
        mode: formData.mode,
        pdfUrl,
      })

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
      })

      const contentType = response.headers.get("content-type")
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json()
        if (!result.success) throw new Error(result.message || "Server rejected request")
      } else {
        if (!response.ok) throw new Error(`Server Error: ${response.status}`)
      }

      alert("Offer Letter Exported & Email Sent Successfully")
      window.location.reload()
    } catch (error) {
      console.error("PROCESS FAILED:", error)
      setExportError(error.message || "Failed to export PDF or send email.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#F8F7F1",
        fontFamily: '"Google Sans Flex", sans-serif',
      }}
    >
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "#F8F7F1",
          borderColor: "#E7DED7",
        }}
      >
        <div className="max-w-[1700px] mx-auto px-10 py-6 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-5">
            <img
              src={cosmolixLogo}
              alt="Cosmolix"
              className="w-14 h-14 object-contain"
            />
            <div>
              <p
                className="uppercase tracking-[0.35em] text-xs font-semibold"
                style={{ color: "#D3600B" }}
              >
                COSMOLIX PRIVATE LIMITED
              </p>
              <h1
                style={{
                  fontFamily: "Times New Roman",
                  color: "#1C1816",
                }}
                className="text-4xl font-bold mt-1"
              >
                HR Administration Portal
              </h1>
              <p className="text-sm mt-2 max-w-xl" style={{ color: "#6F625B" }}>
                Internship Offer Letter Management System for secure document
                generation, verification and digital issuance.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {!authDisabled && (
              <button
                onClick={() => {
                  logout()
                  navigate("/login", { replace: true })
                }}
                className="px-6 py-3 rounded-2xl border font-medium transition"
                style={{
                  borderColor: "#D3600B",
                  color: "#D3600B",
                  background: "#FFF",
                }}
              >
                Logout
              </button>
            )}
            <LoadingButton
              loading={isExporting}
              onClick={handleExportPdf}
              fullWidth={false}
            >
              Generate PDF
            </LoadingButton>
          </div>
        </div>
      </header>

      <div
        className="max-w-[1750px] mx-auto grid grid-cols-[470px_1fr] gap-10 px-10 py-8"
        style={{
          height: "calc(100vh - 120px)",
        }}
      >
        <div
          className="rounded-[28px] border p-8 shadow-sm overflow-y-auto"
          style={{
            background: "#FFFFFF",
            borderColor: "#ECE4DD",
            height: "100%",
          }}
        >
          <div className="mb-8">
            <h2
              className="text-3xl font-bold"
              style={{
                color: "#1C1816",
                fontFamily: "Times New Roman",
              }}
            >
              Intern Information
            </h2>
            <p
              className="mt-3 leading-7"
              style={{
                color: "#6F625B",
              }}
            >
              Complete the candidate information below to generate an official
              internship offer letter issued by Cosmolix Private Limited.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#1C1816" }}
              >
                Candidate Full Name
              </label>
              <input
                type="text"
                value={formData.studentName}
                onChange={(e) => handleChange("studentName", e.target.value)}
                className="w-full rounded-2xl px-5 py-3.5 outline-none transition-all duration-300"
                style={{
                  border: "1px solid #E8DDD5",
                  background: "#FFFFFF",
                  color: "#1C1816",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#D3600B"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E8DDD5"
                }}
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#1C1816" }}
              >
                Official Email Address
              </label>
              <input
                type="email"
                value={formData.studentEmail}
                onChange={(e) => handleChange("studentEmail", e.target.value)}
                className="w-full rounded-2xl px-5 py-3.5 outline-none transition-all duration-300"
                style={{
                  border: "1px solid #E8DDD5",
                  background: "#FFFFFF",
                  color: "#1C1816",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#D3600B"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E8DDD5"
                }}
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#1C1816" }}
              >
                Student Registration Number
              </label>
              <input
                type="text"
                value={formData.prn}
                onChange={(e) => handleChange("prn", e.target.value)}
                className="w-full rounded-2xl px-5 py-3.5 outline-none transition-all duration-300"
                style={{
                  border: "1px solid #E8DDD5",
                  background: "#FFFFFF",
                  color: "#1C1816",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#D3600B"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E8DDD5"
                }}
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#1C1816" }}
              >
                Institution / University
              </label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => handleChange("college", e.target.value)}
                className="w-full rounded-2xl px-5 py-3.5 outline-none transition-all duration-300"
                style={{
                  border: "1px solid #E8DDD5",
                  background: "#FFFFFF",
                  color: "#1C1816",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#D3600B"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E8DDD5"
                }}
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#1C1816" }}
              >
                Internship Department
              </label>
              <select
                value={formData.domainKey}
                onChange={(e) => handleChange("domainKey", e.target.value)}
                className="w-full rounded-2xl px-5 py-3.5 outline-none transition-all"
                style={{
                  border: "1px solid #E8DDD5",
                  background: "#FFFFFF",
                  color: "#1C1816",
                }}
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
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-[15px] font-semibold mb-2 whitespace-nowrap"
                  style={{ color: "#1C1816" }}
                >
                  Internship Commencement
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  className="w-full rounded-2xl px-5 py-3.5 outline-none transition-all duration-300"
                  style={{
                    border: "1px solid #E8DDD5",
                    background: "#FFFFFF",
                    color: "#1C1816",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#D3600B"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#E8DDD5"
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-[15px] font-semibold mb-2 whitespace-nowrap"
                  style={{ color: "#1C1816" }}
                >
                  Internship Completion
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  className="w-full rounded-2xl px-5 py-3.5 outline-none transition-all duration-300"
                  style={{
                    border: "1px solid #E8DDD5",
                    background: "#FFFFFF",
                    color: "#1C1816",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#D3600B"
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#E8DDD5"
                  }}
                />
              </div>
            </div>

            <div
              className="rounded-[22px] p-6"
              style={{
                background: "#FCFAF8",
                border: "1px solid #E9DED7",
              }}
            >
              <p
                style={{
                  color: "#D3600B",
                }}
                className="uppercase tracking-[0.18em] text-xs font-bold"
              >
                Document Reference
              </p>
              <h3
                className="mt-3 text-2xl font-bold"
                style={{
                  color: "#1C1816",
                  fontFamily: "Times New Roman",
                }}
              >
                {offerId}
              </h3>
              <p
                className="mt-3 text-sm leading-6"
                style={{
                  color: "#7A7068",
                }}
              >
                This unique reference number is automatically assigned to every
                official internship offer letter issued by Cosmolix Private
                Limited.
              </p>
            </div>

            {exportError && (
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "#FFF4EE",
                  border: "1px solid #F3C9B4",
                  color: "#8C3B08",
                }}
              >
                {exportError}
              </div>
            )}

            <LoadingButton loading={isExporting} onClick={handleExportPdf}>
              Generate & Issue Offer Letter
            </LoadingButton>
          </div>
        </div>

        <div
          className="overflow-visible pr-3"
          style={{
            height: "100%",
            overflowY: "visible",
          }}
        >
          <div className="mb-8">
            <h2
              style={{
                fontFamily: "Times New Roman",
                color: "#1C1816",
              }}
              className="text-3xl font-bold"
            >
              Offer Letter Preview
            </h2>
            <p
              className="mt-2"
              style={{
                color: "#6F625B",
              }}
            >
              Review the generated internship offer letter before issuing the final
              official document.
            </p>
          </div>
          <div
            className="rounded-[28px] shadow-sm min-h-full"
            style={{
              background: "#FFFFFF",
              border: "1px solid #ECE4DD",
              overflow: "visible",
              padding: "0px",
            }}
          >
            <OfferLetter {...formData} offerId={offerId} />
          </div>
        </div>
      </div>
    </div>
  )
}