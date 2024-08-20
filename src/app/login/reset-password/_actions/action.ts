"use server";

import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { generateResetPasswordToken } from "@/lib/generatePasswordToken";
import { eq } from "drizzle-orm";




export async function resetPasswordLink(formData: FormData){
  const email = formData.get('email') as string;
  try{
    const user = await db.select().from(userTable).where(eq(userTable.email,email));
    if(user.length == 0){
      return {
        message: "We'll send a reset email if the account exists",
        isError: false,
      }
    }

    const {token} = await generateResetPasswordToken(user[0].id);
    if(!token){
      return {
        message: "We'll send a reset email if the account exists",
        isError: false,
      }
    }
    
  }
  catch(e){
    console.log(e);
  }
}