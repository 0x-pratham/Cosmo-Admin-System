import { supabase } from "@/lib/supabase"

export async function uploadPdf({
  blob,
  fileName,
}) {

  const { error } =
    await supabase.storage
      .from("offer-letters")
      .upload(fileName, blob, {

        contentType:
          "application/pdf",

        upsert: true,
      })

  if (error) {
    throw error
  }

  const { data } =
    supabase.storage
      .from("offer-letters")
      .getPublicUrl(fileName)

  return data.publicUrl
}