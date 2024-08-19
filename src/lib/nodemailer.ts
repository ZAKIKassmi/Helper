import "dotenv/config";
import nodemailer from 'nodemailer';


const senderEmail = process.env.EMAIL;
const pass = process.env.EMAIL_PASSWORD;

export function showEnv(){
  console.log(`${senderEmail}, ${pass}`);
}

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