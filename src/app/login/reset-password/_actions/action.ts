"use server";
import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { sendEmail } from "@/lib/email";
import { generateResetPasswordToken } from "@/lib/generatePasswordToken";
import { eq } from "drizzle-orm";



export async function resetPasswordLink(_:any,formData: FormData): Promise<{message: string,isError:boolean}> {
  const email = formData.get('email') as string;
  const defaultResult = {
    message: "We'll send a reset email if the account exists",
    isError: false,
  }
  try{
    const user = await db.select().from(userTable).where(eq(userTable.email,email));
    if(user.length == 0){
      return defaultResult;
    }

    const {token, message, isError} = await generateResetPasswordToken(user[0].id);
    if(!token){
      return {
        message,
        isError
      }
    }
    //TODO: Change it to the domaine name in production
    const verificationLink = "http://localhost:3000/login/reset-password/" + token;
    const emailDetails = {
      email,
      subject: "Helper Password Reset Link",
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      isLink: true,
      code: verificationLink,

  } 
    try{
      await sendEmail(emailDetails);
    }
    catch{
      return defaultResult;
    }
    return {...defaultResult, message: "We have sent a link to your email"};
  }
  catch{
    return defaultResult;
  }
}