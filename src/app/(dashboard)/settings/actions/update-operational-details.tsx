"use server";
import { validateBloodBankRequest } from "@/lib/auth";
import { DaysType, TOperaionalDaysSchema } from "@/lib/types";
import { db } from "@/drizzle/db";
import { workingDaysHours } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";





export async function UpdateOperationalDetails(_:any, formData: FormData):Promise<{name: keyof TOperaionalDaysSchema, errorMessage: string, isToast: boolean,isError:boolean}[]> {

  const data = JSON.parse(formData.get('changedDays') as string);

  const {user} = await validateBloodBankRequest();

  if(!user){
    return [
      {
        name: "FridayEndsAt",
        isToast: true,
        isError: true,
        errorMessage: "Only authenticated blood banks are authorized to make this request."
      }
    ]
  }
  
  try{
    const promises:any = [];
    data.forEach((day:{id: number, day: DaysType, isWorking: boolean, endsAt: string, startsAt: string})=>{
      promises.push(db.update(workingDaysHours).set({
        isWorking: day.isWorking,
        endsAt: day.endsAt,
        startsAt: day.startsAt,
      }).where(eq(workingDaysHours.id, day.id)))
    });

    await Promise.all(promises);
    revalidatePath('/settings');
    return [
      {
        name: "FridayEndsAt",
        isToast: true,
        isError: false,
        errorMessage: "The operating days and hours have been successfully updated."
      }
    ]
  }
  catch(e){
    return [
      {
        name: "FridayEndsAt",
        isToast: true,
        isError: true,
        errorMessage: "Oops! Something went wrong while update values. Please try again later."
      }
    ]
  }

}