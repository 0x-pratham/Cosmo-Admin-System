export default function TechnologiesSection({
  technologies = [],
}) {
  return (
    <section className="mt-12 no-break">

      <h3
        className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4"
        style={{ color: "#64748b" }}
      >
        Technologies & Tools
      </h3>

      <div className="flex flex-wrap gap-2">

        {technologies.map((tech, index) => (
          <span
            key={index}
            className="rounded-md border px-3 py-1.5 text-[12px] font-medium"
            style={{
              borderColor: "#e2e8f0",
              backgroundColor: "#f8fafc",
              color: "#334155"
            }}
          >
            {tech}
          </span>
        ))}

      </div>

    </section>
  )
}