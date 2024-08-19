"use server";
import { db } from "@/drizzle/db";
import { emailVerificationTable, userTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate } from "oslo";
import {generateRandomString, alphabet} from "oslo/crypto";

export default async function generateEmailVerificationCode(userId: string, email:string):Promise<string> {
    try{
      await db.delete(emailVerificationTable).where(eq(emailVerificationTable.userId, userId));
      const code = generateRandomString(6, alphabet("0-9","A-Z"));
      try{
        await db.insert(emailVerificationTable).values({
          userId,
          email,
          code,
          expiresAt: createDate(new TimeSpan(15, 'm')),
        });
        return code;
      } 
      catch{
        console.log("Could not insert the user email verification");
      }
    }
    catch{  
      console.log('Could not delete user');
    }
    return Promise.resolve('Could not generate code');
}


