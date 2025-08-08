import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOTPEmail(
  email: string,
  otp: string,
  name?: string
): Promise<boolean> {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL_SENDER,
      to: email,
      subject: "Email Verification - Robofly",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1ba100; margin: 0;">Robofly</h1>
              <p style="color: #666; margin: 10px 0;">Drone Technology Solutions</p>
            </div>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; margin-top: 0;">Email Verification Required</h2>
              <p style="color: #666; line-height: 1.6;">
                ${name ? `Hello ${name},` : "Hello,"}
              </p>
              <p style="color: #666; line-height: 1.6;">
                Thank you for your interest in Robofly services. To complete your form submission, 
                please verify your email address using the OTP below:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="background-color: #1ba100; color: white; font-size: 28px; font-weight: bold; 
                           padding: 15px 30px; border-radius: 8px; display: inline-block; letter-spacing: 4px;">
                  ${otp}
                </div>
              </div>
              
              <p style="color: #666; line-height: 1.6; text-align: center;">
                <strong>This OTP is valid for 10 minutes only.</strong>
              </p>
              
              <p style="color: #666; line-height: 1.6; font-size: 14px;">
                If you didn't request this verification, please ignore this email. 
                For security reasons, do not share this OTP with anyone.
              </p>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                This email was sent from Robofly. If you have any questions, 
                please contact our support team.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
}
