import { QRCodeCanvas } from "qrcode.react"
import { getVerificationUrl } from "@/utils/verificationUrl"

export default function VerificationQR({ offerId }) {
  const verificationUrl = getVerificationUrl(offerId)

  return (
    <div className="inline-block bg-white">
      <QRCodeCanvas 
        value={verificationUrl} 
        size={80} // Perfectly adjusted square profile for modern letterheads
        level="H" 
        includeMargin={false}
      />
    </div>
  )
}