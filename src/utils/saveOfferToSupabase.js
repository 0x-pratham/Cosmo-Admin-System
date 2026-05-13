import { supabase } from "@/lib/supabase"

export async function saveOfferToSupabase(data) {

  const { error } =
    await supabase
      .from("offer_letters")
      .insert([{

        offer_id: data.offerId,

        student_name: data.studentName,

        student_email: data.studentEmail,

        prn: data.prn,

        college: data.college,

        domain_key: data.domainKey,

        domain_name: data.domainName,

        role: data.role,

        start_date: data.startDate,

        end_date: data.endDate,

        mode: data.mode,

        pdf_url: data.pdfUrl,
      }])

  if (error) {
    throw error
  }
}