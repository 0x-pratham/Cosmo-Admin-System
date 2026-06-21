import logo from "@/assets/logo/logo.jpg"
import stamp1 from "@/assets/stamps/stamp1.png"
import signature from "@/assets/signatures/signature.png"
import VerificationQR from "@/components/ui/VerificationQR"
import { domains } from "@/data/domains"

export default function OfferLetter({
  studentName = "Student Name",
  prn = "2023000000",
  college = "Student College Name",
  domainKey = "cybersecurity",
  startDate = "22 May 2026",
  endDate = "22 August 2026",
  offerId = "CPL/INT/2026/001",
}) {
  const domain = domains[domainKey] ?? domains.cybersecurity

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  // Safe Hexadecimal values strictly enforced to protect compilation pipelines
  const colors = {
    primary: "#1A1A1A",      // Dark Charcoal from Logo
    accent: "#D96B27",       // Deep Cosmic Orange from Logo
    accentLight: "#E08E45",  // Soft Amber from Logo Gradient
    textMain: "#2D3748",     // Deep professional grey for body text
    textMuted: "#718096",    // Slate grey for captions/metadata
    border: "#E2E8F0",       // Subtle divider line color
    bgCard: "#ffffff",       // Plain white backdrop
    bgPanel: "#F8FAFC",      // Off-white panel color
    textSlate: "#334155",    // Pure gray for lists
  }

  return (
    <div style={{ backgroundColor: "#e8ecf2" }} className="min-h-screen flex justify-center py-10 px-4 print:bg-white print:py-0">
      <div
        id="offer-letter"
        className="relative w-[794px] min-h-[1123px] overflow-hidden offer-letter-page"
        style={{ 
          color: colors.textMain, 
          fontFamily: "'Inter', sans-serif", 
          backgroundColor: colors.bgCard,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" // Raw fallback safe shadow configuration
        }}
      >
        {/* Formal Corporate Letterhead Header Rule */}
        <div
          className="h-2 w-full"
          style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.accent}, ${colors.accentLight})` }}
        />

        <div className="px-14 py-12">
          {/* Header Section */}
          <header className="flex items-center justify-between border-b pb-6 no-break" style={{ borderColor: colors.border }}>
            <div className="flex items-center gap-4">
              <img
                src={logo}
                alt="Cosmolix Logo"
                style={{ width: "60px", height: "60px", objectFit: "contain" }}
              />
              <div>
                <h1 className="text-[24px] font-extrabold tracking-tight uppercase" style={{ color: colors.primary }}>
                  Cosmolix <span style={{ color: colors.accent }}>Private Limited</span>
                </h1>
                <p className="text-[11px] font-mono tracking-wider font-semibold mt-0.5" style={{ color: colors.textMuted }}>
                  CIN: U62099PN2026PTC252282
                </p>
              </div>
            </div>

            {/* Document Identification Meta */}
            <div className="text-right text-[11px] space-y-1.5 font-medium" style={{ color: colors.textMain }}>
              <p><span style={{ color: colors.textMuted }}>Document Ref:</span> <span className="font-mono font-bold">{offerId}</span></p>
              <p><span style={{ color: colors.textMuted }}>Date of Issue:</span> {currentDate}</p>
            </div>
          </header>

          {/* Recipient Details Block */}
          <main className="mt-8">
            <section className="no-break border-l-4 p-5 rounded-r-xl" style={{ borderColor: colors.primary, backgroundColor: colors.bgPanel }}>
              <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: colors.accent }}>
                Appointee Profile
              </p>
              <h2 className="text-[20px] font-bold" style={{ color: colors.primary }}>{studentName}</h2>
            </section>

            {/* Formal Concise Subject */}
            <section className="mt-8 no-break">
              <h3 className="text-[15px] font-bold uppercase tracking-wide border-b pb-2" style={{ color: colors.primary, borderColor: colors.border }}>
                Subject: Internship Offer Letter
              </h3>
            </section>

            {/* Formal Body Paragraphs */}
            <div className="mt-6 text-[13.5px] leading-[1.8] space-y-4 text-justify" style={{ color: colors.textMain }}>
              <p>Dear {studentName},</p>
              
              <p>
                Following your formal execution of our technical evaluation, we are pleased to extend this offer of internship with <strong>Cosmolix Private Limited</strong>. Upon confirmation of acceptance, you shall assume the operational responsibilities of <strong style={{ color: colors.accent }}>{domain.role}</strong>, operating within the architecture of our <strong>{domain.domainName}</strong> team.
              </p>
              
              <p>
                Your professional tenure is scheduled to commence on <strong>{startDate}</strong> and terminate automatically on <strong>{endDate}</strong> unless modified or renewed in writing by authorized personnel. This engagement requires systematic sprint management, execution of assignments, and strict alignment with organizational delivery deadlines.
              </p>
              
              <p>
                As a designated member of our technical division, you will be expected to protect corporate intellectual property, maintain confidentiality regarding proprietary codebases, and maintain a high standard of professional code hygiene and documentation.
              </p>
            </div>

            {/* Structured Responsibilities Specifications */}
            <section className="mt-6 space-y-4 no-break">
              <div className="border p-5 rounded-xl" style={{ borderColor: colors.border, backgroundColor: colors.bgCard }}>
                <h4 className="text-[12px] font-bold uppercase tracking-wider mb-3.5" style={{ color: colors.primary }}>
                  Core Responsibilities & Deliverables
                </h4>
                <ul className="text-[12.5px] space-y-2.5 list-none pl-0" style={{ color: colors.textSlate }}>
                  {domain.activities.map((activity, index) => (
                    <li key={index} className="flex items-start gap-2.5 leading-relaxed font-medium">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colors.accent }} />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Balanced Professional Compliance & Termination Clause */}
              <div className="border p-5 rounded-xl" style={{ borderColor: colors.border, backgroundColor: colors.bgPanel }}>
                <h4 className="text-[12px] font-bold uppercase tracking-wider mb-2" style={{ color: colors.primary }}>
                  1. Terms of Engagement & Professional Conduct
                </h4>
                <p className="text-[12.5px] leading-relaxed text-justify font-medium" style={{ color: colors.textSlate }}>
                  This engagement is subject to compliance with organizational regulations, operational protocols, and data protection rules. Cosmolix Private Limited reserves the absolute right to revoke this offer or terminate the internship immediately, without prior notification, in the event of any verified breach of confidentiality, non-compliance with project guidelines, or behavior inconsistent with standard corporate code of conduct.
                </p>
              </div>
              <div className="border p-5 rounded-xl" style={{ borderColor: colors.border, backgroundColor: colors.bgCard }}>
                <h4 className="text-[12px] font-bold uppercase tracking-wider mb-2" style={{ color: colors.primary }}>
                  2. Intellectual Property Rights & Non-Disclosure (NDA)
                </h4>
                <p className="text-[12px] leading-relaxed text-justify font-medium" style={{ color: colors.textSlate }}>
                  All software code, designs, documentation, strategies, algorithms, or internal cloud configurations developed, refined, or interacted with during your tenure remain the exclusive intellectual property of Cosmolix Private Limited. You are prohibited from staging, replicating, or leaking company source codes to third parties or open public networks. Unauthorized code sharing or preservation after termination is subject to formal legal proceedings under applicable cybersecurity and corporate safety provisions.
                </p>
              </div>

              {/* Execution Metrics Frame */}
              <div className="border p-5 rounded-xl" style={{ borderColor: colors.border, backgroundColor: colors.bgPanel }}>
                <h4 className="text-[12px] font-bold uppercase tracking-wider mb-2" style={{ color: colors.primary }}>
                  3. Sprint Commitments & Performance Evaluation
                </h4>
                <p className="text-[12px] leading-relaxed text-justify font-medium" style={{ color: colors.textSlate }}>
                  Appointees are expected to actively participate in all scheduled technical synchronization meets, architecture updates, and deliver code components on target timeline tracks. Performance assessments will occur dynamically throughout the internship timeframe. Final corporate certification, evaluation scoring records, and recommendation validations are issued exclusively upon successful verification of complete code submission, system hygiene tests, and project clearance reviews.
                </p>
              </div>

              {/* Candidate Sign-off Box */}
              <div className="border p-5 rounded-xl" style={{ borderColor: colors.border, backgroundColor: colors.bgCard }}>
                <h4 className="text-[12px] font-bold uppercase tracking-wider mb-1.5" style={{ color: colors.accent }}>
                  4. Candidate Declaration of Acceptance
                </h4>
                <p className="text-[11.5px] leading-relaxed text-slate-800 text-justify">
                  I have read, understood, and hereby accept the position framework, functional parameters, performance requirements, and data privacy bindings declared across this document. I commit to maintaining complete corporate decorum and operational discipline throughout my engagement path with the organization.
                </p>
                <div className="mt-5 flex justify-between items-center text-[12px] pt-4 border-t border-dashed" style={{ borderColor: colors.border }}>
                  <p><span style={{ color: colors.textMuted }}>Candidate Signature:</span> ___________________</p>
                  <p><span style={{ color: colors.textMuted }}>Date of Acceptance:</span> ____ / ____ / 2026</p>
                </div>
              </div>
            </section>
          </main>

          {/* Streamlined, Minimal Document Verification Row */}
          <div className="mt-5 no-break border-t pt-6" style={{ borderColor: colors.border }}>
          <VerificationQR offerId={offerId} />

            {/* Signatures & Execution Section */}
            <div className="mt-8 flex items-end justify-between gap-10">
              <div className="text-center sm:text-left">
                <img src={stamp1} alt="Official Seal" className="max-h-24 w-auto mix-blend-multiply opacity-95" />
                <p className="text-[10px] uppercase tracking-wider font-bold mt-2" style={{ color: colors.textMuted }}>
                  Corporate Seal Affixed
                </p>
              </div>

              <div className="text-right">
                <img src={signature} alt="Authorized Signatory" className="w-36 ml-auto mix-blend-multiply" />
                <div className="mt-1 border-t w-56 pt-2 ml-auto" style={{ borderColor: colors.primary }}>
                  <p className="font-bold text-[14px]" style={{ color: colors.primary }}>Prathamesh Bhil</p>
                  <p className="text-[12px] font-medium" style={{ color: colors.textMuted }}>Chief Executive Officer</p>
                  <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: colors.accent }}>Cosmolix Private Limited</p>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Corporate Footer */}
          <footer className="mt-10 flex items-center justify-between border-t pt-4 text-[11px]" style={{ borderColor: colors.border, color: colors.textMuted }}>
            <span>© {new Date().getFullYear()} Cosmolix Private Limited.</span>
            <span className="font-medium tracking-wide uppercase text-[10px]">Registered Office Location: Ambethan , Khed , Pune-410501 Maharashtra</span>
          </footer>
        </div>
      </div>
    </div>
  )
}