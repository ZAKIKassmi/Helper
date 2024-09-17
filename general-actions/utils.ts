import { eligibilityConditions } from '@/lib/constants';
"use server";

import { db } from "@/drizzle/db";
import { appointments, bloodBanks, bloodTypes, certifications, countries, facilityDetails, userTable, workingDaysHours } from "@/drizzle/schema";
import { validateBloodBankRequest, validateRequest } from "@/lib/auth";
import { and, asc, eq, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getUser = cache(async()=>{
  const {user} = await validateRequest();
  if(!user){
    return null;
  }
})


export const  getBasicInformation = cache(async()=>{
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


export const getFacilityDetails = cache(async()=>{
  const {user} = await validateBloodBankRequest();
  if(!user){
    return null;
  }
  const res = await db.select().from(facilityDetails).where(eq(facilityDetails.bloodBankId, user.id));
  return res[0];
});


export const getAllBloodBankInformation = (async()=>{
  const {user} = await validateBloodBankRequest();
  if(!user){
    return null;
  }

  try{
    const res = await db.select({
      id: bloodBanks.id,
      address: bloodBanks.address,
      name: bloodBanks.name,
      email: bloodBanks.email,
      country: countries.countryName,
      availableBeds: facilityDetails.numberOfBeds,
      dailyDonorsNeeded: facilityDetails.capacity,
      emergencyContact: facilityDetails.emergencyContact,
      dialCode: countries.dialCode,
      zip: bloodBanks.zip,
      province: bloodBanks.province,
      operationalDetails: sql`json_agg(json_build_object(
        'id', working_days_hours.id,
        'day', working_days_hours.day,
        'isWorking', working_days_hours.is_working,
        'startsAt', working_days_hours.starts_at,
        'endsAt', working_days_hours.ends_at
      ))`.as('operationalDetails'),
    })
    .from(bloodBanks)
    .innerJoin(countries, eq(countries.id, bloodBanks.country))
    .innerJoin(facilityDetails, eq(facilityDetails.bloodBankId, user.id))
    .innerJoin(workingDaysHours, eq(workingDaysHours.bloodBankId, user.id)) 
    .innerJoin(certifications, eq(certifications.bloodBankId, user.id))
    .where(eq(bloodBanks.id, user.id))
    .groupBy(
      bloodBanks.id,
      countries.countryName,
      countries.dialCode,
      facilityDetails.numberOfBeds,
      facilityDetails.capacity,
      facilityDetails.emergencyContact,
    );
    return res[0];
  }
  catch(e){
    throw new Error("Oops! Something went wrong");
  }




})