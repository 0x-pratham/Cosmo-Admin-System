import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import logo from "@/assets/logo/logo.png"
import { getOfferRecord } from "@/utils/offerRegistry"

function parseOfferIdFromPath(pathname) {
  const marker = "/verify/"
  const i = pathname.indexOf(marker)
  if (i === -1) return ""
  const raw = pathname.slice(i + marker.length)
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

export default function VerifyDocument() {
  const location = useLocation()
  
  const offerId = useMemo(() => parseOfferIdFromPath(location.pathname), [location.pathname])
  
  const record = useMemo(() => (offerId ? getOfferRecord(offerId) : null), [offerId])

  // Simple validation check
  const idLooksValid = offerId?.startsWith("CPL/")

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        {/* Header - Using HEX colors for safety */}
        <div className="bg-[#0f172a] text-white px-8 py-10 relative">
          <div className="relative flex items-center gap-5">
            <div className="bg-white rounded-xl p-2 shadow-sm">
              <img src={logo} alt="Cosmolix" className="w-16 h-16 object-contain" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">
                Official Verification
              </p>
              <h1 className="text-2xl font-bold mt-1 tracking-tight">
                Cosmolix Private Limited
              </h1>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Verification Status</p>
              <div className={`mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                record ? "bg-[#ecfdf5] text-[#065f46] border border-[#10b981]/20" : "bg-[#fffbeb] text-[#92400e] border border-[#f59e0b]/20"
              }`}>
                <span className={`w-2 h-2 rounded-full ${record ? "bg-[#10b981]" : "bg-[#f59e0b]"}`} />
                {record ? "Verified Record Found" : "Manual Verification Required"}
              </div>
            </div>
            
            <div className="bg-[#f8fafc] p-4 rounded-xl border border-[#e2e8f0] w-full sm:w-auto">
              <p className="text-[10px] font-bold text-slate-500 uppercase">Document ID</p>
              <p className="font-mono font-bold text-slate-900 mt-1 break-all">{offerId || "Invalid ID"}</p>
            </div>
          </div>

          {/* Record Display */}
          <div className="mt-10">
             <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-4 border-b pb-2">
               Candidate Information
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailCard label="Candidate Name" value={record?.studentName} />
                <DetailCard label="Student ID / PRN" value={record?.prn} />
                <DetailCard label="College / University" value={record?.college} />
                <DetailCard label="Internship Domain" value={record?.domainName} />
                <DetailCard label="Timeline" value={record ? `${record.startDate} — ${record.endDate}` : null} />
                <DetailCard label="Training Mode" value={record?.mode} />
             </div>
          </div>

          {!record && (
            <div className="mt-8 p-4 bg-[#f1f5f9] rounded-xl border border-[#cbd5e1] border-dashed text-center">
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-bold block mb-1">System Note:</span>
                Detailed records are local to the issuing device. If this document was recently issued, 
                please verify the Reference ID against the official registry or contact HR.
              </p>
            </div>
          )}

          <div className="mt-10 border-t border-slate-100 pt-6 flex justify-between items-center text-[11px] text-slate-400 font-medium">
             <span>© {new Date().getFullYear()} COSMOLIX PVT LTD</span>
             <span className="uppercase tracking-widest text-[#0f172a]">Secure Portal</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc]/50 p-4 transition-all hover:bg-white hover:shadow-sm">
      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{label}</p>
      <p className="text-[#0f172a] font-bold mt-1 text-[15px]">{value || "N/A"}</p>
    </div>
  )
}