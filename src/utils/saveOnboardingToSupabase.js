import { supabase } from "@/lib/supabase";

export async function saveOnboardingToSupabase(data) {

  const {
    error,
    data: insertedData,
  } = await supabase
    .from("onboarding_passes")
    .insert([
      {
        onboarding_id: data.onboardingId,

        employee_id: data.employeeId,

        candidate_name: data.candidateName,

        candidate_email: data.candidateEmail,

        candidate_phone: data.candidatePhone,

        department: data.department,

        role: data.role,

        joining_date: data.joiningDate,

        reporting_manager: data.reportingManager,

        hr_contact: data.hrContact,

        welcome_kit: data.welcomeKit,

        candidate_photo_url: data.candidatePhotoUrl,

        pass_image_url: data.passImageUrl,

        verification_token: data.verificationToken,

        email_sent: false,

        downloaded: false,

        status: "generated",
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return insertedData;
}