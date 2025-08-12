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

// Send user created email
export const sendUserCreatedEmail = async (
  userEmail: string,
  username: string,
  password: string
) => {
  try {
    const htmlContent = getEmailTemplate("userCreated", {
      username,
      password,
      loginUrl: `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/robofly-admin`,
    });

    if (!htmlContent) {
      throw new Error("Failed to load email template");
    }

    const mailOptions = {
      from: process.env.SMTP_EMAIL_SENDER,
      to: userEmail,
      subject: "Your Robofly Admin Account Has Been Created",
      html: htmlContent,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("User created email sent successfully:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending user created email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Send password updated email
export const sendPasswordUpdatedEmail = async (
  userEmail: string,
  username: string,
  newPassword: string
) => {
  try {
    const htmlContent = getEmailTemplate("passwordUpdated", {
      username,
      newPassword,
      loginUrl: `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/robofly-admin`,
    });

    if (!htmlContent) {
      throw new Error("Failed to load email template");
    }

    const mailOptions = {
      from: process.env.SMTP_EMAIL_SENDER,
      to: userEmail,
      subject: "Your Robofly Admin Password Has Been Updated",
      html: htmlContent,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Password updated email sent successfully:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending password updated email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
