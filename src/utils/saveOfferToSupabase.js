import { supabase } from "@/lib/supabase"

export async function saveOfferToSupabase(data) {

  console.log("SAVING DATA:", data)

  const {
    error,
    data: insertedData
  } = await supabase
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
    .select()

  console.log(
    "INSERT RESULT:",
    insertedData
  )

  console.log(
    "INSERT ERROR:",
    error
  )

  if (error) {

    alert(error.message)

    throw error
  }

  return insertedData
}