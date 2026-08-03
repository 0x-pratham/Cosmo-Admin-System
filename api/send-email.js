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
      type = "offer",

      // Offer Letter & Certificate Shared Fields
      studentName,
      studentEmail,
      domainName,
      role,
      startDate,
      endDate,
      verificationLink,

      // Unique Fields
      offerId,
      certificateId,

      // Onboarding Fields
      candidateName,
      candidateEmail,
      onboardingId,
      department,
      joiningDate,
      verificationToken,
    } = req.body;

    // ==========================================
    // 1. OFFER LETTER EMAIL BLOCK
    // ==========================================
    if (type === "offer") {
      const response = await resend.emails.send({
        from: "Cosmolix Pvt Ltd <info@cosmolix.co.in>",
        to: studentEmail,
        subject: `Internship Offer Letter - ${offerId}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #FAF8F5; padding: 40px 20px;">
            <div style="max-width: 650px; margin: auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #EAE3D9;">
              <div style="background: linear-gradient(135deg, #1A1613 0%, #2D2520 100%); padding: 45px 20px; text-align: center;">
                <img src="https://cosmolix.co.in/logo/cosmolix-logo.png" alt="Cosmolix Logo" style="max-width: 130px; height: auto; margin-bottom: 20px;" />
                <p style="color: #F1872D; font-size: 14px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px;">Congratulations</p>
                <h1 style="color: #FFFFFF; font-size: 26px; font-weight: 600; margin: 0; line-height: 1.4; letter-spacing: -0.5px;">
                  Your Internship Offer<br/><span style="font-weight: 300; opacity: 0.9; font-size: 22px;">is officially issued</span>
                </h1>
              </div>
              <div style="padding: 40px 35px;">
                <p style="color: #2D2520; font-size: 16px; margin-top: 0; margin-bottom: 16px;">Dear <strong>${studentName}</strong>,</p>
                <p style="color: #4A403A; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
                  Your application has been successfully approved by Cosmolix Private Limited. We are delighted to welcome you to our Internship Program.
                </p>
                <div style="text-align: center; margin-bottom: 40px;">
                  <a href="${verificationLink}" style="display: inline-block; background-color: #E46A09; color: #FFFFFF; text-decoration: none; padding: 15px 0; width: 100%; max-width: 280px; box-sizing: border-box; border-radius: 8px; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">VIEW & VERIFY OFFER</a>
                </div>
                <p style="color: #8A7E74; font-size: 12px; text-align: center; margin: 0;">
                  <a href="https://www.cosmolix.co.in" style="color: #E46A09; text-decoration: none; font-weight: 500;">www.cosmolix.co.in</a> &nbsp;|&nbsp; 
                  <a href="mailto:info@cosmolix.co.in" style="color: #E46A09; text-decoration: none; font-weight: 500;">info@cosmolix.co.in</a>
                </p>
              </div>
            </div>
          </div>
        `,
      });
      return res.status(200).json({ success: true, message: "Email sent successfully", response });
    }

    // ==========================================
    // 2. ONBOARDING EMAIL BLOCK
    // ==========================================
    if (type === "onboarding") {
      const welcomeLink = verificationLink; 
      const response = await resend.emails.send({
        from: "Cosmolix Pvt Ltd <info@cosmolix.co.in>",
        to: candidateEmail,
        subject: "Welcome to Cosmolix Private Limited!",
        html: `
          <div style="font-family:Segoe UI,Arial,sans-serif;background:#F8F7F1;padding:40px 20px;">
            <div style="max-width:680px;margin:auto;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.08);">
              <div style="background:#1A1613;padding:55px;text-align:center;">
                <img src="https://cosmolix.co.in/logo/cosmolix-logo.png" width="130" style="margin-bottom:20px;" />
                <p style="color:#E9813B;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin:0;">Welcome Aboard</p>
                <h1 style="color:#ffffff;font-size:30px;margin:18px 0 10px;">Welcome to Cosmolix</h1>
              </div>
              <div style="padding:40px;">
                <p style="font-size:16px;color:#222;">Dear <strong>${candidateName}</strong>,</p>
                <p style="font-size:15px;line-height:1.8;color:#555;">Congratulations and welcome to <strong>Cosmolix Private Limited.</strong> We are delighted to have you as a part of our growing team.</p>
                <div style="text-align:center;margin:40px 0;">
                  <a href="${welcomeLink}" style="background:#E46A09;color:#fff;text-decoration:none;padding:16px 42px;border-radius:10px;display:inline-block;font-weight:600;font-size:15px;">Access Welcome Portal</a>
                </div>
              </div>
            </div>
          </div>
        `,
      });
      return res.status(200).json({ success: true, message: "Onboarding email sent successfully", response });
    }

    // ==========================================
    // 3. CERTIFICATE EMAIL BLOCK
    // ==========================================
    if (type === "certificate") {
      const response = await resend.emails.send({
        from: "Cosmolix Pvt Ltd <info@cosmolix.co.in>",
        to: studentEmail,
        subject: `Internship Completion Certificate - ${certificateId}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #FAF8F5; padding: 40px 20px;">
            <div style="max-width: 650px; margin: auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #EAE3D9;">
              <!-- Premium Hero Section -->
              <div style="background: linear-gradient(135deg, #1A1613 0%, #2D2520 100%); padding: 45px 20px; text-align: center;">
                <img src="https://cosmolix.co.in/logo/cosmolix-logo.png" alt="Cosmolix Logo" style="max-width: 130px; height: auto; margin-bottom: 20px;" />
                <p style="color: #F1872D; font-size: 14px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px;">Program Completed</p>
                <h1 style="color: #FFFFFF; font-size: 26px; font-weight: 600; margin: 0; line-height: 1.4; letter-spacing: -0.5px;">
                  Your Completion Certificate<br/><span style="font-weight: 300; opacity: 0.9; font-size: 22px;">is now officially issued</span>
                </h1>
              </div>

              <!-- Content Area -->
              <div style="padding: 40px 35px;">
                <p style="color: #2D2520; font-size: 16px; margin-top: 0; margin-bottom: 16px;">Dear <strong>${studentName}</strong>,</p>
                <p style="color: #4A403A; font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
                  Congratulations! We are thrilled to issue your official Internship Completion Certificate. Your dedication and hard work as a <strong>${role}</strong> in the <strong>${domainName}</strong> domain have been truly appreciated by the team at Cosmolix Private Limited.
                </p>

                <!-- Elegant Details Card -->
                <div style="background-color: #FCFBFA; border: 1px solid #EAE3D9; border-radius: 12px; padding: 24px; margin-bottom: 30px;">
                  <h3 style="color: #1A1613; margin-top: 0; margin-bottom: 20px; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #EAE3D9; padding-bottom: 8px;">Certificate Details</h3>
                  
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="padding-bottom: 16px; font-size: 14px;">
                        <p style="color: #8A7E74; font-size: 11px; margin: 0 0 4px; text-transform: uppercase;">Credential ID</p>
                        <p style="color: #1A1613; font-weight: 600; margin: 0; font-family: monospace;">${certificateId}</p>
                      </td>
                      <td style="padding-bottom: 16px; font-size: 14px;">
                        <p style="color: #8A7E74; font-size: 11px; margin: 0 0 4px; text-transform: uppercase;">Duration</p>
                        <p style="color: #1A1613; font-weight: 600; margin: 0;">${startDate} to ${endDate}</p>
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Call to Action -->
                <div style="text-align: center; margin-bottom: 40px;">
                  <a href="${verificationLink}" style="display: inline-block; background-color: #E46A09; color: #FFFFFF; text-decoration: none; padding: 15px 35px; border-radius: 8px; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(228,106,9,0.25);">DOWNLOAD CERTIFICATE (PDF)</a>
                </div>

                <hr style="border: none; border-top: 1px solid #EAE3D9; margin: 30px 0;" />
                <p style="color: #1A1613; font-weight: 600; margin: 0; font-size: 15px;">Prathamesh Bhil</p>
                <p style="color: #8A7E74; font-size: 13px; margin: 4px 0 14px;">Founder & Chief Executive Officer</p>
                <hr style="border: none; border-top: 1px solid #EAE3D9; margin: 30px 0 20px;" />

                <p style="color: #8A7E74; font-size: 12px; text-align: center; margin: 0 0 6px; font-weight: 500;">Cosmolix Private Limited | Pune, Maharashtra</p>
              </div>
            </div>
          </div>
        `,
      });
      return res.status(200).json({ success: true, message: "Certificate email sent successfully", response });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
}