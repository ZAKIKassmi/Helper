"use server";
import generateEmailVerificationCode from "@/app/(userAuth)/signup/_action/generateAndSendVerificationCode";
import { countriesCodes } from "@/data/countries";
import { db } from "@/drizzle/db";
import { bloodBanks } from "@/drizzle/schema";
import { setBloodBankSession } from "@/lib/session";
import { BloodBankNameType, BloodBankSchema, TBloodBankSchema } from "@/lib/types";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";



export async function AddBasicInformation(_:any, formData: FormData):Promise<{name: BloodBankNameType, errorMessage: string, isToast: boolean,isError:boolean}[]> {
  const name = formData.get('name') as string;
  const email = (formData.get('email') as string).trim().toLowerCase();
  const password = (formData.get('password') as string).trim();
  const confirmPassword = (formData.get('confirmPassword') as string).trim();
  const address = formData.get('address') as string;
  const country = formData.get('country');
  const zip = formData.get('zip') as string;
  const province = formData.get('province') as string;


  

  if(password !== confirmPassword){
    return [
      {
        name: "confirmPassword",
        errorMessage: "Oops! Passwords do not match.",
        isToast: true,
        isError: true,
      }
    ]
  }
  const result = BloodBankSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
    address,
    country,
    zip,
    province
  });

  const countryObject = countriesCodes.find((c)=>country === c.name);

  let errors: {name:  BloodBankNameType, errorMessage: string, isToast:boolean, isError: boolean}[] = [];

  if(!result.success){
    result.error.issues.forEach((issue)=>{
        errors = [...errors, {name: issue.path[0] as BloodBankNameType, errorMessage: issue.message,isToast: false, isError: true}]
    });
    return errors;
  }

  try{
    const result = await db.select().from(bloodBanks).where(eq(bloodBanks.email, email));
    if(result.length > 0){
      return [{
        name: "email",
        errorMessage: "Oops! Something went wrong.",
        isToast: true,
        isError: true,
      }]
    }
  }
  catch(e:any){
    return [{
      name: "email",
      errorMessage: `Oops! Something went wrong: ${e}`,
      isToast: true,
      isError: true,
    }];
  }


  let hashedPassword = '';
  try{
      hashedPassword = await hash(password,{
          memoryCost: 19456,
          timeCost: 2,
          outputLen: 32,
          parallelism: 1
      });
  }
  catch(e){
      return[{
          name: 'confirmPassword',
          isError: true,
          isToast: true,
          errorMessage: "Oops! faild to hash password."
      }];
  }

  try{
    const bloodBank = await db.insert(bloodBanks).values({
      name,
      email,
      emailVerified: false,
      password: hashedPassword,
      address,
      country: countryObject!.id,
      latitude: 34.261000,
      longitude: -6.580200,
      zip,
      province,
    }).returning({
      id: bloodBanks.id
    });

    const {isError, isToast, errorMessage} = await generateEmailVerificationCode(bloodBank[0].id, email, "bloodBank");
    if(isError){
        return [{name: "confirmPassword", isToast, errorMessage,isError}];
    }
    
    try{
      await setBloodBankSession(bloodBank[0].id);
    }
    catch{
      return[{
        isError: true,
        isToast: true,
        errorMessage: "Oops! Could not set the session",
        name: 'name'
      }]
    }
  }
  catch(e){
    return [
      {
        name: "email",
        errorMessage: `Oops! could not insert the user. ${e}`,
        isError: true,
        isToast: true,
      }
    ]
  }

  
  return [
    {
      name: "name",
      errorMessage: "We've sent a verification code to the email",
      isError: false,
      isToast: true,
    }
  ]
}