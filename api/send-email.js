import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    })
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
    } = req.body

    const response = await resend.emails.send({

      from: "Cosmolix Pvt Ltd <info@cosmolix.co.in>",

      to: studentEmail,

      subject: `Internship Offer Letter - ${offerId}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          background-color: #f8fafc;
          padding: 40px 20px;
        ">

          <div style="
            max-width: 700px;
            margin: auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
          ">

            <div style="
              background: linear-gradient(to right, #0f172a, #1e3a5f, #b45309);
              height: 8px;
            "></div>

            <div style="padding: 40px;">

              <h1 style="
                color: #0f172a;
                margin-bottom: 10px;
                font-size: 28px;
              ">
                Cosmolix Private Limited
              </h1>

              <p style="
                color: #64748b;
                font-size: 14px;
                margin-bottom: 30px;
              ">
                Internship & Research Program
              </p>

              <p style="
                font-size: 16px;
                color: #0f172a;
              ">
                Dear <strong>${studentName}</strong>,
              </p>

              <p style="
                color: #334155;
                line-height: 1.8;
                margin-top: 20px;
              ">
                We are pleased to offer you an internship opportunity at
                <strong>Cosmolix Private Limited</strong> as a
                <strong>${role}</strong> in
                <strong>${domainName}</strong>.
              </p>

              <div style="
                margin-top: 30px;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                padding: 24px;
              ">

                <h2 style="
                  margin-top: 0;
                  color: #0f172a;
                  font-size: 18px;
                ">
                  Internship Details
                </h2>

                <table style="
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 15px;
                ">

                  <tr>
                    <td style="padding: 10px 0; color: #64748b;">
                      Student Name
                    </td>

                    <td style="
                      padding: 10px 0;
                      color: #0f172a;
                      font-weight: 600;
                    ">
                      ${studentName}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 10px 0; color: #64748b;">
                      PRN
                    </td>

                    <td style="
                      padding: 10px 0;
                      color: #0f172a;
                      font-weight: 600;
                    ">
                      ${prn}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 10px 0; color: #64748b;">
                      College
                    </td>

                    <td style="
                      padding: 10px 0;
                      color: #0f172a;
                      font-weight: 600;
                    ">
                      ${college}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 10px 0; color: #64748b;">
                      Domain
                    </td>

                    <td style="
                      padding: 10px 0;
                      color: #0f172a;
                      font-weight: 600;
                    ">
                      ${domainName}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 10px 0; color: #64748b;">
                      Role
                    </td>

                    <td style="
                      padding: 10px 0;
                      color: #0f172a;
                      font-weight: 600;
                    ">
                      ${role}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 10px 0; color: #64748b;">
                      Internship Duration
                    </td>

                    <td style="
                      padding: 10px 0;
                      color: #0f172a;
                      font-weight: 600;
                    ">
                      ${startDate} → ${endDate}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 10px 0; color: #64748b;">
                      Mode
                    </td>

                    <td style="
                      padding: 10px 0;
                      color: #0f172a;
                      font-weight: 600;
                    ">
                      ${mode}
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 10px 0; color: #64748b;">
                      Offer ID
                    </td>

                    <td style="
                      padding: 10px 0;
                      color: #0f172a;
                      font-weight: 600;
                    ">
                      ${offerId}
                    </td>
                  </tr>

                </table>

              </div>

              <div style="
                margin-top: 35px;
                text-align: center;
              ">

                <a
                  href="${verificationLink}"
                  style="
                    display: inline-block;
                    background: #0f172a;
                    color: white;
                    text-decoration: none;
                    padding: 14px 24px;
                    border-radius: 10px;
                    font-weight: 600;
                  "
                >
                  Verify Offer Letter
                </a>

              </div>

              <p style="
                margin-top: 40px;
                color: #475569;
                line-height: 1.8;
              ">
                We look forward to your contribution and growth within
                the Cosmolix ecosystem throughout this internship.
              </p>

              <div style="
                margin-top: 40px;
                border-top: 1px solid #e2e8f0;
                padding-top: 25px;
              ">

                <p style="
                  margin: 0;
                  font-weight: 700;
                  color: #0f172a;
                ">
                  Prathamesh Bhil
                </p>

                <p style="
                  margin-top: 5px;
                  color: #64748b;
                ">
                  Founder & Chief Executive Officer
                </p>

                <p style="
                  color: #64748b;
                  margin-top: 2px;
                ">
                  Cosmolix Private Limited
                </p>

              </div>

            </div>

          </div>

        </div>
      `,
    })

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      response,
    })

  } catch (error) {

    console.error(error)

    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    })
  }
}