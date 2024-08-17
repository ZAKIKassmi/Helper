import { googleAuth } from "@/lib/auth";
import { cookies } from "next/headers";
import { generateCodeVerifier, generateState } from "arctic";

export async function GET():Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await googleAuth.createAuthorizationURL(state, codeVerifier,{
    scopes: ["profile","email"]
  });

  cookies().set('google_oauth_state',state,{
    //TODO: change secure to true;
    secure: process.env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax'
  });

  cookies().set("google_code_verifier", codeVerifier, {
    secure: true,
    path: "/",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax'
  });

  
  return Response.redirect(url);
}