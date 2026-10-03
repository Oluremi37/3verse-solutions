import { sendEmail as smtpSendEmail } from "../services/emailService.js";

const sendEmail = async ({ to, subject, html, text }) => {
  return smtpSendEmail({
    to,
    subject,
    html,
    text,
  });
};

export default sendEmail;
