import { QRCodeCanvas } from "qrcode.react"
import { getVerificationUrl } from "@/utils/verificationUrl"

export default function VerificationQR({ offerId }) {
  const verificationUrl = getVerificationUrl(offerId)

  return (
    <div 
      className="w-full rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-8 border shadow-sm"
      style={{ 
        borderColor: "#cbd5e1",
        background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 60%, #cbd5e1 100%)" 
      }}
    >
      <div className="shrink-0 bg-white p-2 rounded-xl shadow-md border" style={{ borderColor: "#e2e8f0" }}>
        <QRCodeCanvas value={verificationUrl} size={100} level="H" />
      </div>

      <div className="flex-1 text-right">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: "#475569" }}>Document Verification</p>
        <h3 className="text-[18px] font-bold mt-1" style={{ color: "#0f172a" }}>Authenticate this offer letter</h3>
        <p className="text-[12px] mt-2 ml-auto max-w-md" style={{ color: "#475569" }}>
          Scan the QR code to confirm this letter was issued under the Cosmolix internship program.
        </p>
        <div className="mt-4 pt-3 border-t" style={{ borderColor: "rgba(15, 23, 42, 0.1)" }}>
          <p className="text-[9px] uppercase font-bold" style={{ color: "#64748b" }}>Verification ID</p>
          <p className="font-mono text-[13px] font-bold" style={{ color: "#0f172a" }}>{offerId}</p>
        </div>
      </div>
    </div>
  )
}