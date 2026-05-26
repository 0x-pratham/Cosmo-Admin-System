export default function SubjectSection({
  title = "Internship Offer Letter",
}) {
  return (
    <section className="mt-10 no-break">

      <div
        className="inline-flex items-center border-l-4 pl-4 py-1"
        style={{ borderColor: "#b45309" }}
      >
        <h2
          className="text-[18px] font-bold tracking-tight"
          style={{ color: "#0f172a" }}
        >
          Subject: {title}
        </h2>
      </div>

    </section>
  )
}