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
      domainName,
      role,
      startDate,
      endDate,
      offerId,
      verificationLink,
    } = req.body;

    const response = await resend.emails.send({
      from: "Cosmolix Pvt Ltd <info@cosmolix.co.in>",
      to: studentEmail,
      subject: `Official Internship Offer Letter - ${offerId} | Cosmolix`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Internship Offer Letter - Cosmolix Private Limited</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #F4F3EF; font-family: 'Times New Roman', Times, serif, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F4F3EF; padding: 40px 0;">
            <tr>
              <td align="center">
                <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #FFFFFF; border-radius: 8px; overflow: hidden; border: 1px solid #D1C7BD; box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                  
                  {/* Header / Brand Bar */}
                  <tr>
                    <td style="background-color: #1C1816; padding: 30px 40px; text-align: left; border-bottom: 3px solid #D3600B;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <h1 style="color: #FFFFFF; font-size: 18px; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; margin: 0;">Cosmolix Private Limited</h1>
                            <p style="color: #D3600B; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin: 4px 0 0 0;">ISO 9001:2015 Certified | MSME Registered</p>
                          </td>
                          <td align="right" style="vertical-align: middle;">
                            {/* Local Public Logo Integration */}
                            <img src="https://www.cosmolix.co.in/logo/cosmolix-logo.png" alt="Cosmolix Logo" width="48" height="48" style="display: block; border: 0; object-fit: contain;" />
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  {/* Body Content */}
                  <tr>
                    <td style="padding: 40px 40px 30px 40px;">
                      <p style="color: #1C1816; font-size: 13pt; font-family: 'Times New Roman', Times, serif; margin: 0 0 15px 0;">To,</p>
                      <p style="color: #1C1816; font-size: 14pt; font-weight: bold; font-family: 'Times New Roman', Times, serif; margin: 0 0 25px 0;">${studentName}</p>
                      
                      <p style="color: #222222; font-size: 12pt; font-family: 'Times New Roman', Times, serif; line-height: 1.6; margin: 0 0 15px 0;">
                        <strong>Subject: Official Internship Offer Appointment</strong>
                      </p>

                      <p style="color: #222222; font-size: 12pt; font-family: 'Times New Roman', Times, serif; line-height: 1.6; margin: 0 0 20px 0;">
                        Dear Candidate,
                      </p>

                      <p style="color: #222222; font-size: 12pt; font-family: 'Times New Roman', Times, serif; line-height: 1.6; margin: 0 0 20px 0;">
                        We are pleased to formally offer you the position of <strong>${role}</strong> within the <strong>${domainName}</strong> department at <strong>Cosmolix Private Limited</strong>. Your internship duration is scheduled from <strong>${startDate}</strong> to <strong>${endDate}</strong>.
                      </p>

                      {/* Formal Metadata Box */}
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8F7F1; border: 1px solid #D1C7BD; border-radius: 4px; margin: 25px 0;">
                        <tr>
                          <td style="padding: 20px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding-bottom: 12px; font-size: 11pt; font-family: 'Times New Roman', Times, serif;">
                                  <span style="color: #555555; text-transform: uppercase; font-size: 9.5pt; font-weight: bold;">Reference No:</span><br/>
                                  <span style="color: #1C1816; font-weight: bold; font-family: monospace; font-size: 11pt;">${offerId}</span>
                                </td>
                                <td style="padding-bottom: 12px; font-size: 11pt; font-family: 'Times New Roman', Times, serif;">
                                  <span style="color: #555555; text-transform: uppercase; font-size: 9.5pt; font-weight: bold;">Department:</span><br/>
                                  <span style="color: #1C1816; font-weight: bold;">${domainName}</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="font-size: 11pt; font-family: 'Times New Roman', Times, serif;">
                                  <span style="color: #555555; text-transform: uppercase; font-size: 9.5pt; font-weight: bold;">Designation Role:</span><br/>
                                  <span style="color: #1C1816; font-weight: bold;">${role}</span>
                                </td>
                                <td style="font-size: 11pt; font-family: 'Times New Roman', Times, serif;">
                                  <span style="color: #555555; text-transform: uppercase; font-size: 9.5pt; font-weight: bold;">Tenure Period:</span><br/>
                                  <span style="color: #1C1816; font-weight: bold;">${startDate} to ${endDate}</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <p style="color: #222222; font-size: 12pt; font-family: 'Times New Roman', Times, serif; line-height: 1.6; margin: 0 0 25px 0;">
                        Please review your official letter details, verify authenticity, and complete your joining formalities using the secure portal button below.
                      </p>

                      {/* Action Button */}
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <a href="${verificationLink}" target="_blank" style="background-color: #1C1816; color: #FFFFFF; padding: 14px 28px; text-decoration: none; font-size: 11pt; font-family: 'Times New Roman', Times, serif; font-weight: bold; border-radius: 4px; letter-spacing: 1px; display: inline-block; border: 1px solid #1C1816;">VIEW & VERIFY OFFER LETTER</a>
                          </td>
                        </tr>
                      </table>

                      <p style="color: #222222; font-size: 12pt; font-family: 'Times New Roman', Times, serif; line-height: 1.6; margin: 25px 0 15px 0;">
                        We look forward to welcoming you to our professional ecosystem.
                      </p>

                      {/* Sign-off Signature block */}
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 35px; border-top: 1px solid #D1C7BD; padding-top: 20px;">
                        <tr>
                          <td>
                            <p style="color: #1C1816; font-size: 11.5pt; font-family: 'Times New Roman', Times, serif; font-weight: bold; margin: 0;">Prathamesh Bhil</p>
                            <p style="color: #555555; font-size: 10.5pt; font-family: 'Times New Roman', Times, serif; margin: 3px 0 0 0;">Chief Executive Officer</p>
                            <p style="color: #D3600B; font-size: 10pt; font-family: 'Times New Roman', Times, serif; font-weight: bold; text-transform: uppercase; margin: 2px 0 0 0;">Cosmolix Private Limited</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  {/* Formal Footer */}
                  <tr>
                    <td style="background-color: #F8F7F1; padding: 20px 40px; text-align: center; border-top: 1px solid #D1C7BD;">
                      <p style="color: #555555; font-size: 9.5pt; font-family: 'Times New Roman', Times, serif; margin: 0 0 5px 0;">ISO 9001:2015 Certified | MSME Registered Enterprise</p>
                      <p style="color: #555555; font-size: 9pt; font-family: 'Times New Roman', Times, serif; margin: 0;">
                        <a href="https://www.cosmolix.co.in" style="color: #D3600B; text-decoration: none;">www.cosmolix.co.in</a> &nbsp;|&nbsp; 
                        <a href="mailto:info@cosmolix.co.in" style="color: #D3600B; text-decoration: none;">info@cosmolix.co.in</a>
                      </p>
                      <p style="color: #777777; font-size: 8.5pt; font-family: 'Times New Roman', Times, serif; margin: 8px 0 0 0;">
                        Registered Office Location: Ambethan, Khed, Pune-410501 Maharashtra
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
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