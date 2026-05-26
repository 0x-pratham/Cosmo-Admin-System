export default function InternshipContent({
  studentName,
  domain,
  startDate,
  endDate,
  mode,
}) {
  return (
    <div
      className="mt-8 text-[14px] leading-[1.75] space-y-5"
      style={{ color: "#334155" }}
    >

      <p>
        Dear{" "}
        <span
          className="font-semibold"
          style={{ color: "#0f172a" }}
        >
          {studentName}
        </span>,
      </p>

      <p>
        We are pleased to offer you a place on the internship program at{" "}
        <span
          className="font-semibold"
          style={{ color: "#0f172a" }}
        >
          Cosmolix Private Limited
        </span>{" "}
        as a{" "}
        <span
          className="font-semibold"
          style={{ color: "#0f172a" }}
        >
          {domain.role}
        </span>{" "}
        in{" "}
        <span
          className="font-semibold"
          style={{ color: "#0f172a" }}
        >
          {domain.domainName}
        </span>.
      </p>

      <p>
        Your engagement is expected to begin on{" "}
        <b>{startDate}</b> and conclude on{" "}
        <b>{endDate}</b>. Delivery will be in{" "}
        <b>{mode}</b> mode, with guided mentorship,
        project work, and structured professional
        development.
      </p>

      <p>
        {domain.overview}
      </p>

    </div>
  )
}