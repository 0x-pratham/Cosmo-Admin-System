import { ShieldCheck } from "lucide-react";
import logo from "../../logo/cosmolix-logo.png";

export default function LoginHeader() {
  return (
    <div className="text-center space-y-5">
      {/* Company Logo */}
      <div className="flex justify-center">
        <img
          src={logo} /* <-- Yaha par string ki jagah imported variable pass kiya hai */
          alt="Cosmolix Private Limited"
          className="h-16 w-auto select-none"
        />
      </div>

      {/* Security Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5">
        <ShieldCheck className="h-4 w-4 text-orange-400" />

        <span className="text-xs tracking-[0.25em] uppercase text-white/80 font-medium">
          Secure Admin Access
        </span>
      </div>

      {/* Heading Section */}
      <div className="space-y-3">
        <h1
          className="text-5xl font-bold text-white leading-none"
          style={{
            fontFamily: "Times New Roman, serif",
          }}
        >
          Admin Portal
        </h1>

        <h2
          className="text-xl font-medium text-orange-300 tracking-wide"
          style={{
            fontFamily: "Times New Roman, serif",
          }}
        >
          Cosmolix Private Limited
        </h2>

        {/* Description */}
        <p
          className="max-w-sm mx-auto text-sm leading-7 text-white/75"
          style={{
            fontFamily: "'Google Sans Flex', sans-serif",
          }}
        >
          Secure access to the Cosmolix Internal Management System.
          Authenticate using your administrator credentials to continue.
        </p>
      </div>
    </div>
  );
}