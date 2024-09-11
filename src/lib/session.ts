import { cookies } from "next/headers";
import { auth, lucia } from "./auth";


export async function setSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set("user_auth_session_id", sessionCookie.value, sessionCookie.attributes);
}


export async function setBloodBankSession(bloodBankId: string){
  const session = await auth.createSession(bloodBankId, {});
  const sessionCookie = auth.createSessionCookie(session.id);
  cookies().set("blood_bank_auth_session_id", sessionCookie.value, sessionCookie.attributes);
}