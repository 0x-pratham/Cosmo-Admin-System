import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import OfferLetter from "@/components/letter/OfferLetter"

import LoadingButton from "@/components/ui/LoadingButton"
import { useAuth } from "@/context/AuthContext"

import { domains } from "@/data/domains"
import { exportOfferLetterPdf } from "@/utils/exportPdf"
import { generateOfferLetterId } from "@/utils/generateId"
import { saveOfferRecord } from "@/utils/offerRegistry"

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout, authDisabled } = useAuth()

  // MAIN FORM STATE
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

  // OFFER ID STATE
  const [offerId, setOfferId] = useState(
    generateOfferLetterId({
      domainKey: "cybersecurity",
      serialNumber: 1,
    })
  )

  // EXPORT LOADING STATE
  const [isExporting, setIsExporting] = useState(false)

  const [exportError, setExportError] = useState(null)

  useEffect(() => {
    saveOfferRecord(offerId, {
      studentName: formData.studentName,
      prn: formData.prn,
      college: formData.college,
      domainKey: formData.domainKey,
      domainName: domains[formData.domainKey]?.domainName ?? "",
      startDate: formData.startDate,
      endDate: formData.endDate,
      mode: formData.mode,
    })
  }, [offerId, formData])

  // HANDLE INPUT CHANGE
  const handleChange = (field, value) => {
    const updatedData = {
      ...formData,
      [field]: value,
    }

    setFormData(updatedData)

    // AUTO UPDATE OFFER ID WHEN DOMAIN CHANGES
    if (field === "domainKey") {
      const newId = generateOfferLetterId({
        domainKey: value,
        serialNumber: 1,
      })

      setOfferId(newId)
    }
  }

  // EXPORT PDF
  // EXPORT PDF + SEND EMAIL
const handleExportPdf = async () => {

  try {

    setIsExporting(true)

    setExportError(null)

    // EXPORT PDF
    await exportOfferLetterPdf({
      studentName: formData.studentName,
      offerId,
    })

    // SELECT DOMAIN DETAILS
    const selectedDomain =
      domains[formData.domainKey]

    // SEND EMAIL
    const response = await fetch("/api/send-email", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        studentName: formData.studentName,

        studentEmail: formData.studentEmail,

        prn: formData.prn,

        college: formData.college,

        domainName:
          selectedDomain?.domainName ?? "",

        role:
          selectedDomain?.role ?? "",

        startDate: formData.startDate,

        endDate: formData.endDate,

        mode: formData.mode,

        offerId,

        verificationLink:
          `https://cosmolix.co.in/verify/${offerId}`,

      }),
    })

    const result = await response.json()

    if (!result.success) {

      throw new Error(
        result.message ||
        "Failed to send email"
      )
    }

    alert(
      "Offer Letter PDF Exported & Email Sent Successfully"
    )

  } catch (error) {

    console.error(
      "PROCESS FAILED:",
      error
    )

    setExportError(
      error.message ||
      "Failed to export PDF or send email."
    )

  } finally {

    setIsExporting(false)

  }
}

  return (
    <div className="min-h-screen bg-[#e8ecf2]">
      {/* TOP HEADER */}
      <div className="bg-[#0f172a] text-white px-8 py-5 shadow-lg border-b border-slate-800/80">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400 font-semibold">
              Internal tooling
            </p>

            <h1 className="text-2xl font-bold tracking-tight mt-1">
              Offer letter generator
            </h1>

            <p className="text-slate-400 text-sm mt-1">
              Cosmolix internship documentation & verification
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            {exportError ? (
              <p className="text-xs text-red-400 max-w-xs text-right">
                {exportError}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center justify-end gap-2">
              {!authDisabled ? (
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
              ) : null}

              <LoadingButton
                loading={isExporting}
                onClick={handleExportPdf}
                fullWidth={false}
              >
                Export PDF
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-[420px_1fr] gap-8 p-8">
        {/* LEFT PANEL */}
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/90 p-8 h-fit sticky top-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Candidate & program details
            </h2>

            <p className="text-slate-500 mt-2 text-sm leading-relaxed">
              Updates sync to the preview and verification record for this
              browser session.
            </p>
          </div>

          {/* FORM */}
          <div className="mt-10 space-y-6">
            {/* STUDENT NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Student Full Name
              </label>

              <input
                type="text"
                value={formData.studentName}
                onChange={(e) =>
                  handleChange("studentName", e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* STUDENT EMAIL */}
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    Student Email Address
  </label>

  <input
    type="email"
    value={formData.studentEmail}
    onChange={(e) =>
      handleChange("studentEmail", e.target.value)
    }
    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
    placeholder="student@example.com"
  />
</div>

            {/* PRN */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                PRN / Student ID
              </label>

              <input
                type="text"
                value={formData.prn}
                onChange={(e) =>
                  handleChange("prn", e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* COLLEGE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                College Name
              </label>

              <input
                type="text"
                value={formData.college}
                onChange={(e) =>
                  handleChange("college", e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* DOMAIN */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Internship Domain
              </label>

              <select
                value={formData.domainKey}
                onChange={(e) =>
                  handleChange("domainKey", e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black bg-white"
              >
                <option value="fullstack">
                  Full Stack Web Development
                </option>

                <option value="ai_ml">
                  Machine Learning & Artificial Intelligence
                </option>

                <option value="cybersecurity">
                  Cybersecurity & Ethical Hacking
                </option>

                <option value="mobileapp">
                  Mobile App Development
                </option>

                <option value="iot">
                  Internet of Things (IoT)
                </option>

                <option value="datascience">
                  Data Science & Analytics
                </option>
              </select>
            </div>

            {/* START DATE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Internship Start Date
              </label>

              <input
                type="text"
                value={formData.startDate}
                onChange={(e) =>
                  handleChange("startDate", e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* END DATE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Internship End Date
              </label>

              <input
                type="text"
                value={formData.endDate}
                onChange={(e) =>
                  handleChange("endDate", e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* MODE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Internship Mode
              </label>

              <select
                value={formData.mode}
                onChange={(e) =>
                  handleChange("mode", e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black bg-white"
              >
                <option value="Hybrid">
                  Hybrid
                </option>

                <option value="Online">
                  Online
                </option>
              </select>
            </div>

            {/* OFFER ID */}
            <div className="bg-gray-100 rounded-2xl p-5 border border-gray-200">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Generated Offer Letter ID
              </p>

              <p className="mt-2 text-lg font-bold text-black tracking-wide">
                {offerId}
              </p>
            </div>

            {exportError ? (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {exportError}
              </p>
            ) : null}

            {/* EXPORT BUTTON */}
            <LoadingButton
              loading={isExporting}
              onClick={handleExportPdf}
            >
              Export Official PDF
            </LoadingButton>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="overflow-auto">
          <OfferLetter
            studentName={formData.studentName}
            prn={formData.prn}
            college={formData.college}
            domainKey={formData.domainKey}
            startDate={formData.startDate}
            endDate={formData.endDate}
            mode={formData.mode}
            offerId={offerId}
          />
        </div>
      </div>
    </div>
  )
}