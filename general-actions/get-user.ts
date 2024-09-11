"use server";

import { validateRequest } from "@/lib/auth";

export async function getUser() {
  const {user} = await validateRequest();
  if(!user){
    return null;
  }
  return user;
}