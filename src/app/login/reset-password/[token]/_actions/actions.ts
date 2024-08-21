"use server";
import { db } from "@/drizzle/db";
import { passwordTokensTable, userTable } from "@/drizzle/schema";
import { lucia } from "@/lib/auth";
import { SetNewPasswordSchema } from "@/lib/types";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { isWithinExpirationDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";



export async function resetPassword(_:any, formData: FormData):Promise<{message: string, isError: boolean}> {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmePassword') as string;
  const result = SetNewPasswordSchema.safeParse({password, confirmPassword});
  if(!result.success){
    return{
      message: "Oops! The passwords you entered don't match.",
      isError: true,
    }
  }

  const token = formData.get('token') as string;
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));

  try{
    const dbToken = await db.select().from(passwordTokensTable).where(eq(passwordTokensTable.tokenHash, tokenHash));
    console.log(`this is the db token: ${dbToken[0].tokenHash}\n this is the hashedToke: ${tokenHash}`);
    if(dbToken.length > 0){
      try{
        db.delete(passwordTokensTable).where(eq(passwordTokensTable.tokenHash, tokenHash));
      }
      catch{
        return{
          message: "could not delete user",
          isError: true
        }
      }
    }else{
      return {
        message: 'No token was found',
        isError: true,
      }
    }
    if(!dbToken[0].tokenHash || !isWithinExpirationDate(dbToken[0].expiresAt)){
      return{
        message: "Token has expired",
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

      const session = await lucia.createSession(dbToken[0].userId,{});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
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
  catch(e){
    console.log(e);
    return {
      message: "Oops! Something went wrong. Please try again later.",
      isError: true,
    }
  }
}