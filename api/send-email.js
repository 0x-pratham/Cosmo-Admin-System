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

      // Offer Letter Fields
      studentName,
      studentEmail,
      domainName,
      role,
      startDate,
      endDate,
      offerId,
      verificationLink,

      // Onboarding Fields
      candidateName,
      candidateEmail,
      onboardingId,
      department,
      joiningDate,
      verificationToken,
      passImageUrl,
    } = req.body;

    if (type === "offer") {
      const response = await resend.emails.send({
        from: "Cosmolix Pvt Ltd <info@cosmolix.co.in>",
        to: studentEmail,
        subject: `Internship Offer Letter - ${offerId}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #FAF8F5; padding: 40px 20px;">
            <div style="max-width: 650px; margin: auto; background: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); border: 1px solid #EAE3D9;">

              <!-- Premium Hero Section -->
              <div style="background: linear-gradient(135deg, #1A1613 0%, #2D2520 100%); padding: 45px 20px; text-align: center;">
                <img src="https://cosmolix.co.in/logo/cosmolix-logo.png" alt="Cosmolix Logo" style="max-width: 130px; height: auto; margin-bottom: 20px;" />
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

                <!-- Elegant Offer Details Card (Fluid Hybrid Layout without Media Queries) -->
                <div style="background-color: #FCFBFA; border: 1px solid #EAE3D9; border-radius: 12px; padding: 24px; margin-bottom: 30px;">
                  <h3 style="color: #1A1613; margin-top: 0; margin-bottom: 20px; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #EAE3D9; padding-bottom: 8px;">Offer Summary</h3>
                  
                  <!-- Row 1: Role & Domain -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="font-size:0; text-align:left;">
                        <!--[if mso]><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="50%" valign="top"><![endif]-->
                        <div style="display:inline-block; width:100%; max-width:270px; vertical-align:top;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="padding-bottom: 16px; font-size: 14px;">
                                <p style="color: #8A7E74; font-size: 11px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Position Role</p>
                                <p style="color: #1A1613; font-weight: 600; margin: 0;">${role}</p>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <!--[if mso]></td><td width="50%" valign="top"><![endif]-->
                        <div style="display:inline-block; width:100%; max-width:270px; vertical-align:top;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="padding-bottom: 16px; font-size: 14px;">
                                <p style="color: #8A7E74; font-size: 11px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Domain/Department</p>
                                <p style="color: #1A1613; font-weight: 600; margin: 0;">${domainName}</p>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <!--[if mso]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </table>

                  <!-- Row 2: Reference ID & Duration -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="font-size:0; text-align:left;">
                        <!--[if mso]><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="50%" valign="top"><![endif]-->
                        <div style="display:inline-block; width:100%; max-width:270px; vertical-align:top;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="padding-bottom: 8px; font-size: 14px;">
                                <p style="color: #8A7E74; font-size: 11px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Reference ID</p>
                                <p style="color: #1A1613; font-weight: 600; margin: 0; font-family: monospace; word-break: break-word;">${offerId}</p>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <!--[if mso]></td><td width="50%" valign="top"><![endif]-->
                        <div style="display:inline-block; width:100%; max-width:270px; vertical-align:top;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="padding-bottom: 8px; font-size: 14px;">
                                <p style="color: #8A7E74; font-size: 11px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 0.5px;">Duration</p>
                                <p style="color: #1A1613; font-weight: 600; margin: 0;">${startDate}<br/><span style="color:#8A7E74; font-size:11px; font-weight:normal;">to</span><br/>${endDate}</p>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <!--[if mso]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </table>
                </div>

                <!-- Sleek Vertical Process Flow (Mobile First, Desktop Friendly) -->
                <div style="background-color: #FFFDFB; border: 1px dashed #E46A09; border-radius: 12px; padding: 24px 20px; margin-bottom: 35px; text-align: center;">
                  <p style="color: #1A1613; font-weight: 600; margin-top: 0; margin-bottom: 16px; font-size: 14px;">Next Steps Timeline</p>
                  <div style="font-size: 13px; line-height: 1.5;">
                    <p style="margin: 0; color: #E46A09; font-weight: 600;">&#10003; Offer Sent</p>
                    <p style="margin: 6px 0; color: #8A7E74;">&darr;</p>
                    <p style="margin: 0; color: #E46A09; font-weight: 600;">&#10003; Review & Verify</p>
                    <p style="margin: 6px 0; color: #8A7E74;">&darr;</p>
                    <p style="margin: 0; color: #E46A09; font-weight: 600;">&#10003; CEMS Access</p>
                    <p style="margin: 6px 0; color: #8A7E74;">&darr;</p>
                    <p style="margin: 0; color: #E46A09; font-weight: 600;">&#10003; Onboarding</p>
                  </div>
                </div>

                <!-- Premium Interactive Button -->
                <div style="text-align: center; margin-bottom: 40px;">
                  <a href="${verificationLink}" style="display: inline-block; background-color: #E46A09; color: #FFFFFF; text-decoration: none; padding: 15px 0; width: 100%; max-width: 280px; box-sizing: border-box; border-radius: 8px; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(228,106,9,0.25);">VIEW & VERIFY OFFER</a>
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
    }

    if (type === "onboarding") {
      const welcomeLink = verificationLink; // Fixed: using client-provided verificationLink directly

      const response = await resend.emails.send({
        from: "Cosmolix Pvt Ltd <info@cosmolix.co.in>",
        to: candidateEmail,
        subject: "Welcome to Cosmolix Private Limited!",
        html: `
          <div style="font-family:Segoe UI,Arial,sans-serif;background:#F8F7F1;padding:40px 20px;">
            <div style="max-width:680px;margin:auto;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.08);">
              <!-- Hero -->
              <div style="background:#1A1613;padding:55px;text-align:center;">
                <img src="https://cosmolix.co.in/logo/cosmolix-logo.png" width="130" style="margin-bottom:20px;" />
                <p style="color:#E9813B;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin:0;">
                  Welcome Aboard
                </p>
                <h1 style="color:#ffffff;font-size:30px;margin:18px 0 10px;">
                  Welcome to Cosmolix
                </h1>
                <p style="color:#D9D9D9;font-size:15px;margin:0;">
                  Your journey starts here.
                </p>
              </div>

              <!-- Content -->
              <div style="padding:40px;">
                <p style="font-size:16px;color:#222;">
                  Dear <strong>${candidateName}</strong>,
                </p>
                <p style="font-size:15px;line-height:1.8;color:#555;">
                  Congratulations and welcome to <strong>Cosmolix Private Limited.</strong>
                  We are delighted to have you as a part of our growing team.
                </p>

                <div style="background:#FCFBFA;border:1px solid #ECE6DF;border-radius:12px;padding:24px;margin:30px 0;">
                  <h3 style="margin-top:0;color:#222;">
                    Your Onboarding Details
                  </h3>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 6px 0; color:#666;"><strong>Reference ID</strong></td>
                      <td style="padding: 6px 0; color:#222; text-align:right;">${onboardingId}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color:#666;"><strong>Role</strong></td>
                      <td style="padding: 6px 0; color:#222; text-align:right;">${role}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color:#666;"><strong>Department</strong></td>
                      <td style="padding: 6px 0; color:#222; text-align:right;">${department}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0; color:#666;"><strong>Joining Date</strong></td>
                      <td style="padding: 6px 0; color:#222; text-align:right;">${joiningDate}</td>
                    </tr>
                  </table>
                </div>

                <div style="text-align:center;margin:40px 0;">
                  <a href="${welcomeLink}" style="background:#E46A09;color:#fff;text-decoration:none;padding:16px 42px;border-radius:10px;display:inline-block;font-weight:600;font-size:15px;">
                    Welcome to Cosmolix
                  </a>
                </div>

                <p style="font-size:14px;color:#666;line-height:1.8;">
                  Click the button above to access your personalized Welcome Page, onboarding resources and other important information prepared for you.
                </p>

                <hr style="margin:35px 0;border:none;border-top:1px solid #ECECEC;" />

                <p style="margin:0;font-weight:600;">
                  Prathamesh Bhil
                </p>
                <p style="margin:6px 0;color:#777;">
                  Founder & Chief Executive Officer
                </p>
                <p style="margin-top:30px;font-size:12px;color:#999;text-align:center;">
                  © Cosmolix Private Limited
                </p>
              </div>
            </div>
          </div>
        `,
      });

      return res.status(200).json({
        success: true,
        message: "Onboarding email sent successfully",
        response,
      });
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