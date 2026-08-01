import { QRCodeCanvas } from "qrcode.react"
import { getVerificationUrl } from "@/utils/verificationUrl"

export default function VerificationQR({ offerId }) {
  const verificationUrl = getVerificationUrl(offerId)

  return (
    <div className="flex flex-col items-center">
      <QRCodeCanvas
        value={verificationUrl}
        size={58}
        level="H"
        bgColor="#FFFFFF"
        fgColor="#1C1816"
        includeMargin={false}
      />

      <p
        className="mt-2 text-[9px] font-semibold uppercase tracking-[0.18em]"
        style={{
          color: "#555555",
          fontFamily: '"Times New Roman", serif',
        }}
      >
        Scan to Verify
      </p>
    </div>
  )
}