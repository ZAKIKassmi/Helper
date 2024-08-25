"use server";
import { db } from "@/drizzle/db";
import { emailVerificationTable, userTable } from "@/drizzle/schema";
import { validateRequest } from "@/lib/auth";
import { rateLimitByIp } from "@/lib/limiter";
import { eq } from "drizzle-orm";
import { isWithinExpirationDate } from "oslo";


export async function verifyVerificationCode(_:any, formData: FormData): Promise<{error: string,isError:boolean}> {
  try{
    
    const {user} = await validateRequest();
    if(!user){
      return {
        error: "user not found",
        isError: true
      }
    }
    const checkLimit = await rateLimitByIp({key: user.id, window: 10000*360*5, limit: 20}) as {message: string, isError: boolean};
    if(checkLimit.isError){
      return{
        error: checkLimit.message,
        isError: true,
      }
    }
    
    try{
      const data = await db.select().from(emailVerificationTable).where(eq(emailVerificationTable.userId, user.id));
      if(data.length == 0 || data[0].code !== formData.get('code')){
        return {
          error: "Code do not match, please try again",
          isError: true
        }
      }
      try{
        await db.delete(emailVerificationTable).where(eq(emailVerificationTable.id,data[0].id));
      }
      catch{
        return {
          error: "Could not remove the email verification row",
          isError: true
        }
      }
      if(!isWithinExpirationDate(data[0].expiresAt)){
        return{
          error: "Code expired",
          isError: true
        }
      }

      if(user.email !== data[0].email){
        return{
          error: "Oops! Something went wrong. Please try again later.",
          isError: true
        }
      }
    }
    catch(e){
      return {
        error: "Could not find the verification code in the database",
        isError: true
      }
    }

    try{
      await db.update(userTable).set({emailVerified: true}).where(eq(userTable.id, user.id));
    }
    catch{
      return{
        isError: true,
        error: "Could not update the user email verification",
      }
    }
    //if everything is ok
    return{
      error: "Email has been verified.",
      isError: false
    }
  }
  catch(e){
    console.log(e);
    return {
      error: "user not found",
      isError: true
    }
  }
}
