import { supabase } from "@/lib/supabase"
import { generateOfferLetterId } from "@/utils/generateId"

export async function getNextOfferId(domainKey) {
  const prefixMap = {
    // Existing Legacy Domains
    fullstack: "FSD",
    ai_ml: "AIML",
    cybersecurity: "CYB",
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
  }

  const prefix = prefixMap[domainKey] || "GEN"
  const year = new Date().getFullYear()

  const { data, error } = await supabase
    .from("offer_letters")
    .select("offer_id")
    .like("offer_id", `CPL/${prefix}/${year}/%`)

  if (error) {
    throw error
  }

  const nextSerial = (data?.length || 0) + 1

  return generateOfferLetterId({
    domainKey,
    serialNumber: nextSerial,
  })
}