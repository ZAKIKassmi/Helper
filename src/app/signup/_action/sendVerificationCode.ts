"use server";
import { mailOptions, transporter } from "@/lib/nodemailer";

type Props ={
  email: string;
  verificationCode: string;
  firstName: string;
  lastName: string;
}


export async function sendVerificationCode({firstName, lastName, email, verificationCode }: Props) {
  try {
    const info = await transporter.sendMail({
      ...mailOptions,
      to: email,
      subject: 'Helper Code Verification',
      html: `
        <div className="flex flex-col items-center w-full h-screen justify-center gap-4">
          <h1>Hello ${firstName} ${lastName}</h1>
          <div>This is your verification code: <strong>${verificationCode}</strong> </div>
        </div>
      `
    });
    console.log('Email sent:', info.response);
  } catch (e) {
    console.log('Could not send email: ', e);
  }
}