"use server";
import generateEmailVerificationCode from "@/app/(userAuth)/signup/_action/generateAndSendVerificationCode";
import { countriesCodes } from "@/data/countries";
import { db } from "@/drizzle/db";
import { bloodBanks, facilityDetails, workingDaysHours } from "@/drizzle/schema";
import { validateBloodBankRequest } from "@/lib/auth";
import { setBloodBankSession, setSession } from "@/lib/session";
import { BloodBankFacilityNameTypes, BloodBankSchema, DaysType, facilityDetailsSchema, OperationalDaysSchema, TOperaionalDaysSchema } from "@/lib/types";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";


type OperationalNameTypes = keyof TOperaionalDaysSchema;

export async function addOperationalDetails(_:any, formData: FormData):Promise<{name: OperationalNameTypes, errorMessage: string, isToast: boolean,isError:boolean}[]> {

  const data:any = {};

  for(const [key, value] of formData.entries()){
    if(value !== 'false' && value!== 'true'){
      data[key as OperationalNameTypes] = value as any;  
    }
    else{
      data[key as OperationalNameTypes] = value === "true";  
    }
  }

  const result = OperationalDaysSchema.safeParse(data);
  let errors: {name:  OperationalNameTypes, errorMessage: string, isToast:boolean, isError: boolean}[] = [];
  
  if(!result.success){
    result.error.issues.forEach((issue)=>{
        errors = [...errors, {name: issue.path[0] as OperationalNameTypes, errorMessage: issue.message,isToast: false, isError: true}]
    });
    return errors;
  }

  const {user} = await validateBloodBankRequest();

  if(!user){
    return [
      {
        name: "FridayEndsAt",
        isToast: true,
        isError: true,
        errorMessage: "Blood bank not found"
      }
    ]
  }

  const daysOfWeek:DaysType[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const insertPromises = daysOfWeek.map(day => (
    db.insert(workingDaysHours).values({
      day,
      isWorking: data[`${day}Switch`] as boolean,
      endsAt: data[`${day}EndsAt`] as string,
      startsAt: data[`${day}StartAt`] as string,
      bloodBankId: user.id,
    })
  ));

  
  try{
    await Promise.all(insertPromises);

  }
  catch(e){
    console.log(e);
    return [{
      name: "FridayEndsAt",
      errorMessage: "An error occurred while saving operational days.",
      isError: true,
      isToast: true
    }];
  }
    

  return [
    {
      name: "FridayEndsAt",
      errorMessage: "Operational days have been successfully registered.",
      isError: false,
      isToast: true,
    }
  ]
}