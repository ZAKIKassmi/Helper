"use server";

import { facilityDetails } from "@/drizzle/schema";
import { validateBloodBankRequest } from "@/lib/auth";
import { TFacilityDetails } from "@/lib/types";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";



export async function updateFacilityDetails(_:any, formData: FormData):Promise<{name: keyof TFacilityDetails, errorMessage: string, isToast: boolean,isError:boolean}[]> {

  const {user} = await validateBloodBankRequest();

  if(!user){
    return[{
      name: "capacity",
      isToast: true,
      isError: true,
      errorMessage: "Only logged in blood centers are allowed to perform this action."
    }]
  }

  try{
    await db.update(facilityDetails).set({
      capacity: formData.get('capacity') as unknown as number,
      numberOfBeds: formData.get('beds') as unknown as number,
      emergencyContact: formData.get('contact') as string,
    }).where(eq(facilityDetails.bloodBankId, user.id))
  }
  catch{
    return[{
      name: "capacity",
      isToast: true,
      isError: false,
      errorMessage: "Something went wrong while updating the data.",
    }]
  }

  revalidatePath("/settings");
  return[{
    name: "capacity",
    isToast: true,
    isError: false,
    errorMessage: "Data has been successfully updated.",
  }]
}