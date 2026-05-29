import nodemailer from "nodemailer";

export const sendOtpMail = async (email: string, code: string) => {
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.info(`Pathwise verification OTP for ${email}: ${code}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? "Pathwise <no-reply@pathwise.local>",
    to: email,
    subject: "Verify your Pathwise account",
    html: `<div style="font-family:Inter,Arial,sans-serif"><h2>Your Pathwise OTP</h2><p>Use this code to verify your email:</p><p style="font-size:28px;font-weight:700;letter-spacing:8px">${code}</p><p>This code expires in 10 minutes.</p></div>`,
  });
};
