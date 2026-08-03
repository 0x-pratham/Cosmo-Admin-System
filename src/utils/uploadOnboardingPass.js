import { supabase } from "@/lib/supabase";

export async function uploadOnboardingPass({
  imageDataUrl,
  onboardingId,
}) {

  if (!imageDataUrl) {
    throw new Error("Onboarding image not found.");
  }

  if (!onboardingId) {
    throw new Error("Onboarding ID is required.");
  }

  // Convert Base64 → Blob
  const response = await fetch(imageDataUrl);

  const blob = await response.blob();

  const fileName = `${onboardingId}.png`;

  const { error } = await supabase.storage

    .from("onboarding-passes")

    .upload(fileName, blob, {

      contentType: "image/png",

      upsert: true,

    });

  if (error) {

    throw error;

  }

  const { data } = supabase.storage

    .from("onboarding-passes")

    .getPublicUrl(fileName);

  return data.publicUrl;

}