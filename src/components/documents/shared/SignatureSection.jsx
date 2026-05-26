import stamp1 from "@/assets/stamps/stamp1.png"
import signature from "@/assets/signatures/signature.png"

export default function SignatureSection() {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-end justify-between gap-10">

      <div className="text-center sm:text-left">
        <img
          src={stamp1}
          alt="Official seal"
          className="max-h-36 w-auto opacity-95"
        />

        <p
          className="text-[10px] uppercase tracking-widest mt-2 font-medium"
          style={{ color: "#64748b" }}
        >
          Official company seal
        </p>
      </div>

      <div className="text-right sm:w-auto">
        <img
          src={signature}
          alt="Authorized signatory"
          className="w-48 ml-auto opacity-95"
        />

        <div
          className="mt-3 border-t pt-3 inline-block min-w-[220px]"
          style={{ borderColor: "#0f172a" }}
        >
          <p
            className="font-bold text-[16px]"
            style={{ color: "#0f172a" }}
          >
            Prathamesh Bhil
          </p>

          <p
            className="text-[13px]"
            style={{ color: "#64748b" }}
          >
            Founder & Chief Executive Officer
          </p>

          <p
            className="text-[13px]"
            style={{ color: "#64748b" }}
          >
            Cosmolix Private Limited
          </p>
        </div>
      </div>

    </div>
  )
}