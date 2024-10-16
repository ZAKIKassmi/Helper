"use server";
import { db } from "@/drizzle/db";
import { bloodBanks, events } from "@/drizzle/schema";
import { validateBloodBankRequest } from "@/lib/auth";
import { eventFormSchema, TEventFormSchema } from "@/lib/types";
import { eq } from "drizzle-orm";
import path from "path";
import { v4 as uuidv4 } from 'uuid'; 
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";
import ratelimit from "@/lib/rate-limiter";


export async function createEvent(_:any, formData: FormData):Promise<{name: keyof TEventFormSchema, message: string, isToast: boolean,isError:boolean}[]> {

  const data:TEventFormSchema = {title: '', description: '', address:'',startsAt:'', endsAt:'',date: new Date()}
  formData.forEach((value, key)=>(data[key as keyof TEventFormSchema]=value as string))
  const {user} = await validateBloodBankRequest();
  if(!user){
    return [{
      message: "Oops! You must be logged in to create an event.",
      isError: true,
      isToast: true,
      name: 'title'
    }]
  }

  const {success} = await ratelimit.limit(user.id);
  if(!success){
    return[{
      name: "title",
      isError: true,
      isToast: true,
      message: "You've reached your daily limit! Only one event can be created each day."
    }]
  }

  const result = eventFormSchema.safeParse(data);
  let errors: {name:  keyof TEventFormSchema, message: string, isToast:boolean, isError: boolean}[] = [];
  if(!result.success){
    result.error.issues.forEach((issue)=>{
      errors = [...errors, {name: issue.path[0] as keyof TEventFormSchema, message: issue.message,isToast: false, isError: true}]
    });
    return errors;
  }

  if(data.picture.name.length === 0){
    return[
      {
        message: "Picture is required",
        isError: true,
        isToast: true,
        name: "title"
      }
    ]
  }

  const uuid = uuidv4();
  const fileExtension = path.extname(data.picture.name);
  const fileName = `${uuid}${fileExtension}`;
  const filePath = path.join(process.cwd(), 'public', 'uploads','event-pictures', fileName);

  try{
    const arrayBuffer = await data.picture.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);
  }
  catch{
    return[{
      isError: true,
      isToast: true,
      message: "Could not upload image.",
      name: "title",
    }]
  }
  const date = new Date(data.date).toISOString().split('T')[0];

  try{
    await db.insert(events).values({
      title: data.title as string,
      description: data.description as string,
      pictureURL: filePath as string,
      eventDate: date,
      startsAt: data.startsAt as string,
      endsAt: data.endsAt as string,
      address: data.address as string,
      bloodBankId: user.id,
    });
    revalidatePath('/create-event');
    return[
      {
        isError: false,
        isToast: true,
        message: "Event successfully created!",
        name: "title",
      }
    ]
  }
  catch{ 
    return[
      {
        isError: true,
        isToast: true,
        message: "Could not insert the appointment into the database",
        name: "title",
      }
    ]
  }
  





}