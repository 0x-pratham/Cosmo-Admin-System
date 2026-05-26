import logo from "@/assets/logo/logo.png"
import VerificationQR from "@/components/ui/VerificationQR"
import { domains } from "@/data/domains"
import SignatureSection from "@/components/documents/shared/SignatureSection"
import VerificationSection from "@/components/documents/shared/VerificationSection"
import DocumentHeader from "@/components/documents/shared/DocumentHeader"
import DocumentFooter from "@/components/documents/shared/DocumentFooter"
import CandidateSection from "@/components/documents/shared/CandidateSection"
import SubjectSection from "@/components/documents/shared/SubjectSection"
import InternshipContent from "@/components/documents/shared/InternshipContent"
import TechnologiesSection from "@/components/documents/shared/TechnologiesSection"
import ActivitiesSection from "@/components/documents/shared/ActivitiesSection"

export default function OfferLetter({
  studentName = "Student Name",
  prn = "2023000000",
  college = "Student College Name",
  domainKey = "cybersecurity",
  startDate = "22 May 2026",
  endDate = "22 August 2026",
  mode = "Hybrid",
  offerId = "CPL/INT/2026/001",
}) {
  const domain = domains[domainKey] ?? domains.cybersecurity

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const colors = {
    navy: "#0f172a",
    slate: "#1e293b",
    textLight: "#64748b",
    border: "#e2e8f0",
    accent: "#b45309",
    watermark: "rgba(203, 213, 225, 0.25)",
    bgSlate: "#f8fafc"
  }

  const watermarkStyle = {
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' opacity='0.1'><text x='50%' y='50%' font-weight='bold' font-size='100' font-family='sans-serif' fill='%23cbd5e1' text-anchor='middle' transform='rotate(-24, 400, 500)'>COSMOLIX</text></svg>")`,
    backgroundRepeat: "repeat-y",
    backgroundPosition: "center top",
    backgroundSize: "794px 1123px",
  };

  return (
    <div className="bg-[#e8ecf2] min-h-screen flex justify-center py-10 px-4 print:bg-white print:py-0">
      <div
        id="offer-letter"
        className="relative bg-white w-[794px] min-h-[1123px] overflow-hidden shadow-2xl offer-letter-page"
        style={{ color: colors.slate, backgroundColor: "#ffffff" , ...watermarkStyle }}
      >
        {/* Top Gradient Bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(to right, #0f172a, #1e3a5f, #b45309)` }}
        />

        <div className="relative z-10 px-12 py-10">
          <DocumentHeader
  offerId={offerId}
  currentDate={currentDate}
/>
          <main className="mt-10">
            <CandidateSection
  studentName={studentName}
  prn={prn}
  college={college}
/>

          <SubjectSection
  title="Internship Offer Letter"
/>

            <InternshipContent
  studentName={studentName}
  domain={domain}
  startDate={startDate}
  endDate={endDate}
  mode={mode}
/>

      <TechnologiesSection
  technologies={domain.technologies}
/>

    <ActivitiesSection
  activities={domain.activities}
/>
          </main>

            {/* Full-width Verification QR Row */}
            <div className="mb-10 w-full">
              <VerificationQR offerId={offerId} />
              <SignatureSection />
            </div>

          <DocumentFooter />
        </div>
      </div>
    </div>
  )
}