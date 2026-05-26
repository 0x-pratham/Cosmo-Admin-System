export default function CandidateSection({
  studentName,
  prn,
  college,
}) {
  return (
    <section className="no-break">

      <p
        className="text-[12px] font-bold uppercase tracking-widest"
        style={{ color: "#64748b" }}
      >
        To
      </p>

      <div className="mt-4 space-y-1.5">

        <p
          className="text-[19px] font-bold tracking-tight"
          style={{ color: "#0f172a" }}
        >
          {studentName}
        </p>

        <p
          className="text-[14px]"
          style={{ color: "#64748b" }}
        >
          PRN / Student ID:
          <span
            className="font-medium ml-1"
            style={{ color: "#1e293b" }}
          >
            {prn}
          </span>
        </p>

        <p
          className="text-[14px] leading-relaxed max-w-lg"
          style={{ color: "#64748b" }}
        >
          {college}
        </p>

      </div>

    </section>
  )
}