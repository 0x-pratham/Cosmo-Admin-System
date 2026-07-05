// src/components/letter/Certificate.jsx
//
// Landscape internship completion certificate, styled to match the
// Cosmolix logo (black "C" bracket + orange forward-chevron).
//
// USAGE:
//   <Certificate
//     studentName="Jane Doe"
//     domainName="Cybersecurity & Ethical Hacking"
//     role="Cybersecurity Intern"
//     startDate="22 May 2026"
//     endDate="22 August 2026"
//     certificateId="COSMOLIX-CERT-000123"
//     issueDate="22 August 2026"
//   />
//
// FONTS: add this to index.html <head> (or import in index.css) once:
//   <link rel="preconnect" href="https://fonts.googleapis.com">
//   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//   <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
//
// ASSETS: update these three import paths to match the actual filenames
// inside src/assets/logo, src/assets/signatures, src/assets/stamps.
import logo from "@/assets/logo/logo.jpg"
import signature from "@/assets/signatures/signature.png"
import stamp from "@/assets/stamps/stamp1.png"
export default function Certificate({
  studentName = "Student Name",
  domainName = "Domain Name",
  role = "",
  startDate = "Start Date",
  endDate = "End Date",
  certificateId = "COSMOLIX-CERT-000000",
  issueDate,
}) {
  const issued = issueDate || endDate
 
  return (
    <div
      className="relative overflow-hidden bg-[#FAF6EF] mx-auto"
      style={{
        width: "1123px",
        height: "794px",
        fontFamily: "'Inter', sans-serif",
        color: "#171613",
      }}
    >
      {/* ---------- Left panel ---------- */}
      <div
        className="absolute left-0 top-0 h-full flex flex-col justify-between"
        style={{ width: "300px", background: "#171613", padding: "48px 36px", zIndex: 2 }}
      >
        {/* Logo + wordmark */}
        <div>
          <img src={logo} alt="Cosmolix" style={{ width: "56px", height: "56px" }} />
          <p
            className="text-white"
            style={{
              marginTop: "20px",
              fontFamily: "'Fraunces', serif",
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              lineHeight: 1.15,
            }}
          >
            Cosmolix
          </p>
          <p
            style={{
              color: "#E8934A",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            Private Limited
          </p>
        </div>
 
        {/* Slogan, rotated along the panel */}
        <p
          style={{
            color: "#E8934A",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            margin: "0 auto",
          }}
        >
          Beyond limits.
        </p>
 
        {/* Certificate ID */}
        <div>
          <div style={{ height: "1px", background: "rgba(232,147,74,0.35)", marginBottom: "14px" }} />
          <p
            style={{
              color: "#8a8880",
              fontSize: "10px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            Certificate No.
          </p>
          <p
            style={{
              color: "#ffffff",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "14px",
              letterSpacing: "0.06em",
              wordBreak: "break-all",
            }}
          >
            {certificateId}
          </p>
        </div>
      </div>
 
      {/* ---------- Oversized chevron motif, bleeding across the seam ---------- */}
      <svg
        width="260"
        height="360"
        viewBox="0 0 260 360"
        style={{ position: "absolute", left: "185px", top: "217px", zIndex: 3 }}
      >
        <defs>
          <linearGradient id="cosmolixChevron" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B84A0F" />
            <stop offset="100%" stopColor="#E8934A" />
          </linearGradient>
        </defs>
        <path
          d="M20 20 L150 170 L20 320 L60 320 L200 170 L60 20 Z"
          fill="url(#cosmolixChevron)"
        />
      </svg>
 
      {/* ---------- Right / body panel ---------- */}
      <div
        className="absolute top-0 h-full flex flex-col"
        style={{ left: "300px", right: 0, padding: "56px 72px 48px 96px" }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-2">
          <span style={{ width: "6px", height: "6px", borderRadius: "999px", background: "#D2660E" }} />
          <p
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#8a8880",
            }}
          >
            Internship Completion Certificate
          </p>
        </div>
 
        {/* Title */}
        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: "44px",
            marginTop: "18px",
            color: "#171613",
          }}
        >
          Certificate of Completion
        </h1>
 
        {/* Citation */}
        <div style={{ marginTop: "34px", maxWidth: "620px" }}>
          <p style={{ fontSize: "16px", lineHeight: 1.9, color: "#3a3934" }}>
            This is to certify that
          </p>
          <p
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "30px",
              fontWeight: 600,
              color: "#171613",
              margin: "6px 0 10px",
              borderBottom: "2px solid #E8934A",
              display: "inline-block",
              paddingBottom: "4px",
            }}
          >
            {studentName}
          </p>
          <p style={{ fontSize: "16px", lineHeight: 1.9, color: "#3a3934" }}>
            has successfully completed an internship
            {role ? <> as <strong style={{ color: "#171613" }}>{role}</strong></> : null} in the
            domain of <strong style={{ color: "#171613" }}>{domainName}</strong> at{" "}
            <strong style={{ color: "#171613" }}>Cosmolix Private Limited</strong>, during the
            period of <strong style={{ color: "#171613" }}>{startDate}</strong> to{" "}
            <strong style={{ color: "#171613" }}>{endDate}</strong>, demonstrating consistent
            commitment, technical proficiency, and professional conduct throughout the program.
          </p>
        </div>
 
        {/* Spacer pushes footer to bottom */}
        <div style={{ flex: 1 }} />
 
        {/* Footer: dates + signature */}
        <div className="flex items-end justify-between" style={{ marginTop: "24px" }}>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8a8880" }}>
              Issued on
            </p>
            <p style={{ fontSize: "15px", fontWeight: 500, marginTop: "4px" }}>{issued}</p>
          </div>
 
          <div className="flex items-end" style={{ gap: "18px" }}>
            <img
              src={stamp}
              alt=""
              style={{ height: "76px", width: "76px", objectFit: "contain", opacity: 0.92, marginBottom: "18px" }}
            />
            <div className="flex flex-col items-center">
              <img src={signature} alt="Authorized signature" style={{ height: "52px", objectFit: "contain" }} />
              <div style={{ width: "180px", borderTop: "1px solid #c9c6bc", marginTop: "8px" }} />
              <p style={{ fontSize: "13px", fontWeight: 500, marginTop: "6px" }}>Authorized Signatory</p>
              <p style={{ fontSize: "11px", color: "#8a8880" }}>Cosmolix Private Limited</p>
            </div>
          </div>
        </div>
 
        <p style={{ fontSize: "10px", color: "#b1afa6", marginTop: "22px" }}>
          This is a computer-generated certificate issued by Cosmolix Private Limited.
        </p>
      </div>
    </div>
  )
}