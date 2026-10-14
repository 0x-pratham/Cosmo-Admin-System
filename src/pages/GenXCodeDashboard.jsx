import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import GenXCodeCertificate from "@/components/letter/GenXCodeCertificate"
import LoadingButton from "@/components/ui/LoadingButton"
import { getNextCertificateId } from "@/utils/getNextCertificateId"
import { exportCertificatePdf } from "@/utils/exportCertificatePdf"
import { saveCertificateToSupabase } from "@/utils/saveCertificateToSupabase"
import { genxcodeDomains } from "@/data/genxcodeDomains"

export default function GenXCodeDashboard() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    studentName: "Student Name",
    studentEmail: "",
    domainKey: "arcade_event",
    startDate: "",
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
    const element = previewRef.current
    if (!element) return

    const updateScale = () => {
      const availableWidth = element.clientWidth
      setScale(Math.min(availableWidth / CERT_WIDTH, 1))
    }

    updateScale()

    const observer = new ResizeObserver(updateScale)
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  // Generate the initial certificate ID.
  useEffect(() => {
    const generateInitialId = async () => {
      try {
        const newId = await getNextCertificateId(
          formData.domainKey,
          "GENX"
        )

        setCertificateId(newId)
      } catch (error) {
        console.error("INITIAL CERT ID ERROR:", error)
      }
    }

    generateInitialId()
  }, [])

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }))

    if (field === "domainKey" && !isIdEditable) {
      getNextCertificateId(value, "GENX")
        .then(setCertificateId)
        .catch((error) => {
          console.error("DOMAIN CERT ID ERROR:", error)
        })
    }
  }

  const formatDateForPreview = (dateString) => {
    if (!dateString) return ""

    const date = new Date(dateString)

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  // Selected GenXCode event.
  const selectedDomain = genxcodeDomains[formData.domainKey]

  const handleExportPdf = async () => {
    try {
      setIsExporting(true)
      setExportError(null)

      if (!formData.studentName.trim()) {
        throw new Error("Student name is required.")
      }

      if (!formData.studentEmail.trim()) {
        throw new Error("Student email is required.")
      }

      if (!certificateId.trim()) {
        throw new Error("Certificate ID is required.")
      }

      const formattedStartDate =
        formatDateForPreview(formData.startDate) ||
        formData.startDate

      const formattedEndDate =
        formatDateForPreview(formData.endDate) ||
        formData.endDate

      // Export the certificate PDF.
      const pdfUrl = await exportCertificatePdf({
        studentName: formData.studentName,
        certificateId,
        template: "genxcode",
      })

      // Save certificate details to Supabase.
      await saveCertificateToSupabase({
        certificateId,
        studentName: formData.studentName,
        studentEmail: formData.studentEmail,
        domainKey: formData.domainKey,
        domainName: selectedDomain?.domainName ?? "",
        role: selectedDomain?.role ?? "",
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        pdfUrl,
      })

      // Send the certificate email.
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "genxcode_certificate",
          studentName: formData.studentName,
          studentEmail: formData.studentEmail,
          domainName: selectedDomain?.domainName ?? "",
          role: selectedDomain?.role ?? "",
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          certificateId,
          verificationLink: pdfUrl,
        }),
      })

      const result = await emailResponse.json()

      if (!emailResponse.ok || !result.success) {
        throw new Error(
          result.message || "Saved, but failed to send email."
        )
      }

      // Confirm successful certificate export and email delivery.
      alert(
        "GenXCode Certificate Exported & Email Sent Successfully!"
      )

      // Generate a fresh certificate ID for the next student.
      const newId = await getNextCertificateId(
        formData.domainKey,
        "GENX"
      )

      setCertificateId(newId)

      // Clear student details while preserving the selected event and dates.
      setFormData((previous) => ({
        ...previous,
        studentName: "",
        studentEmail: "",
      }))
    } catch (error) {
      console.error("CERTIFICATE EXPORT ERROR:", error)

      setExportError(
        error instanceof Error
          ? error.message
          : "Failed to process certificate."
      )
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-8 p-4 md:p-8 lg:grid-cols-[420px_minmax(0,1fr)]">

        {/* Form Section */}
        <section className="h-fit rounded-[28px] border border-purple-100 bg-white/80 p-6 shadow-xl backdrop-blur-xl md:p-8 lg:sticky lg:top-8">
          <div className="mb-8">
            <h2
              className="text-2xl font-bold text-[#1b053e]"
              style={{
                fontFamily: '"Times New Roman", serif',
              }}
            >
              GenXCode Certificate
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Issue specialized GenXCode completion certificates.
            </p>
          </div>

          <div className="space-y-6">

            {/* Student Name */}
            <div>
              <label
                htmlFor="studentName"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Student Full Name
              </label>

              <input
                id="studentName"
                type="text"
                autoComplete="name"
                value={formData.studentName}
                onChange={(event) =>
                  handleChange("studentName", event.target.value)
                }
                disabled={isExporting}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#6828a2] disabled:opacity-60"
                placeholder="Enter student full name"
              />
            </div>

            {/* Student Email */}
            <div>
              <label
                htmlFor="studentEmail"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Student Email
              </label>

              <input
                id="studentEmail"
                type="email"
                autoComplete="email"
                value={formData.studentEmail}
                onChange={(event) =>
                  handleChange("studentEmail", event.target.value)
                }
                disabled={isExporting}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#6828a2] disabled:opacity-60"
                placeholder="student@example.com"
              />
            </div>

            {/* Event Track */}
            <div>
              <label
                htmlFor="domainKey"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Event Track
              </label>

              <select
                id="domainKey"
                value={formData.domainKey}
                onChange={(event) =>
                  handleChange("domainKey", event.target.value)
                }
                disabled={isExporting}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-[#6828a2] disabled:opacity-60"
              >
                <option value="arcade_event">
                  GenXCode Arcade
                </option>

                <option value="coding_challenge">
                  Rapid Coding Challenge
                </option>

                <option value="ui_hackathon">
                  UI/UX Design Sprint
                </option>
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="startDate"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Start Date
                </label>

                <input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(event) =>
                    handleChange("startDate", event.target.value)
                  }
                  disabled={isExporting}
                  className="w-full cursor-pointer rounded-xl border border-gray-300 px-3 py-3 outline-none focus:border-[#6828a2] disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  End Date
                </label>

                <input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(event) =>
                    handleChange("endDate", event.target.value)
                  }
                  disabled={isExporting}
                  className="w-full cursor-pointer rounded-xl border border-gray-300 px-3 py-3 outline-none focus:border-[#6828a2] disabled:opacity-60"
                />
              </div>
            </div>

            {/* Certificate ID */}
            <div className="rounded-3xl bg-gradient-to-br from-[#1b053e] to-[#3d126b] p-6 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.25em] text-[#c7a6f3]">
                  Certificate No.
                </p>

                <button
                  type="button"
                  disabled={isExporting}
                  onClick={() =>
                    setIsIdEditable((previous) => !previous)
                  }
                  className="text-[11px] font-semibold text-white hover:text-gray-200 disabled:opacity-60"
                >
                  {isIdEditable ? "Lock" : "Edit"}
                </button>
              </div>

              {isIdEditable ? (
                <input
                  type="text"
                  aria-label="Certificate ID"
                  value={certificateId}
                  onChange={(event) =>
                    setCertificateId(event.target.value)
                  }
                  disabled={isExporting}
                  className="mt-3 w-full rounded-lg border border-[#6828a2] bg-[#1b053e] px-3 py-2 text-lg font-bold tracking-[0.1em] text-white outline-none focus:border-[#c7a6f3] disabled:opacity-60"
                />
              ) : (
                <p className="mt-3 break-all text-xl font-bold tracking-[0.18em] text-white">
                  {certificateId || "Generating ID..."}
                </p>
              )}
            </div>

            {/* Export Error */}
            {exportError && (
              <div
                role="alert"
                className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {exportError}
              </div>
            )}

            {/* Generate Certificate */}
            <LoadingButton
              loading={isExporting}
              onClick={handleExportPdf}
            >
              Generate GenXCode Certificate
            </LoadingButton>
          </div>
        </section>

        {/* Certificate Preview */}
        <section
          ref={previewRef}
          className="min-w-0 overflow-hidden pb-20"
          style={{
            width: "100%",
            position: "relative",
          }}
        >
          {/* Visible Preview */}
          <div
            style={{
              width: CERT_WIDTH * scale,
              height: CERT_HEIGHT * scale,
              maxWidth: "100%",
            }}
          >
            <div
              style={{
                width: CERT_WIDTH,
                height: CERT_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              <GenXCodeCertificate
                studentName={formData.studentName}
                domainName={selectedDomain?.domainName ?? ""}
                role={selectedDomain?.role ?? ""}
                startDate={
                  formatDateForPreview(formData.startDate) ||
                  formData.startDate
                }
                endDate={
                  formatDateForPreview(formData.endDate) ||
                  formData.endDate
                }
                certificateId={certificateId}
              />
            </div>
          </div>

          {/* Hidden Full-Resolution PDF Render Target */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              top: 0,
              width: CERT_WIDTH,
              height: CERT_HEIGHT,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              id="certificate-render-target"
              style={{
                width: CERT_WIDTH,
                height: CERT_HEIGHT,
              }}
            >
              <GenXCodeCertificate
                studentName={formData.studentName}
                domainName={selectedDomain?.domainName ?? ""}
                role={selectedDomain?.role ?? ""}
                startDate={
                  formatDateForPreview(formData.startDate) ||
                  formData.startDate
                }
                endDate={
                  formatDateForPreview(formData.endDate) ||
                  formData.endDate
                }
                certificateId={certificateId}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}