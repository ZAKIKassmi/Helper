"use server";
import { db } from "@/drizzle/db";
import { emailVerificationTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";

import { mailOptions, transporter } from "@/lib/nodemailer";

export default async function generateEmailVerificationCode(userId: string, email: string): Promise<string> {
    const code = generateRandomString(8, alphabet("0-9"));
    
    try {
        // Perform deletion and insertion concurrently
        const deleteOldCode = db.delete(emailVerificationTable).where(eq(emailVerificationTable.userId, userId));
        const insertNewCode = db.insert(emailVerificationTable).values({
            userId,
            email,
            code,
            expiresAt: createDate(new TimeSpan(15, "m")),
        });

        await Promise.all([deleteOldCode, insertNewCode]);

        // Send email (consider deferring this operation)
        setTimeout(async()=>{
            const info = await transporter.sendMail({
                ...mailOptions,
                to: email,
                subject: 'Helper Code Verification',
                html: `
                  <div className="flex flex-col items-center w-full h-screen justify-center gap-4">
                    <h1>Hello</h1>
                    <div>This is your verification code: <strong>${code}</strong></div>
                  </div>
                `,
            });
        },2000)
        

        return code;
    } catch (e) {
        console.error('Error during email verification code generation:', e);
        return 'Could not generate code';
    }
}
