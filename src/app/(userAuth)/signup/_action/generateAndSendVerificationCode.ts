"use server";
import { db } from "@/drizzle/db";
import { bloodBanks, emailVerificationTable, userTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { sendEmail } from "@/lib/email";

export default async function generateEmailVerificationCode(userId: string, email: string, type: "user" | "bloodBank"): Promise<{isError: boolean, isToast: boolean, errorMessage: string}> {
    const code = generateRandomString(8, alphabet("0-9"));
    
    try {
        //We need to check the type, because in the db we have blooBankId and userId.
        //if it's a user then we delete and insert based on the userId column,
        // otherwise we use bloodBankId.
        const deleteOldCode = db.delete(emailVerificationTable).where(eq(
            type == "user" ? 
            emailVerificationTable.userId : emailVerificationTable.bloodBankId, userId));
        const insertNewCode = db.insert(emailVerificationTable).values({
            userId: type=='user' ? userId : null,
            bloodBankId: type=="bloodBank" ? userId: null,
            email,
            code,
            expiresAt: createDate(new TimeSpan(5, "m")),
        });
        const getUser = db.select().from(userTable).where(eq( userTable.id, userId));
        const getBloodBank = db.select().from(bloodBanks).where(eq(bloodBanks.id, userId));
        if(type=="user"){
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
        }
        else{
            const res = await Promise.all([deleteOldCode, insertNewCode, getBloodBank]);
            const emailDetails = {
                email,
                subject: "Helper Email Verification Code",
                name: res[2][0].name,
                isLink: false,
                code,
    
            } 
            await sendEmail(emailDetails);
        }
        
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
