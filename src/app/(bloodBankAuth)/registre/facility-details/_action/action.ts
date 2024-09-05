"use server";
import generateEmailVerificationCode from "@/app/(userAuth)/signup/_action/generateAndSendVerificationCode";
import { countriesCodes } from "@/data/countries";
import { db } from "@/drizzle/db";
import { bloodBanks, facilityDetails } from "@/drizzle/schema";
import { validateBloodBankRequest } from "@/lib/auth";
import { setBloodBankSession, setSession } from "@/lib/session";
import { BloodBankFacilityNameTypes, BloodBankSchema, facilityDetailsSchema } from "@/lib/types";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";



export async function addFacilityDetails(_:any, formData: FormData):Promise<{name: BloodBankFacilityNameTypes, errorMessage: string, isToast: boolean,isError:boolean}[]> {


  const donationBeds = formData.get('donationBeds') as unknown as number;
  const capacity = formData.get('capacity') as unknown as number;
  const emergencyContact = formData.get('emergencyContact') as string;

  const result = facilityDetailsSchema.safeParse({
    donationBeds,
    capacity,
    emergencyContact,
  });
  
  let errors: {name:  BloodBankFacilityNameTypes, errorMessage: string, isToast:boolean, isError: boolean}[] = [];

  if(!result.success){
    result.error.issues.forEach((issue)=>{
        errors = [...errors, {name: issue.path[0] as BloodBankFacilityNameTypes, errorMessage: issue.message,isToast: false, isError: true}]
    });
    return errors;
  }

  const {user} = await validateBloodBankRequest();

  if(!user){
    return [
      {
        name: "capacity",
        isToast: true,
        isError: true,
        errorMessage: "Blood bank not found"
      }
    ]
  }

  

  try{
    await db.insert(facilityDetails).values({
      numberOfBeds: donationBeds,
      capacity: capacity,
      emergencyContact: emergencyContact,
      bloodBankId: user.id,
    })
  }
  catch(e){
    return[
      {
        name: "capacity",
        errorMessage: `Oops! could not insert facility details. ${e}`,
        isToast: true,
        isError: true,
      }
    ]
  }

  return [
    {
      name: "capacity",
      errorMessage: "Facility details have been successfully registered.",
      isError: false,
      isToast: true,
    }
  ]
}