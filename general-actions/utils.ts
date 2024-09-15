"use server";

import { db } from "@/drizzle/db";
import { appointments, bloodBanks, bloodTypes, certifications, facilityDetails, userTable, workingDaysHours } from "@/drizzle/schema";
import { validateBloodBankRequest, validateRequest } from "@/lib/auth";
import { asc, eq, sql } from "drizzle-orm";
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

});


export const getbloodBankAppointments = cache(async()=>{
  const {user} = await validateBloodBankRequest();
  if(!user){
    return null;
  }
  const res = await db.select({
    id: userTable.id,
    donationTime: sql<string>`SUBSTRING(${appointments.appointmentTime}::text FROM 1 FOR 5)`,
    date: appointments.appointmentDate,
    fullName: sql<string>`concat(${userTable.firstName}, ' ', ${userTable.lastName})`,
    email: userTable.email,
    phone: userTable.phoneNumber,
    gender: userTable.gender,
    address: userTable.address,
    dateOfBirth: userTable.dateOfBirth,
    bloodType: bloodTypes.bloodTypeName,
    capacity: facilityDetails.capacity,
    })
    .from(appointments).where(eq(appointments.bloodBankId, user.id))
    .innerJoin(userTable, eq(appointments.userId, userTable.id))
    .orderBy(asc(appointments.appointmentTime))
    .innerJoin(bloodTypes, eq(userTable.bloodType, bloodTypes.id))
    .innerJoin(facilityDetails,eq(facilityDetails.bloodBankId, user.id));
    ;
  return res;
});