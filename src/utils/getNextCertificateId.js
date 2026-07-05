import { supabase } from "@/lib/supabase"
 
const DOMAIN_PREFIXES = {
  fullstack: "FSD",
  ai_ml: "AIML",
  cybersecurity: "CYS",
  mobileapp: "MAD",
  iot: "IOT",
  datascience: "DSA",
}
 
export async function getNextCertificateId(domainKey) {
  const prefix = DOMAIN_PREFIXES[domainKey] || "GEN"
  const { count, error } = await supabase
    .from("certificates")
    .select("*", { count: "exact", head: true })
    .eq("domain_key", domainKey)
 
  if (error) throw error
 
  const nextNumber = (count ?? 0) + 1
  const padded = String(nextNumber).padStart(4, "0")
 
  return `COSMOLIX-${prefix}-${padded}`
}
 