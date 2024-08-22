"use server";
import { db } from "@/drizzle/db";
import { emailVerificationTable, userTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { sendEmail } from "@/lib/email";

export default async function generateEmailVerificationCode(userId: string, email: string): Promise<{isError: boolean, isToast: boolean, errorMessage: string}> {
    const code = generateRandomString(8, alphabet("0-9"));
    
    try {
        // Perform deletion and insertion concurrently
        const deleteOldCode = db.delete(emailVerificationTable).where(eq(emailVerificationTable.userId, userId));
        const insertNewCode = db.insert(emailVerificationTable).values({
            userId,
            email,
            code,
            expiresAt: createDate(new TimeSpan(5, "m")),
        });
        const getUser = db.select().from(userTable).where(eq(userTable.id, userId));
        const res = await Promise.all([deleteOldCode, insertNewCode, getUser]);
        const emailDetails = {
            email,
            subject: "Helper Email Verification Code",
            firstName: res[2][0].firstName,
            lastName: res[2][0].lastName,
            isLink: false,
            code,

        } 
        await sendEmail(emailDetails);
        
        return {
            isError: false,
            errorMessage: "We have send a verification code to your email",
            isToast: true,
        }
    }
    catch{
        return {
            isError: true,
            errorMessage: "Oops! Something went wrong while generating the verification code",
            isToast: true,
        };
    }
}
