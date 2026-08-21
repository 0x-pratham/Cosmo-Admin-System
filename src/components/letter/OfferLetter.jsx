import logo from "@/logo/cosmolix-logo.png"
import stamp1 from "@/assets/stamps/stamp1.svg"
import signature from "@/assets/signatures/signature1.png"
import VerificationQR from "@/components/ui/VerificationQR"
import { domains } from "@/data/domains"

export default function OfferLetter({
  studentName = "Student Name",
  prn = "",
  college = "",
  domainKey = "cybersecurity",
  startDate = "22 May 2026",
  endDate = "22 August 2026",
  offerId = "CPL/INT/2026/001",
  dateOfIssue, // Added Date of Issue Prop
}) {
  const domain = domains[domainKey] ?? domains.cybersecurity

  // Use the selected date or current date if none provided
  const now = dateOfIssue ? new Date(dateOfIssue) : new Date()
  const year = now.getFullYear()
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const month = months[now.getMonth()]
  const day = String(now.getDate()).padStart(2, "0")
  const currentDate = `${year} - ${month} - ${day}`

  const colors = {
    primary: "#1C1816",
    secondary: "#D3600B",
    background: "#F8F7F1",
    white: "#FFFFFF",
    border: "#CCCCCC",
    text: "#222222",
    muted: "#555555",
  }

  return (
    <div
      className="flex justify-center py-6 px-4 print:p-0"
      style={{
        background: colors.background,
        overflow: "visible",
      }}
    >
      <div
        id="offer-letter"
        className="bg-white antialiased"
        style={{
          width: "210mm",
          height: "297mm",
          maxHeight: "297mm",
          padding: "16mm 18mm",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          overflow: "hidden",
          transform: "none",
          fontFamily: '"Times New Roman", Times, serif',
          color: "#222222",
          fontSize: "11.5pt",
          lineHeight: "1.55",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {/* Header - Logo Left, Details Right */}
          <header
            className="pb-4 border-b"
            style={{ borderColor: colors.border }}
          >
            <div className="flex justify-between items-start">
              {/* Left: Logo & Company Info */}
              <div className="flex items-start gap-4">
                <img
                  src={logo}
                  alt="Cosmolix"
                  className="w-16 h-16 object-contain mt-1"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
                <div>
                  <h1
                    className="text-[21px] font-bold uppercase tracking-wide m-0"
                    style={{ color: colors.primary }}
                  >
                    COSMOLIX PRIVATE LIMITED
                  </h1>
                  <p className="text-[10pt] m-0.5" style={{ color: colors.muted }}>
                    CIN : U62099PN2026PTC252282
                  </p>
                  <p className="text-[10.5pt] font-semibold m-0" style={{ color: colors.secondary }}>
                    ISO/IEC 27001:2022 Certified | MSME Registered
                  </p>
                </div>
              </div>

              {/* Right: Reference & Date */}
              <div className="text-right text-[11pt] font-semibold leading-5">
                <div>
                  <span style={{ color: colors.muted }}>Reference No : </span>
                  <span className="font-normal">{offerId}</span>
                </div>
                <div className="mt-1">
                  <span style={{ color: colors.muted }}>Date : </span>
                  <span className="font-normal">{currentDate}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Title Section */}
          <div className="text-center my-4">
            <h2
              className="text-[19pt] uppercase font-bold tracking-wide m-0"
              style={{ color: colors.primary }}
            >
              Internship Offer Letter
            </h2>
          </div>

          {/* Recipient Details */}
          <div className="my-3 text-[11.5pt]">
            <p className="font-bold m-0">To,</p>
            <p className="mt-0.5 font-semibold m-0">{studentName}</p>
          </div>

          {/* Subject */}
          <div className="my-3 font-bold text-[11.5pt]">
            <span>Subject: </span>
            <span>Internship Appointment</span>
          </div>

          {/* Salutation & Body Content */}
          <div className="space-y-3 text-[11.5pt]">
            <p className="m-0">Dear Candidate,</p>
            <p className="m-0">
              We are pleased to offer you the position of <strong>{domain.role}</strong> at <strong>Cosmolix Private Limited</strong>. You will be associated with our <strong>{domain.domainName}</strong> department from <strong>{startDate}</strong> to <strong>{endDate}</strong>.
            </p>
            <p className="m-0">
              During your internship, you are expected to maintain professional conduct, protect confidential information, follow organizational policies and complete assigned responsibilities under the guidance of your reporting mentor.
            </p>
          </div>

          {/* Key Responsibilities Section */}
          <div className="my-4 text-[11.5pt]">
            <p className="font-bold mb-2">Key Responsibilities:</p>
            <ul className="list-disc pl-5 space-y-1">
              {domain.activities.slice(0, 4).map((activity, index) => (
                <li key={index} className="text-[11pt]">{activity}</li>
              ))}
            </ul>
          </div>

          {/* Closing Statement */}
          <div className="my-3 text-[11pt] space-y-2">
            <p className="m-0">
              This internship offer is effective upon your acceptance and compliance with the onboarding instructions communicated by the Human Resources Department. By accepting this offer, you agree to adhere to professional standards, confidentiality requirements and company policies.
            </p>

            <p className="m-0">
              We congratulate you on your selection and look forward to welcoming you to the Cosmolix team with a rewarding learning experience.
            </p>
          </div>
        </div>

        {/* Bottom Stack: Signatures, Verification Note & Footer */}
        <div>
          {/* Signatures & Verification Section */}
          <div className="pt-3 border-t" style={{ borderColor: colors.border }}>
            <div className="flex justify-between items-end">
              {/* Company Seal - Size Further Increased */}
              <div className="text-center flex flex-col items-center">
                <img 
                  src={stamp1} 
                  alt="Official Seal" 
                  className="h-24 w-24 object-contain mix-blend-multiply opacity-95 mb-1" 
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
                <p className="text-[9pt] uppercase font-bold leading-tight" style={{ color: colors.muted }}>
                  OFFICIAL<br />SEAL
                </p>
              </div>
              
              {/* QR Code */}
              <div className="flex justify-center">
                <VerificationQR offerId={offerId} size={60} />
              </div>

              {/* Authorized Signatory */}
              <div className="text-right">
                <img 
                  src={signature} 
                  alt="Authorized Signatory" 
                  className="w-28 object-contain ml-auto mix-blend-multiply -mb-1" 
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
                <div className="border-t pt-1 w-44 ml-auto" style={{ borderColor: colors.primary }}>
                  <p className="font-bold text-[11pt] m-0">Ms. Pranali Sonar</p>
                  <p className="text-[10pt] m-0" style={{ color: colors.muted }}>HR</p>
                  <p className="text-[9.5pt] font-semibold uppercase m-0" style={{ color: colors.secondary }}>Cosmolix Private Limited</p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Note */}
          <p
            className="mt-3 text-center text-[9pt] italic"
            style={{ color: colors.muted }}
          >
            This document is electronically generated by Cosmolix Private Limited and is valid when verified using the attached QR Code.
          </p>

          {/* Footer */}
          <footer className="mt-3 pt-2 border-t text-center text-[9.5pt]" style={{ borderColor: colors.border, color: colors.muted }}>
            <p className="m-0">ISO/IEC 27001:2022 Certified | MSME Registered Enterprise</p>
            <p className="m-0">www.cosmolix.co.in | info@cosmolix.co.in | Registered Office Location: Ambethan, Khed, Pune-410501 Maharashtra</p>
          </footer>
        </div>
      </div>
    </div>
  )
}