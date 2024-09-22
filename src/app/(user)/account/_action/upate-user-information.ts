"use server";
import { countriesCodes } from '@/data/countries';
import { db } from '@/drizzle/db';
import { userTable } from '@/drizzle/schema';
import { validateRequest } from '@/lib/auth';
import { TUserSchema, userSchema } from "@/lib/types";
import { eq, SQL } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { permanentRedirect } from 'next/navigation';
import { z } from 'zod';


type ChangedPropertiesType = Partial<{
  email: string | SQL<unknown>;
  firstName: string | SQL<unknown>;
  lastName: string | SQL<unknown>;
  phoneNumber: string | SQL<unknown>;
  province: string | SQL<unknown>;
  zip: string | SQL<unknown>;
  gender: 'Male' | 'Female' | SQL<unknown>;
  bloodType: number;
  countryCode: number;
  country: string;
}>;

export async function updateUserInformation(_: any, formData: FormData):
Promise<{message: string, isError:boolean}>{
  // Validate user session
  const { user } = await validateRequest();
  if (!user) {
    return {
      message: "Oops! Only logged-in users are allowed to perform this action",
      isError: true,
    };
  }

  const data: Partial<TUserSchema> = {
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    province: '',
    zip: '',
    bloodType: '',
    gender: undefined,
    country: '',
  };

  formData.forEach((value, key) => {
    if (key in data) {
      //@ts-ignore
      data[key as keyof Omit<TUserSchema, 'password' | 'confirmPassword' | 'picture' | 'dateOfBirth'>] = value as string;
    }
  });

  // Track changed properties
  const changedProperties: ChangedPropertiesType = {};
  for (const key in data) {
    //Check if the value changed first
    if (data[key as keyof typeof data] !== '') {
      //bloodType and country have in db the id that reference the full country and bloodtype infos
      //id is an integer. Therefore, we have to handle those cases seperatly. 

      if(key === "bloodType"){
        changedProperties["bloodType"] = Number(data[key as keyof typeof data]);
      }
      else if(key === 'country'){
        const countryObject = countriesCodes.find((c)=>data[key] === c.name);
        if(countryObject){
          changedProperties.countryCode = Number(countryObject.id);
        }
        else{
          return{
            message: "There is no country with this name.",
            isError: true,
          }
        }
      }
      else{
        changedProperties[key as keyof ChangedPropertiesType] = data[key as keyof typeof data];
      }
    }
  }
  console.log(data);
  if (Object.keys(changedProperties).length === 0) {
    return { message: 'No changes detected', isError: false };
  }

  // Dynamically create a Zod schema based on the changed properties
  const dynamicSchema = z.object(
    Object.keys(changedProperties).reduce((acc, key) => {
      if (key === "bloodType") {
        // Transform string to number before validation
        acc[key] = z.number();
      } else {
        acc[key] = userSchema.shape[key as keyof TUserSchema]; // Use the shape from the main user schema
      }
      return acc;
    }, {} as Record<string, z.ZodType<any>>)
  );


  // Validate the changed properties
  const result = dynamicSchema.safeParse(changedProperties);
  if (!result.success) {
    return { message: 'Validation failed', isError: true };
  }


  // Perform the database update with validated changed properties
  try{
    await db.update(userTable).set(changedProperties).where(eq(userTable.id, user.id));
    revalidatePath('/account');
    return{
      message: "Data has been updated successfully",
      isError: false,
    }
  }
  catch(e){
    return{
      message: "Oops! something went wrong while updating the user data.",
      isError: true,
    }
  }

  // return { message: 'User information updated successfully', updatedFields: changedProperties };
}
