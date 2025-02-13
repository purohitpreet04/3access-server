import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config()

/**
 * @param {Object} options - Mail options.
 * @param {string} options.from - Sender email address.
 * @param {string} options.to - Recipient email address.
 * @param {string} options.subject - Email subject.
 * @param {string} options.text - Plain text body of the email.
 * @param {string} options.html - HTML body of the email (optional).
 * @param {Array} options.attachments - Array of attachment objects (optional).
 * @param {string} options.cc - CC recipients (optional).
 * @param {string} options.replyTo - Reply-to address (optional).
 * @param {string} options.bcc - BCC recipients (optional).
 * @returns {Promise} - Resolves if the email is sent successfully, rejects otherwise.
 */

const sendMail = async ({ from, to, subject, text, html, attachments = [], cc, replyTo, bcc }) => {
  // Validate required fields
  if (!subject) {
    // console.error('Missing required email fields');
    return { success: false, message: 'Required fields missing (subject)' };
  }

  try {
  
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Mail options
    const mailOptions = {
      from, 
      to,
      subject,
      text,
      html,
      attachments,
      cc,
      bcc,
      replyTo
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    // console.error('Error sending email:', error);
    return { success: false, message: 'Error sending email', error };
  }
};

export default sendMail;
