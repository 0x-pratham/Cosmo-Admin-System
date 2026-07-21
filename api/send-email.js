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
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #FAF8F5; padding: 40px 20px;">
          <div style="max-width: 650px; margin: auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #EAE3D9;">

            <!-- Premium Hero Section -->
            <div style="background: linear-gradient(135deg, #1A1613 0%, #2D2520 100%); padding: 45px 20px; text-align: center;">
              <img src="https://i.ibb.co/fzXy3900/CX-PNG-V.png" alt="Cosmolix Logo" style="max-width: 130px; height: auto; margin-bottom: 20px;" />
              <p style="color: #F1872D; font-size: 14px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px;">Congratulations</p>
              <h1 style="color: #FFFFFF; font-size: 26px; font-weight: 600; margin: 0; line-height: 1.4; letter-spacing: -0.5px;">
                Your Internship Offer<br/><span style="font-weight: 300; opacity: 0.9; font-size: 22px;">is officially issued</span>
              </h1>
            </div>

            <!-- Content Area -->
            <div style="padding: 40px 35px;">
              <p style="color: #2D2520; font-size: 16px; margin-top: 0; margin-bottom: 16px;">Dear <strong>${studentName}</strong>,</p>
              <p style="color: #4A403A; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
                Your application has been successfully approved by Cosmolix Private Limited. We are delighted to welcome you to our Internship Program.
              </p>

              <!-- Elegant Offer Details Card -->
              <div style="background-color: #FCFBFA; border: 1px solid #EAE3D9; border-radius: 12px; padding: 24px; margin-bottom: 30px;">
                <h3 style="color: #1A1613; margin-top: 0; margin-bottom: 20px; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #EAE3D9; padding-bottom: 8px;">Offer Summary</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 14px;">
                  <tr>
                    <td width="50%" style="padding-bottom: 16px; vertical-align: top;">
                      <p style="color: #8A7E74; font-size: 11px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Position Role</p>
                      <p style="color: #1A1613; font-weight: 600; margin: 0;">${role}</p>
                    </td>
                    <td width="50%" style="padding-bottom: 16px; vertical-align: top;">
                      <p style="color: #8A7E74; font-size: 11px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Domain/Department</p>
                      <p style="color: #1A1613; font-weight: 600; margin: 0;">${domainName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" style="padding-bottom: 16px; vertical-align: top;">
                      <p style="color: #8A7E74; font-size: 11px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Institution</p>
                      <p style="color: #1A1613; font-weight: 600; margin: 0;">${college}</p>
                    </td>
                    <td width="50%" style="padding-bottom: 16px; vertical-align: top;">
                      <p style="color: #8A7E74; font-size: 11px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Work Mode</p>
                      <p style="color: #1A1613; font-weight: 600; margin: 0;">${mode}</p>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%" style="padding-bottom: 4px; vertical-align: top;">
                      <p style="color: #8A7E74; font-size: 11px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Reference ID</p>
                      <p style="color: #1A1613; font-weight: 600; margin: 0; font-family: monospace;">${offerId}</p>
                    </td>
                    <td width="50%" style="padding-bottom: 4px; vertical-align: top;">
                      <p style="color: #8A7E74; font-size: 11px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Duration</p>
                      <p style="color: #1A1613; font-weight: 600; margin: 0;">${startDate} &rarr; ${endDate}</p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Sleek Horizontal Process Flow -->
              <div style="background-color: #FFFDFB; border: 1px dashed #E46A09; border-radius: 12px; padding: 20px; margin-bottom: 35px; text-align: center;">
                <p style="color: #1A1613; font-weight: 600; margin-top: 0; margin-bottom: 12px; font-size: 14px;">Next Steps Timeline</p>
                <div style="color: #4A403A; font-size: 13px; line-height: 1.5;">
                  <span style="color: #E46A09; font-weight: 600;">Offer Sent</span> &rarr; 
                  <span style="color: #E46A09; font-weight: 600;">Review & Verify</span> &rarr; 
                  <span style="color: #8A7E74;">CEMS Access</span> &rarr; 
                  <span style="color: #8A7E74;">Onboarding</span>
                </div>
              </div>

              <!-- Premium Interactive Button -->
              <div style="text-align: center; margin-bottom: 40px;">
                <a href="${verificationLink}" style="display: inline-block; background-color: #E46A09; color: #FFFFFF; text-decoration: none; padding: 15px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(228,106,9,0.25);">VIEW & VERIFY OFFER</a>
              </div>

              <hr style="border: none; border-top: 1px solid #EAE3D9; margin: 30px 0;" />

              <!-- Professional Closing Section -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align: top;">
                    <p style="color: #1A1613; font-weight: 600; margin: 0; font-size: 15px;">Prathamesh Bhil</p>
                    <p style="color: #8A7E74; font-size: 13px; margin: 4px 0 14px;">Founder & Chief Executive Officer</p>
                    <p style="color: #645A52; font-style: italic; font-size: 13px; border-left: 2px solid #E46A09; padding-left: 12px; margin: 0;">
                      "We look forward to your valuable contribution to the Cosmolix engineering ecosystem."
                    </p>
                  </td>
                </tr>
              </table>

              <hr style="border: none; border-top: 1px solid #EAE3D9; margin: 30px 0 20px;" />

              <!-- Clean Minimal Footer -->
              <p style="color: #8A7E74; font-size: 12px; text-align: center; margin: 0 0 6px; font-weight: 500;">Cosmolix Private Limited | Pune, Maharashtra</p>
              <p style="color: #8A7E74; font-size: 12px; text-align: center; margin: 0;">
                <a href="https://www.cosmolix.co.in" style="color: #E46A09; text-decoration: none; font-weight: 500;">www.cosmolix.co.in</a> &nbsp;|&nbsp; 
                <a href="mailto:info@cosmolix.co.in" style="color: #E46A09; text-decoration: none; font-weight: 500;">info@cosmolix.co.in</a>
              </p>
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