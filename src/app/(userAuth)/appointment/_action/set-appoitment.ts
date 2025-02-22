"use server";
import { db } from "@/drizzle/db";
import { appointments, bloodBanks } from "@/drizzle/schema";
import { validateRequest } from "@/lib/auth";
import { getGapInDay } from "@/lib/get-gap-in-days";
import { appointmentSchema, TAppointmentSchema } from "@/lib/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import emailQueue from "@/lib/email-reminder-queue-and-worker";



export async function setAppointment(_:any, formData:FormData):Promise<{name: keyof TAppointmentSchema, message: string, isToast: boolean,isError:boolean}[]>{
  const bloodBank = formData.get('bloodBank') as string;
  const date = new Date(formData.get('date') as string).toISOString().split('T')[0];
  const time = formData.get('time') as string;
  const interval = formData.get('interval') as unknown as number;

  
  

  const {user} = await validateRequest();
  if(!user){
    return[{
      message: "You must be logged in to take an appointment",
      isError: true,
      isToast: true,
      name: "bloodBank",
    }]
  }
  

  const result = appointmentSchema.safeParse({
    bloodBank,
    date,
    time,
    interval,
  });
  let errors: {name:  keyof TAppointmentSchema, message: string, isToast:boolean, isError: boolean}[] = [];
  if(!result.success){
    result.error.issues.forEach((issue)=>{
        errors = [...errors, {name: issue.path[0] as keyof TAppointmentSchema, message: issue.message,isToast: false, isError: true}]
    });
    return errors;
  }


  try{
    const res = await db.select().from(bloodBanks).where(eq(bloodBanks.name, bloodBank));
    if(res.length === 0){
      return[{
        message: "We could not find a blood bank with the name you provided.",
        isError: true,
        isToast: true,
        name: "bloodBank"
      }]
    }

    try{
      const gapInDays = getGapInDay(Number(interval));
      let currentDate = new Date(date);
      const appointmentsPromise = [];

      appointmentsPromise.push(
        db.insert(appointments).values({
          appointmentDate: date,
          appointmentTime: time,
          userId: user.id,
          bloodBankId: res[0].id,
          donationGap: interval,
        })
      );
      for(let i =1; i<10; i++){
        const newDate = new Date(currentDate); 
        newDate.setDate(newDate.getDate() + (gapInDays * (i)));
        appointmentsPromise.push(
          db.insert(appointments).values({
            appointmentDate: newDate.toISOString().split('T')[0],
            appointmentTime: time,
            userId: user.id,
            bloodBankId: res[0].id,
            donationGap: interval,
          })
        )
      }
      await Promise.all(appointmentsPromise);
      revalidatePath('/account');
      revalidatePath('/donors');
      return[{
        name: "bloodBank",
        isError: false,
        isToast: true,
        message: "Your appointment has been successfully scheduled.",
      }]
    }
    catch(e){
      return[{
        name: "bloodBank",
        isError: true,
        message: "Something went wrong while adding appointments. Please try again later.",
        isToast: true,
      }]
    }
  }
  catch(e){
    return[{
      message: "We could not find a blood bank with the name you provided.",
      isError: true,
      isToast: true,
      name: "bloodBank"
    }]
  }
}