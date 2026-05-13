import { supabase } from "@/lib/supabase"
import { generateOfferLetterId } from "@/utils/generateId"

export async function getNextOfferId(domainKey) {

  const prefixMap = {
    fullstack: "FSD",
    ai_ml: "AIML",
    cybersecurity: "CYB",
    mobileapp: "MAD",
    iot: "IOT",
    datascience: "DSA",
  }

  const prefix =
    prefixMap[domainKey] || "GEN"

  const year =
    new Date().getFullYear()

  const { data, error } =
    await supabase
      .from("offer_letters")
      .select("offer_id")
      .like(
        "offer_id",
        `CPL/${prefix}/${year}/%`
      )

  if (error) {
    throw error
  }

  const nextSerial =
    (data?.length || 0) + 1

  return generateOfferLetterId({
    domainKey,
    serialNumber: nextSerial,
  })
}