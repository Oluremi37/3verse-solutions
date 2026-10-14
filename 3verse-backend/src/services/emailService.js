import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Try SSL port
  secure: true, // Required for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4, // Force IPv4
  connectionTimeout: 20000,
  greetingTimeout: 15000,
  socketTimeout: 30000,
});

export const sendEmail = async ({ to, subject, html, text }) => {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  });
};

export default transporter;
