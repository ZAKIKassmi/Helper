"use server";
import { db } from "@/drizzle/db";
import { passwordTokensTable, userTable } from "@/drizzle/schema";
import { lucia } from "@/lib/auth";
import { setSession } from "@/lib/session";
import { SetNewPasswordSchema } from "@/lib/types";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { isWithinExpirationDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import zxcvbn from "zxcvbn";



export async function resetPassword(_:any, formData: FormData):Promise<{message: string, isError: boolean}> {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  if(zxcvbn(password).score < 3){
    return {
      message: "Your password needs to be stronger.",
      isError: true,
    }
  }
  if(password !== confirmPassword){
    return{
      message: "Oops! The passwords you entered don't match.",
      isError: true,
    }
  }
  const token = formData.get('token') as string;
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));

  try{
    const dbToken = await db.select().from(passwordTokensTable).where(eq(passwordTokensTable.tokenHash, tokenHash));
    if(dbToken.length > 0){
      try{
        db.delete(passwordTokensTable).where(eq(passwordTokensTable.tokenHash, tokenHash));
      }
      catch{
        return{
          message: "could not delete token",
          isError: true
        }
      }
    }else{
      return {
        message: 'No valid token was found.',
        isError: true,
      }
    }
    if(!dbToken[0].tokenHash || !isWithinExpirationDate(dbToken[0].expiresAt)){
      return{
        message: "Token is no longer valid",
        isError: true,
      }
    }

    try{
      await lucia.invalidateUserSessions(dbToken[0].userId);
      const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
      });
      await db.update(userTable).set({password: passwordHash});
      await setSession(dbToken[0].userId);
    }
    catch{
      return {
        message: "Failed to create a session. Please try again later.",
        isError: true,
      }
    }
    return{
      message: "Your password has been successfully updated.",
      isError:false
    }
  }
  catch{
    return {
      message: "Oops! Something went wrong. Please try again later.",
      isError: true,
    }
  }
}