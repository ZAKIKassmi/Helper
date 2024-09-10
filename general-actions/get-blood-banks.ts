"use server";

import { db } from "@/drizzle/db";
import { bloodBanks } from "@/drizzle/schema";
import { validateRequest } from "@/lib/auth";

export async function getBloodBanks():Promise<{isError:boolean, message:string, data: {}[]}>{
  
  

  try{
    const res = await db.select({
      id: bloodBanks.id,
      latitude: bloodBanks.latitude,
      longitude: bloodBanks.longitude,
      name: bloodBanks.name,
    }).from(bloodBanks);

    return {
      isError: false,
      message: "",
      data: res,
    };
  }
  catch{
    return{
      isError: true,
      message: "Something went wrong while fetching blood banks.",
      data: []
    }
  }
}