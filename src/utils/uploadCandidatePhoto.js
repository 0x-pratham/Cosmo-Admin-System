import { supabase } from "@/lib/supabase";

export async function uploadCandidatePhoto({
  file,
  employeeId,
}) {

  if (!file) {
    throw new Error("Candidate photo is required.");
  }

  const extension = file.name.split(".").pop();

  const fileName = `${employeeId}.${extension}`;

  const filePath = fileName;

  const { error } = await supabase.storage
    .from("candidate-photos")
    .upload(filePath, file, {
      upsert: true,
      contentType: file.type,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("candidate-photos")
    .getPublicUrl(filePath);

  return data.publicUrl;
}