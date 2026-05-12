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

  return (
    <div className="bg-[#e8ecf2] min-h-screen flex justify-center py-10 px-4 print:bg-white print:py-0">
      <div
        id="offer-letter"
        className="relative bg-white w-[794px] min-h-[1123px] text-slate-800 shadow-[0_32px_64px_rgba(15,23,42,0.12)] overflow-hidden print:shadow-none offer-letter-page"
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-[#0f172a] via-[#1e3a5f] to-[#b45309]" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p
            className="text-[42px] sm:text-[46px] font-bold text-slate-300/25 rotate-[-24deg] tracking-[0.28em] uppercase"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            Cosmolix
          </p>
        </div>

        <div className="relative z-10 px-12 py-10">
          <header className="flex items-start justify-between gap-8 border-b border-slate-200 pb-8 no-break">
            <div className="flex items-center gap-5 min-w-0">
              <div className="shrink-0 rounded-2xl border border-slate-200/90 bg-slate-50 p-2 shadow-sm">
                <img
                  src={logo}
                  alt="Cosmolix"
                  className="w-[72px] h-[72px] object-contain"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500 font-semibold">
                  Offer of internship
                </p>

                <h1 className="text-[28px] font-bold tracking-tight text-[#0f172a] leading-tight mt-1">
                  Cosmolix Private Limited
                </h1>

                <p className="text-[13px] text-slate-600 mt-2 leading-snug max-w-md">
                  Industry-oriented internship & research program · Structured
                  mentorship & evaluation
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <div className="inline-block rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white px-6 py-5 text-left shadow-sm min-w-[200px]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
                  Reference
                </p>

                <p className="font-mono text-[14px] font-bold text-slate-900 mt-2 tracking-wide">
                  {offerId}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-200">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
                    Date of issue
                  </p>

                  <p className="text-[14px] font-semibold text-slate-900 mt-1">
                    {currentDate}
                  </p>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#0f172a] text-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Official document
                </div>
              </div>
            </div>
          </header>

          <section className="mt-10 no-break">
            <p className="text-[12px] font-bold uppercase tracking-widest text-slate-500">
              To
            </p>

            <div className="mt-4 space-y-1.5">
              <p className="text-[19px] font-bold text-[#0f172a] tracking-tight">
                {studentName}
              </p>

              <p className="text-[14px] text-slate-600">
                PRN / Student ID: <span className="font-medium text-slate-800">{prn}</span>
              </p>

              <p className="text-[14px] text-slate-600 leading-relaxed max-w-lg">
                {college}
              </p>
            </div>
          </section>

          <section className="mt-10 no-break">
            <div className="inline-flex items-center border-l-4 border-amber-600 pl-4 py-1">
              <h2 className="text-[18px] font-bold text-[#0f172a] tracking-tight">
                Subject: Internship offer letter
              </h2>
            </div>
          </section>

          <div className="mt-8 text-[14px] leading-[1.75] text-slate-700 space-y-5 document-paragraph">
            <p>
              Dear{" "}
              <span className="font-semibold text-slate-900">
                {studentName}
              </span>
              ,
            </p>

            <p>
              We are pleased to offer you a place on the internship program at{" "}
              <span className="font-semibold text-slate-900">
                Cosmolix Private Limited
              </span>{" "}
              as a{" "}
              <span className="font-semibold text-slate-900">
                {domain.role}
              </span>{" "}
              in{" "}
              <span className="font-semibold text-slate-900">
                {domain.domainName}
              </span>
              .
            </p>

            <p>
              Your engagement is expected to begin on{" "}
              <span className="font-semibold text-slate-900">
                {startDate}
              </span>{" "}
              and conclude on{" "}
              <span className="font-semibold text-slate-900">
                {endDate}
              </span>
              . Delivery will be in{" "}
              <span className="font-semibold text-slate-900">
                {mode}
              </span>{" "}
              mode, with guided mentorship, project work, and structured
              professional development.
            </p>

            <p>{domain.overview}</p>
          </div>

          <section className="mt-12 no-break">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-4">
              Technologies & tools
            </h3>

            <div className="flex flex-wrap gap-2">
              {domain.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-[12px] font-medium text-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-12 no-break">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-5">
              Internship exposure
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {domain.activities.map((activity, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200/90 bg-white px-4 py-3.5 shadow-sm"
                >
                  <div className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                    <p className="text-[13px] font-semibold text-slate-900 leading-snug">
                      {activity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 no-break">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-5">
              Professional standards
            </h3>

            <ul className="space-y-4">
              {[
                {
                  title: "Professional conduct",
                  desc: "Maintain respectful, ethical, and collegial behavior in all program interactions.",
                },
                {
                  title: "Confidentiality",
                  desc: "Protect internal workflows, systems, and organizational information shared during the program.",
                },
                {
                  title: "Commitment",
                  desc: "Follow assigned tasks, timelines, and mentor guidance with diligence and accountability.",
                },
                {
                  title: "Attendance & communication",
                  desc: "Participate consistently and communicate clearly regarding progress and blockers.",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className="border-l-[3px] border-[#0f172a] pl-4 py-0.5"
                >
                  <p className="text-[14px] font-bold text-slate-900">
                    {item.title}
                  </p>

                  <p className="text-[13px] text-slate-600 leading-relaxed mt-1 document-paragraph">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 no-break">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-5">
              Program benefits
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {domain.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-900" />
                  <p className="text-[13px] font-medium text-slate-800 leading-snug">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 no-break rounded-2xl border border-slate-200 bg-slate-50/80 px-7 py-6">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-3">
              Certification & evaluation
            </h3>

            <p className="text-[13px] text-slate-700 leading-relaxed document-paragraph">
              Completion certificates, grading, and recommendation eligibility
              depend on performance, conduct, deliverable quality, and satisfying
              program requirements defined by Cosmolix Private Limited.
            </p>
          </section>

          <div className="mt-10 text-[14px] leading-[1.75] text-slate-700 no-break document-paragraph">
            <p>
              We look forward to your contribution and growth within the Cosmolix
              ecosystem throughout this internship.
            </p>

            <p className="mt-5 font-semibold text-slate-900">Sincerely,</p>
          </div>

          <div className="mt-10 no-break">
            <VerificationQR offerId={offerId} />
          </div>

          <div className="mt-16 flex flex-col-reverse sm:flex-row items-end justify-between gap-10 no-break">
            <div className="text-center sm:text-left">
              <img
                src={stamp1}
                alt="Official seal"
                className="max-h-36 w-auto max-w-[200px] object-contain mx-auto sm:mx-0 opacity-95"
              />

              <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-2 font-medium">
                Official company seal
              </p>
            </div>

            <div className="text-right w-full sm:w-auto">
              <img
                src={signature}
                alt="Authorized signatory"
                className="w-48 ml-auto object-contain opacity-95"
              />

              <div className="mt-3 border-t border-slate-900 pt-3 inline-block min-w-[220px]">
                <p className="font-bold text-[16px] text-[#0f172a]">
                  Prathamesh Bhil
                </p>

                <p className="text-[13px] text-slate-600 mt-0.5">
                  Founder & Chief Executive Officer
                </p>

                <p className="text-[13px] text-slate-600">
                  Cosmolix Private Limited
                </p>
              </div>
            </div>
          </div>

          <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-[11px] text-slate-500 no-break">
            <span>© {new Date().getFullYear()} Cosmolix Private Limited</span>

            <span className="hidden sm:inline text-center flex-1">
              Industry-oriented internship & research program
            </span>

            <span className="font-medium text-slate-600">
              Electronically issued document
            </span>
          </footer>
        </div>
      </div>
    </div>
  )
}
