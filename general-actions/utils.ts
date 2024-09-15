"use server";

import { db } from "@/drizzle/db";
import { bloodBanks, certifications, facilityDetails, workingDaysHours } from "@/drizzle/schema";
import { validateBloodBankRequest, validateRequest } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getUser = cache(async()=>{
  const {user} = await validateRequest();
  if(!user){
    return null;
  }
})


export const getBloodBank = cache(async()=>{
  //DAL
  const {user} =  await validateBloodBankRequest();
  if(!user){
    return null;
  }

  const res = await db.select({
    name: bloodBanks.name,
    email: bloodBanks.email,
    address: bloodBanks.address,
    country: bloodBanks.country,
  }).from(bloodBanks).where(eq(bloodBanks.id, user.id));

  // const facility = db.select().from(facilityDetails).where(eq(facilityDetails.bloodBankId, user.id));
  // const workingTimes = db.select().from(workingDaysHours).where(eq(workingDaysHours.bloodBankId,user.id));
  // const license = db.select().from(certifications).where(eq(certifications.bloodBankId, user.id));



  return{
    ...res[0]
  }

})