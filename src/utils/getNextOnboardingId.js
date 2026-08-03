import { supabase } from "@/lib/supabase";

const PREFIX = "COSMO-ONBOARD-";

export async function getNextOnboardingId() {
  const { data, error } = await supabase
    .from("onboarding_passes")
    .select("onboarding_id")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("GET ONBOARDING ID ERROR:", error);
    throw error;
  }

  // First Record
  if (!data || data.length === 0) {
    return `${PREFIX}0001`;
  }

  const lastId = data[0].onboarding_id;

  const number = parseInt(lastId.replace(PREFIX, ""), 10);

  const next = String(number + 1).padStart(4, "0");

  return `${PREFIX}${next}`;
}