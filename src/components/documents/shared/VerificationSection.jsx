import VerificationQR from "@/components/ui/VerificationQR"

export default function VerificationSection({
  offerId,
}) {
  return (
    <div className="mt-16 no-break">
      <VerificationQR offerId={offerId} />
    </div>
  )
}