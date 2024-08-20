import "dotenv/config";
import nodemailer from 'nodemailer';


const senderEmail = process.env.EMAIL;
const pass = process.env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: senderEmail,
    pass,
  },
});

export const mailOptions = {
  form: senderEmail,
}