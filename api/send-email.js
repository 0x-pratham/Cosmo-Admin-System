import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      studentName,
      studentEmail,
      prn,
      college,
      domainName,
      role,
      startDate,
      endDate,
      mode,
      offerId,
      verificationLink,
    } = req.body;

    const response = await resend.emails.send({
      from: "Cosmolix Pvt Ltd <info@cosmolix.co.in>",
      to: studentEmail,
      subject: `Internship Offer Letter - ${offerId}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #FFFDF9; padding: 40px 20px;">
          <div style="max-width: 700px; margin: auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #ECE7E1;">

            <!-- Hero Section -->
            <div style="background-color: #1E1A17; padding: 40px 20px; text-align: center;">
              <!-- Replace with actual logo URL -->
              <div style="color: #FFFFFF; font-size: 28px; font-weight: bold; margin-bottom: 20px;">[ CX LOGO ]</div>
              <p style="color: #F1872D; font-size: 16px; font-weight: bold; margin: 0 0 10px;">Congratulations!</p>
              <h1 style="color: #FFFFFF; font-size: 24px; margin: 0; line-height: 1.4;">Your Internship Offer<br/><span style="font-weight: normal;">has been officially issued.</span></h1>
            </div>

            <div style="padding: 40px;">
              <!-- Welcome Section -->
              <p style="color: #1E1A17; font-size: 16px; margin-top: 0; margin-bottom: 16px;">Hello <strong>${studentName}</strong>,</p>
              <p style="color: #1E1A17; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                Your application has been successfully approved by Cosmolix Private Limited. We are delighted to welcome you to our Internship Program.
              </p>

              <!-- Offer Summary Card -->
              <div style="background-color: #FFFFFF; border: 1px solid #ECE7E1; border-radius: 12px; padding: 24px; margin-bottom: 35px;">
                <h3 style="color: #1E1A17; margin-top: 0; margin-bottom: 20px; font-size: 18px;">Offer Summary</h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="50%" style="padding-bottom: 16px;">
                      <p style="color: #64748b; font-size: 13px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Role</p>
                      <p style="color: #1E1A17; font-size: 15px; font-weight: bold; margin: 0;">${role}</p>
                    </td>
                    <td width="50%" style="padding-bottom: 16px;">
                      <p style="color: #64748b; font-size: 13px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Department</p>
                      <p style="color: #1E1A17; font-size: 15px; font-weight: bold; margin: 0;">${domainName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" style="padding-bottom: 16px;">
                      <p style="color: #64748b; font-size: 13px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Reference</p>
                      <p style="color: #1E1A17; font-size: 15px; font-weight: bold; margin: 0;">${offerId}</p>
                    </td>
                    <td width="50%" style="padding-bottom: 16px;">
                      <p style="color: #64748b; font-size: 13px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">PRN</p>
                      <p style="color: #1E1A17; font-size: 15px; font-weight: bold; margin: 0;">${prn}</p>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p style="color: #64748b; font-size: 13px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Duration</p>
                      <p style="color: #1E1A17; font-size: 15px; font-weight: bold; margin: 0;">${startDate} &rarr; ${endDate}</p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Journey Timeline -->
              <div style="background-color: #FFFDF9; border: 1px solid #ECE7E1; border-radius: 12px; padding: 24px; margin-bottom: 40px; text-align: center;">
                <p style="color: #1E1A17; font-weight: bold; margin-top: 0; margin-bottom: 16px; font-size: 16px;">Your Journey</p>
                <p style="color: #E46A09; font-size: 14px; margin: 0 0 8px;"><strong>✓ Offer Generated</strong></p>
                <p style="color: #ECE7E1; font-size: 16px; margin: 0 0 8px;">↓</p>
                <p style="color: #E46A09; font-size: 14px; margin: 0 0 8px;"><strong>✓ Review Offer</strong></p>
                <p style="color: #ECE7E1; font-size: 16px; margin: 0 0 8px;">↓</p>
                <p style="color: #64748b; font-size: 14px; margin: 0 0 8px;">LMS Access</p>
                <p style="color: #ECE7E1; font-size: 16px; margin: 0 0 8px;">↓</p>
                <p style="color: #64748b; font-size: 14px; margin: 0;">Internship Begins</p>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin-bottom: 40px;">
                <a href="${verificationLink}" style="display: inline-block; background-color: #E46A09; color: #FFFFFF; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: bold; font-size: 15px;">VIEW OFFER LETTER</a>
              </div>

              <hr style="border: none; border-top: 1px solid #ECE7E1; margin: 30px 0;" />

              <!-- CEO Signature -->
              <p style="color: #1E1A17; font-weight: bold; margin: 0; font-size: 16px;">Prathamesh Bhil</p>
              <p style="color: #64748b; font-size: 14px; margin: 4px 0 16px;">Founder & CEO, Cosmolix Private Limited</p>
              <blockquote style="margin: 0; padding-left: 16px; border-left: 3px solid #E46A09; color: #64748b; font-style: italic; font-size: 14px;">
                "We are excited to welcome you to our growing engineering community."
              </blockquote>

              <hr style="border: none; border-top: 1px solid #ECE7E1; margin: 30px 0 20px;" />

              <!-- Footer -->
              <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0 0 4px;">Cosmolix Private Limited | Ambethan, Pune</p>
              <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0 0 4px;"><a href="http://www.cosmolix.co.in" style="color: #64748b; text-decoration: none;">www.cosmolix.co.in</a> | <a href="mailto:info@cosmolix.co.in" style="color: #64748b; text-decoration: none;">info@cosmolix.co.in</a></p>
              <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">&copy; 2026 All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      response,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
}