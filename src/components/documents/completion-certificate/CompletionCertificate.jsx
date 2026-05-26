import DocumentLayout from "@/components/documents/shared/DocumentLayout"
import VerificationSection from "@/components/documents/shared/VerificationSection"
import SignatureSection from "@/components/documents/shared/SignatureSection"

export default function CompletionCertificate({
  studentName = "Student Name",
  domainName = "Cybersecurity & Ethical Hacking",
  grade = "O+",
  startDate = "01 June 2026",
  endDate = "01 September 2026",
  technologies = [],
  offerId = "CPL-CERT-2026-X91A",
}) {
  return (
    <DocumentLayout
      className="w-[1123px] min-h-[794px]"
    >

      <div className="relative px-16 py-14 h-full bg-white overflow-hidden">

        {/* TOP GOLD BAR */}

        <div
          className="absolute top-0 left-0 w-full h-3"
          style={{
            background:
              "linear-gradient(to right, #b45309, #f59e0b, #fcd34d)"
          }}
        />

        {/* WATERMARK */}

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">

          <h1 className="text-[120px] font-black tracking-[0.25em]">
            COSMOLIX
          </h1>

        </div>

        {/* CERTIFICATE CONTENT */}

        <div className="relative z-10 flex flex-col items-center text-center">

          <p className="uppercase tracking-[0.5em] text-[12px] text-slate-500 font-bold">
            Internship Completion Certificate
          </p>

          <h1 className="mt-6 text-6xl font-black tracking-tight text-slate-900">
            Certificate
          </h1>

          <div className="mt-10">

            <p className="text-lg text-slate-500">
              This certificate is proudly presented to
            </p>

            <h2 className="mt-6 text-5xl font-bold text-slate-900 tracking-tight">
              {studentName}
            </h2>

          </div>

          <div className="mt-10 max-w-4xl">

            <p className="text-[18px] leading-[2] text-slate-700">

              for successfully completing the internship program in{" "}

              <span className="font-bold text-slate-900">
                {domainName}
              </span>

              {" "}under Cosmolix Private Limited with demonstrated
              professional dedication, technical participation,
              and practical project-based contribution during the
              internship tenure from{" "}

              <span className="font-bold">
                {startDate}
              </span>

              {" "}to{" "}

              <span className="font-bold">
                {endDate}
              </span>.

            </p>

          </div>

        </div>

      </div>

    </DocumentLayout>
  )
}