import logo from "@/assets/logo/logo.png"
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
          <header className="flex items-start justify-between gap-8 border-b pb-8 no-break" style={{ borderColor: "#e2e8f0" }}>
            <div className="flex items-center gap-5 min-w-0">
              {/* Logo Container - Enforced Square Dimensions */}
              <div
                className="shrink-0 rounded-2xl border shadow-sm"
                style={{
                  borderColor: "#e2e8f0",
                  backgroundColor: "#ffffff",
                  width: "90px",
                  height: "90px",
                  display: "table-cell", // Table-cell is often more stable for PDF engine centering
                  verticalAlign: "middle",
                  textAlign: "center"
                }}
              >
                <img
                  src={logo}
                  alt="Cosmolix"
                  style={{ width: "90px", height: "70px", objectFit: "contain", display: "inline-block", marginTop: "10px" }}
                />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.35em] font-semibold" style={{ color: "#64748b" }}>
                  Offer of internship
                </p>

                <h1 className="text-[28px] font-bold tracking-tight leading-tight mt-1" style={{ color: "#0f172a" }}>
                  Cosmolix Private Limited
                </h1>

                <p className="text-[13px] mt-2 leading-snug max-w-md" style={{ color: "#475569" }}>
                  Industry-oriented internship & research program · Structured
                  mentorship & evaluation
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              {/* Reference Box - Simplified Flat Structure to prevent content loss */}
              <div
                className="rounded-2xl border shadow-sm text-left"
                style={{
                  borderColor: "#e2e8f0",
                  backgroundColor: "#f8fafc",
                  width: "220px",
                  overflow: "hidden"
                }}
              >
                {/* Top Section */}
                <div style={{ padding: "16px 20px" }}>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#64748b", margin: "0 0 4px 0" }}>
                    Reference
                  </p>
                  <p className="font-mono text-[14px] font-bold tracking-wide" style={{ color: "#0f172a", margin: "0" }}>
                    {offerId}
                  </p>

                  <div style={{ height: "1px", backgroundColor: "#e2e8f0", margin: "16px 0" }} />

                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#64748b", margin: "0 0 4px 0" }}>
                    Date of issue
                  </p>
                  <p className="text-[14px] font-semibold" style={{ color: "#0f172a", margin: "0" }}>
                    {currentDate}
                  </p>
                </div>

                {/* Bottom Badge - Solid block instead of flex badge for capture safety */}
                <div
                  style={{
                    backgroundColor: "#0f172a",
                    color: "#ffffff",
                    paddingBottom: "10px",
                    textAlign: "center"
                  }}
                >
                  <p className="text-[9px] uppercase font-bold tracking-widest" style={{ margin: "0" }}>
                    ● &nbsp; Official document
                  </p>
                </div>
              </div>
            </div>
          </header>


          <main className="mt-10">
            <section className="no-break">
              <p className="text-[12px] font-bold uppercase tracking-widest" style={{ color: colors.textLight }}>To</p>
              <div className="mt-4 space-y-1.5">
                <p className="text-[19px] font-bold tracking-tight" style={{ color: colors.navy }}>{studentName}</p>
                <p className="text-[14px]" style={{ color: colors.textLight }}>
                  PRN / Student ID: <span className="font-medium" style={{ color: colors.slate }}>{prn}</span>
                </p>
                <p className="text-[14px] leading-relaxed max-w-lg" style={{ color: colors.textLight }}>{college}</p>
              </div>
            </section>

            <section className="mt-10 no-break">
              <div className="inline-flex items-center border-l-4 pl-4 py-1" style={{ borderColor: colors.accent }}>
                <h2 className="text-[18px] font-bold tracking-tight" style={{ color: colors.navy }}>
                  Subject: Internship offer letter
                </h2>
              </div>
            </section>

            <div className="mt-8 text-[14px] leading-[1.75] space-y-5" style={{ color: "#334155" }}>
              <p>Dear <span className="font-semibold" style={{ color: colors.navy }}>{studentName}</span>,</p>
              <p>
                We are pleased to offer you a place on the internship program at{" "}
                <span className="font-semibold" style={{ color: colors.navy }}>Cosmolix Private Limited</span> as a{" "}
                <span className="font-semibold" style={{ color: colors.navy }}>{domain.role}</span> in{" "}
                <span className="font-semibold" style={{ color: colors.navy }}>{domain.domainName}</span>.
              </p>
              <p>
                Your engagement is expected to begin on <b>{startDate}</b> and conclude on <b>{endDate}</b>. Delivery will be in <b>{mode}</b> mode, with guided mentorship, project work, and structured professional development.
              </p>
              <p>{domain.overview}</p>
            </div>

            <section className="mt-12 no-break">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: colors.textLight }}>Technologies & tools</h3>
              <div className="flex flex-wrap gap-2">
                {domain.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-md border px-3 py-1.5 text-[12px] font-medium"
                    style={{ borderColor: colors.border, backgroundColor: colors.bgSlate, color: "#334155" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-12 no-break" style={{ paddingTop: "40px" }}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] mb-5" style={{ color: colors.textLight }}>Internship exposure</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {domain.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="rounded-xl border bg-white px-4 py-3.5 shadow-sm"
                    style={{ borderColor: "rgba(226, 232, 240, 0.9)" }}
                  >
                    <div className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: colors.accent }} />
                      <p className="text-[13px] font-semibold leading-snug" style={{ color: colors.navy }}>{activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>

          {/* Signatures and Seals Section */}
          <div className="mt-16 no-break">
            {/* Full-width Verification QR Row */}
            <div className="mb-10 w-full">
              <VerificationQR offerId={offerId} />
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-end justify-between gap-10">
              <div className="text-center sm:text-left">
                <img src={stamp1} alt="Official seal" className="max-h-36 w-auto opacity-95" />
                <p className="text-[10px] uppercase tracking-widest mt-2 font-medium" style={{ color: colors.textLight }}>
                  Official company seal
                </p>
              </div>

              <div className="text-right sm:w-auto">
                <img src={signature} alt="Authorized signatory" className="w-48 ml-auto opacity-95" />
                <div className="mt-3 border-t pt-3 inline-block min-w-[220px]" style={{ borderColor: colors.navy }}>
                  <p className="font-bold text-[16px]" style={{ color: colors.navy }}>Prathamesh Bhil</p>
                  <p className="text-[13px]" style={{ color: colors.textLight }}>Founder & Chief Executive Officer</p>
                  <p className="text-[13px]" style={{ color: colors.textLight }}>Cosmolix Private Limited</p>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-14 flex items-center justify-between border-t pt-6 text-[11px]" style={{ borderColor: colors.border, color: colors.textLight }}>
            <span>© {new Date().getFullYear()} Cosmolix Private Limited</span>
            <span className="font-medium">Electronically issued document</span>
          </footer>
        </div>
      </div>
    </div>
  )
}