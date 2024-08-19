"use server";
import { mailOptions, transporter } from "@/lib/nodemailer";

type Props ={
  email: string;
  verificationCode: string;
}


export async function sendVerificationCode({ email, verificationCode }: Props) {
  try {
    const info = await transporter.sendMail({
      ...mailOptions,
      to: email,
      subject: 'Helper Code Verification',
      text: `Your code is: ${verificationCode}`,
    });
    console.log('Email sent:', info.response);
  } catch (e) {
    console.log('Could not send email: ', e);
  }
}