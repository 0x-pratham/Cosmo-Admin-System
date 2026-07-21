import { Resend } from "resend";
import { render } from "@react-email/render";
// Fixed: Using explicit .jsx extension for ESM/Serverless compatibility
import OfferLetterEmail from "../src/emails/templates/OfferLetterEmail.jsx";

// Existing Resend initialization
const resend = new Resend(process.env.RESEND_API_KEY);[cite: 2]

export default async function handler(req, res) {
  if (req.method !== "POST") {[cite: 2]
    return res.status(405).json({[cite: 2]
      success: false,[cite: 2]
      message: "Method not allowed",[cite: 2]
    });
  }

  try {
    const {
      studentName,[cite: 2]
      studentEmail,[cite: 2]
      prn,[cite: 2]
      college,[cite: 2]
      domainName,[cite: 2]
      role,[cite: 2]
      startDate,[cite: 2]
      endDate,[cite: 2]
      mode,[cite: 2]
      offerId,[cite: 2]
      verificationLink,[cite: 2]
    } = req.body;[cite: 2]

    // Fixed: Added 'await' because render() is asynchronous
    const emailHtml = await render(
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

    // Debugging: Verify it's a string, not a Promise or object
    console.log("Email HTML Type:", typeof emailHtml); 

    const response = await resend.emails.send({[cite: 2]
      from: "Cosmolix Pvt Ltd <info@cosmolix.co.in>",[cite: 2]
      to: studentEmail,[cite: 2]
      subject: `Internship Offer Letter - ${offerId}`,[cite: 2]
      html: emailHtml,[cite: 2]
    });

    return res.status(200).json({[cite: 2]
      success: true,[cite: 2]
      message: "Email sent successfully",[cite: 2]
      response,[cite: 2]
    });

  } catch (error) {[cite: 2]
    console.error(error);[cite: 2]
    return res.status(500).json({[cite: 2]
      success: false,[cite: 2]
      message: "Failed to send email",[cite: 2]
      error: error.message,[cite: 2]
    });
  }
}