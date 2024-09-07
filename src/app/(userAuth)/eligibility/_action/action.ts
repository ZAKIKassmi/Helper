"use server";

import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { validateRequest } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function updateEligibiliye(_:any, formData: FormData):Promise<{isError: boolean, message: string}> 
{
  const isEligible = formData.get('isEligible') === 'true';
  const {user} = await validateRequest();
  if(!user){
    return{
      isError: true,
      message: "User not found",
    }
  }
  if(isEligible){
    await db.update(userTable).set({
      isEligible: true,
    }).where(eq(userTable.id, user.id))
  }
  return{
    isError: false,
    message: 'Eligibility check has been completed.',
  }
}