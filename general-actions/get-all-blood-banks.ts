"use server";

import { db } from "@/drizzle/db";
import { bloodBanks } from "@/drizzle/schema";
import { validateRequest } from "@/lib/auth";



export async function getAllBloodBanks(_?:any, formData?:FormData):Promise<{message: string, isError: boolean, data?: {name:string, latitude:number, longitude: number}[] | null}>{
  // try{
  //   const {user} = await validateRequest();
  //   if(!user){
  //     return{
  //       isError: true,
  //       data: null,
  //       message: "You must be logged in to make this request",
  //     }
  //   }
  // } 
  // catch{
  //   return{
  //     isError: true,
  //     data: null,
  //     message: "You must be logged in to make this request",
  //   }
  // }

  try{
    const res = await db.select({
      name: bloodBanks.name,
      latitude: bloodBanks.latitude,
      longitude: bloodBanks.longitude,
    }).from(bloodBanks);

    console.log(res);
    return{
      isError: false,
      message: "",
      data: res
    }
  }
  catch{
    throw new Error("opaa")
    // return {
    //   isError: true,
    //   message: "Could not fetch blood banks. Please try again later",
    //   data: null
    // }
  }


}