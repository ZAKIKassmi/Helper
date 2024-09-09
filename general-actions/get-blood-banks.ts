"use server";

import { db } from "@/drizzle/db";
import { bloodBanks } from "@/drizzle/schema";

export async function getBloodBanks(){
  const res = await db.select().from(bloodBanks);
  return res;
}