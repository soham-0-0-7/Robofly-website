import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email templates
const getEmailTemplate = (
  templateName: string,
  replacements: Record<string, string>
) => {
  try {
    const templatePath = path.join(
      process.cwd(),
      "src",
      "templates",
      `${templateName}.html`
    );
    let template = fs.readFileSync(templatePath, "utf8");

    // Replace placeholders
    Object.keys(replacements).forEach((key) => {
      const placeholder = `{{${key}}}`;
      template = template.replace(
        new RegExp(placeholder, "g"),
        replacements[key]
      );
    });

    return template;
  } catch (error) {
    console.error("Error reading email template:", error);
    return null;
  }
};

// Send regular OTP email (for contact forms, etc.)
export const sendOTPEmail = async (
  email: string,
  otp: string,
  name?: string
): Promise<boolean> => {
  try {
    const subject = "Your OTP Code - Robofly";
    const text = `Hello ${
      name || "User"
    },\n\nYour OTP code is: ${otp}\n\nThis code expires in 10 minutes.\n\nBest regards,\nRobofly Team`;

    // You can create a general OTP template or use simple text
    const mailOptions = {
      from: process.env.SMTP_EMAIL_SENDER,
      to: email,
      subject: subject,
      text: text,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Your OTP Code</h2>
          <p>Hello ${name || "User"},</p>
          <p>Your OTP code is: <strong style="font-size: 24px; color: #3b82f6;">${otp}</strong></p>
          <p>This code expires in 10 minutes.</p>
          <p>Best regards,<br>Robofly Team</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully:", result.messageId);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
};

// Send login OTP email (for admin login)
export const sendLoginOTPEmail = async (
  email: string,
  otp: string,
  name?: string
): Promise<boolean> => {
  try {
    const htmlContent = getEmailTemplate("loginOTP", {
      name: name || "Admin User",
      otp: otp,
    });

    if (!htmlContent) {
      // Fallback to simple HTML if template fails
      const fallbackHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #3b82f6; color: white; text-align: center; padding: 20px;">
            <h1>🔐 Admin Login Verification</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2>Hello ${name || "Admin User"}!</h2>
            <p>You are attempting to login to the Robofly Admin Dashboard. Please use the OTP below to complete your login:</p>
            <div style="background-color: #e0f2fe; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
              <h3>Your Login OTP:</h3>
              <div style="font-size: 32px; font-weight: bold; color: #1e40af; letter-spacing: 8px; margin: 15px 0; font-family: 'Courier New', monospace;">${otp}</div>
              <p><strong>This code expires in 10 minutes</strong></p>
            </div>
            <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin: 20px 0;">
              <strong>⚠️ Security Notice:</strong>
              <ul>
                <li>This OTP is for admin dashboard login verification</li>
                <li>Do not share this code with anyone</li>
                <li>If you didn't attempt to login, please contact IT support immediately</li>
              </ul>
            </div>
          </div>
        </div>
      `;

      const mailOptions = {
        from: process.env.SMTP_EMAIL_SENDER,
        to: email,
        subject: "Login OTP - Robofly Admin",
        html: fallbackHtml,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log(
        "Login OTP email sent successfully (fallback):",
        result.messageId
      );
      return true;
    }

    const mailOptions = {
      from: process.env.SMTP_EMAIL_SENDER,
      to: email,
      subject: "Login OTP - Robofly Admin",
      html: htmlContent,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Login OTP email sent successfully:", result.messageId);
    return true;
  } catch (error) {
    console.error("Error sending login OTP email:", error);
    return false;
  }
};
