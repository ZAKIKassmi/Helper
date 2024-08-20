import { TimeSpan, createDate } from "oslo";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { generateIdFromEntropySize } from "lucia";
import { db } from "@/drizzle/db";
import { passwordTokensTable, userTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";



export async function generateResetPasswordToken(userId:string):Promise<{token: string | null}> {
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
      }
    }
    catch{
      return{
        token: null,
      }
    }
  }
  catch(e){
    return{
      token: null,
    }
  }
}