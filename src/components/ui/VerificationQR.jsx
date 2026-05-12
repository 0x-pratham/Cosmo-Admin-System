import { QRCodeCanvas } from "qrcode.react"

import { getVerificationUrl } from "@/utils/verificationUrl"

export default function VerificationQR({ offerId }) {
  const verificationUrl = getVerificationUrl(offerId)

  return (
    <div className="border border-slate-200 rounded-xl p-6 bg-gradient-to-br from-slate-50 to-white flex flex-col sm:flex-row items-start gap-6 shadow-sm">
      <div className="shrink-0 rounded-lg bg-white p-2 border border-slate-100 shadow-inner">
        <QRCodeCanvas
          value={verificationUrl}
          size={100}
          level="H"
          includeMargin={false}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Document verification
        </p>

        <h3 className="text-[17px] font-bold text-slate-900 mt-1 tracking-tight">
          Authenticate this offer letter
        </h3>

        <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">
          Scan the QR code or open the verification link to confirm that this
          letter was issued under the Cosmolix internship program.
        </p>

        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
            Verification ID
          </p>

          <p className="text-[13px] font-semibold text-slate-900 mt-1 tracking-wide font-mono">
            {offerId}
          </p>
        </div>
      </div>
    </div>
  )
}
