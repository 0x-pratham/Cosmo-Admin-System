import logo from "@/assets/logo/logo.png"

export default function DocumentHeader({
  offerId,
  currentDate,
}) {
  return (
    <header
      className="flex items-start justify-between gap-8 border-b pb-8 no-break"
      style={{ borderColor: "#e2e8f0" }}
    >
      <div className="flex items-center gap-5 min-w-0">

        <div
          className="shrink-0 rounded-2xl border shadow-sm"
          style={{
            borderColor: "#e2e8f0",
            backgroundColor: "#ffffff",
            width: "90px",
            height: "90px",
            display: "table-cell",
            verticalAlign: "middle",
            textAlign: "center"
          }}
        >
          <img
            src={logo}
            alt="Cosmolix"
            style={{
              width: "90px",
              height: "70px",
              objectFit: "contain",
              display: "inline-block",
              marginTop: "10px"
            }}
          />
        </div>

        <div className="min-w-0">

          <p
            className="text-[10px] uppercase tracking-[0.35em] font-semibold"
            style={{ color: "#64748b" }}
          >
            Offer of internship
          </p>

          <h1
            className="text-[28px] font-bold tracking-tight leading-tight mt-1"
            style={{ color: "#0f172a" }}
          >
            Cosmolix Private Limited
          </h1>

          <p
            className="text-[13px] mt-2 leading-snug max-w-md"
            style={{ color: "#475569" }}
          >
            Industry-oriented internship & research program
          </p>

        </div>
      </div>

      <div className="shrink-0 text-right">

        <div
          className="rounded-2xl border shadow-sm text-left"
          style={{
            borderColor: "#e2e8f0",
            backgroundColor: "#f8fafc",
            width: "220px",
            overflow: "hidden"
          }}
        >

          <div style={{ padding: "16px 20px" }}>

            <p
              className="text-[10px] uppercase tracking-[0.2em] font-semibold"
              style={{ color: "#64748b", margin: "0 0 4px 0" }}
            >
              Reference
            </p>

            <p
              className="font-mono text-[14px] font-bold tracking-wide"
              style={{ color: "#0f172a", margin: "0" }}
            >
              {offerId}
            </p>

            <div
              style={{
                height: "1px",
                backgroundColor: "#e2e8f0",
                margin: "16px 0"
              }}
            />

            <p
              className="text-[10px] uppercase tracking-[0.2em] font-semibold"
              style={{ color: "#64748b", margin: "0 0 4px 0" }}
            >
              Date of issue
            </p>

            <p
              className="text-[14px] font-semibold"
              style={{ color: "#0f172a", margin: "0" }}
            >
              {currentDate}
            </p>

          </div>

          <div
            style={{
              backgroundColor: "#0f172a",
              color: "#ffffff",
              paddingBottom: "10px",
              textAlign: "center"
            }}
          >
            <p
              className="text-[9px] uppercase font-bold tracking-widest"
              style={{ margin: "0" }}
            >
              ● Official Document
            </p>
          </div>

        </div>
      </div>
    </header>
  )
}