import { mailOptions, transporter } from "./nodemailer";
import {Worker} from "bullmq";

type Props = {
  email: string;
  subject: string;
  firstName?: string;
  lastName?: string;
  isLink: boolean;
  code: string;
  name?: string;
}

export function sendEmail({email, subject,firstName, lastName,name, isLink, code}:Props){
  // I have used setTimeout to defer the process of sending email by 3 seconds 
  // to improve the user experience by avoiding the 1-second delay in loading the verification page. 


  //TODO: Improve UI
  setTimeout(async()=>{
    await transporter.sendMail({
        ...mailOptions,
        to: email,
        subject,
        html: `
          <div style="display: flex; flex-direction: column; width: 100%; justify-content: center; align-items: center;">
            <div style="max-width: 500px; width: 100%; padding: 16px; margin: 16px auto; ">
              <h1 style="font-size: 24px; font-weight: bold; color: #EF4444; text-align: center;">
                Helper*
              </h1>
              <div style="margin-bottom: 24px;">
                <h2 style="font-size: 20px; font-weight: 600; color: #1F2937; margin-bottom: 8px;">
                  Hello ${firstName} ${lastName} ${name},
                </h2>
                <p>You have been registered to Helper successfully. Here is your ${isLink ? "reset link" : "verification code"}:</p>
              </div>
              ${
                isLink ? `
                  <a href="${code}" target="_blank" style="display: block; text-align: center; margin-bottom: 24px;">
                    <button style="background-color: #1F2937; color: white; padding: 10px 20px; border: none; cursor: pointer; font-size: 16px;">
                      Reset Password
                    </button>
                  </a>
                ` : `
                  <p style="padding: 8px 16px; border-radius: 4px; background-color: #1F2937; color: white; text-align: center; width: fit-content; margin: 0 auto;">
                    ${code}
                  </p>
                `
              }
            </div>
          </div>
        `,
    });
  },1500);
}



