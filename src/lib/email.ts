import { mailOptions, transporter } from "./nodemailer";

type Props = {
  email: string;
  subject: string;
  firstName: string;
  lastName: string;
  isLink: boolean;
  code: string;

}

export function sendEmail({email, subject,firstName, lastName, isLink, code}:Props){
  // I have used setTimeout to defer the process of sending email by 3 seconds 
  // to improve the user experience by avoiding the 1-second delay in loading the verification page. 
  setTimeout(async()=>{
    await transporter.sendMail({
        ...mailOptions,
        to: email,
        subject,
        html: `
          <div className="flex flex-col items-center w-full h-screen justify-center gap-4">
            <h1>Hello ${firstName} ${lastName}</h1>
            <div>This is your ${isLink ? "rest link" : "verification code"}:<br> <strong>${code}</strong></div>
          </div>
        `,
    });
  },3000);
}