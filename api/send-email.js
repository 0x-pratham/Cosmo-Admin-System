import { Resend } from "resend";
import { render } from "@react-email/render";
import OfferLetterEmail from "../src/emails/templates/OfferLetterEmail";

// Existing Resend initialization
const resend = new Resend(process.env.RESEND_API_KEY); //[cite: 1]

export default async function handler(req, res) {
  // Existing method check
  if (req.method !== "POST") { //[cite: 1]
    return res.status(405).json({ //[cite: 1]
      success: false, //[cite: 1]
      message: "Method not allowed", //[cite: 1]
    });
  }

  try {
    // Keeping every dynamic variable unchanged
    const {
      studentName, //[cite: 1]
      studentEmail, //[cite: 1]
      prn, //[cite: 1]
      college, //[cite: 1]
      domainName, //[cite: 1]
      role, //[cite: 1]
      startDate, //[cite: 1]
      endDate, //[cite: 1]
      mode, //[cite: 1]
      offerId, //[cite: 1]
      verificationLink, //[cite: 1]
    } = req.body; //[cite: 1]

    // Render React component to HTML string
    const emailHtml = render(
      <OfferLetterEmail 
        studentName={studentName}
        studentEmail={studentEmail}
        prn={prn}
        college={college}
        domainName={domainName}
        role={role}
        startDate={startDate}
        endDate={endDate}
        mode={mode}
        offerId={offerId}
        verificationLink={verificationLink}
      />
    );

    // Existing send logic
    const response = await resend.emails.send({ //[cite: 1]
      from: "Cosmolix Pvt Ltd <info@cosmolix.co.in>", //[cite: 1]
      to: studentEmail, //[cite: 1]
      subject: `Internship Offer Letter - ${offerId}`, //[cite: 1]
      html: emailHtml, // Replaced raw HTML with React Email generated HTML
    });

    return res.status(200).json({ //[cite: 1]
      success: true, //[cite: 1]
      message: "Email sent successfully", //[cite: 1]
      response, //[cite: 1]
    });

  } catch (error) { //[cite: 1]
    console.error(error); //[cite: 1]
    return res.status(500).json({ //[cite: 1]
      success: false, //[cite: 1]
      message: "Failed to send email", //[cite: 1]
      error: error.message, //[cite: 1]
    });
  }
}