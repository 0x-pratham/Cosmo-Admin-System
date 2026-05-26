export default function ActivitiesSection({
  activities = [],
}) {
  return (
    <section
      className="mt-12 no-break"
      style={{ paddingTop: "40px" }}
    >

      <h3
        className="text-[11px] font-bold uppercase tracking-[0.25em] mb-5"
        style={{ color: "#64748b" }}
      >
        Internship Exposure
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

        {activities.map((activity, index) => (
          <div
            key={index}
            className="rounded-xl border bg-white px-4 py-3.5 shadow-sm"
            style={{
              borderColor:
                "rgba(226, 232, 240, 0.9)"
            }}
          >

            <div className="flex gap-3">

              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "#b45309" }}
              />

              <p
                className="text-[13px] font-semibold leading-snug"
                style={{ color: "#0f172a" }}
              >
                {activity}
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  )
}