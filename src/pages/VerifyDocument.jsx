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

  const offerId = useMemo(
    () => parseOfferIdFromPath(location.pathname),
    [location.pathname]
  )

  const record = useMemo(
    () => (offerId ? getOfferRecord(offerId) : null),
    [offerId]
  )

  const idLooksValid = /^CPL\/[^/]+\/\d{4}\/\d{4}$/.test(offerId)

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-[0_24px_80px_rgba(15,23,42,0.08)] overflow-hidden border border-slate-200/80">
        <div className="bg-[#0f172a] text-white px-8 py-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-transparent to-transparent pointer-events-none" />

          <div className="relative flex items-center gap-5">
            <div className="bg-white rounded-xl p-2 shadow-lg shadow-black/20">
              <img
                src={logo}
                alt="Cosmolix"
                className="w-16 h-16 object-contain"
              />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400 font-medium">
                Official verification
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
                Cosmolix Private Limited
              </h1>

              <p className="text-slate-400 text-sm mt-1">
                Internship documentation verification
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Status
              </p>

              <div
                className={`mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  idLooksValid || record
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80"
                    : "bg-amber-50 text-amber-900 border border-amber-200/80"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    idLooksValid || record ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                {record || idLooksValid
                  ? "Verification ID recognized"
                  : "Verify ID format"}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl px-5 py-4 border border-slate-200 min-w-[200px]">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Verification ID
              </p>

              <p className="font-mono text-sm font-bold text-slate-900 mt-2 break-all">
                {offerId || "—"}
              </p>
            </div>
          </div>

          {!record && (
            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50/80 px-5 py-4 text-sm text-slate-600 leading-relaxed">
              Full candidate details appear here when this ID was saved from the
              authorized offer letter generator in this browser. The QR link and
              ID format still allow recipients to confirm program affiliation.
            </div>
          )}

          <div className="mt-10">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Record details
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Information associated with this verification ID.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailCard
              label="Candidate"
              value={record?.studentName ?? "—"}
            />

            <DetailCard
              label="PRN / Student ID"
              value={record?.prn ?? "—"}
            />

            <DetailCard
              label="College"
              value={record?.college ?? "—"}
            />

            <DetailCard
              label="Program domain"
              value={record?.domainName ?? "—"}
            />

            <DetailCard
              label="Duration"
              value={
                record
                  ? `${record.startDate} → ${record.endDate}`
                  : "—"
              }
            />

            <DetailCard
              label="Mode"
              value={record?.mode ?? "—"}
            />
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-white px-6 py-5">
            <h3 className="text-sm font-bold text-slate-900">
              Notice
            </h3>

            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              This page confirms verification infrastructure for Cosmolix
              internship offer letters. Unauthorized alteration, reproduction, or
              misrepresentation of documents may violate company policy and
              applicable law.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500">
            <span>© {new Date().getFullYear()} Cosmolix Private Limited</span>

            <span className="inline-flex items-center gap-2 text-slate-700 text-xs font-medium uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Secured verification
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-4">
      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
        {label}
      </p>

      <p className="text-[15px] font-semibold text-slate-900 mt-2 leading-snug">
        {value}
      </p>
    </div>
  )
}
