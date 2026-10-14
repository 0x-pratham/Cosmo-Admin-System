import { supabase } from "@/lib/supabase"

const DOMAIN_PREFIXES = {
  // Existing Legacy Domains
  fullstack: "FSD",
  ai_ml: "AIML",
  cybersecurity: "CYS",
  mobileapp: "MAD",
  iot: "IOT",
  datascience: "DSA",

  // New Domains
  software_development: "SDE",
  uiux_design: "UIX",
  quality_assurance: "QAE",
  digital_marketing: "DGM",
  content_marketing: "CNT",
  business_development: "BDE",
  hr_operations: "HRO",
  client_relations: "CSR",
  finance_accounts: "FIN",
  project_coordination: "PMO",
  game_marketing: "GMK",
  unity_game_development: "UGD",
  aws_workshop: "AWS", // Added for the new workshop
}

export async function getNextCertificateId(domainKey, brand = "COSMOLIX") {
  const prefix = DOMAIN_PREFIXES[domainKey] || "GEN"
  const searchPattern = `${brand}-${prefix}-%`
  
  // Find the absolute latest certificate for this specific brand and domain
  const { data, error } = await supabase
    .from("certificates")
    .select("certificate_id")
    .ilike("certificate_id", searchPattern)
    .order("created_at", { ascending: false })
    .limit(1)

  if (error) {
    console.error("Error fetching last ID:", error)
    throw error
  }

  // If no certificates exist yet, start with 0001
  if (!data || data.length === 0) {
    return `${brand}-${prefix}-0001`
  }

  // Extract the actual last number, increment, and pad
  const lastId = data[0].certificate_id
  const lastNumber = parseInt(lastId.split("-").pop(), 10)
  const nextNumber = lastNumber + 1
  const padded = String(nextNumber).padStart(4, "0")

  return `${brand}-${prefix}-${padded}`
}