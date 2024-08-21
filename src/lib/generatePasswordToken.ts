import { TimeSpan, createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/drizzle/db";
import { passwordTokensTable, userTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";



export async function generateResetPasswordToken(userId:string):Promise<{token: string | null, message: string, isError: boolean}> {
  const defaultResult = {
    token: null,
    message: "We'll send a reset email if the account exists",
    isError: false,
  }
  try{
    await db.delete(passwordTokensTable).where(eq(passwordTokensTable.userId, userId));
    try{
      const token = generateIdFromEntropySize(25);
      const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)));
      await db.insert(passwordTokensTable).values({
        tokenHash,
        userId: userId,
        expiresAt: createDate(new TimeSpan(2, "h")),
      });
      return{
        token,
        message: "We'll send a reset email if the account exists",
        isError: false
      }
    }
    catch{
      return {
        ...defaultResult,
        message: "Oops! Something went wrong. Please try again.",
        isError: true,
      };
    }
  }
  catch{
    return defaultResult;
  }
}