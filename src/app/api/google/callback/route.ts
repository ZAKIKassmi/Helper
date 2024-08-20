import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { googleAuth, lucia } from "@/lib/auth";
import { GoogleUser, GoogleUserSchema } from "@/lib/types";
import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";



export async function GET(request: Request):Promise<Response>{
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get('google_oauth_state')?.value ?? null;
  const codeVerifier = cookies().get('google_code_verifier')?.value ?? null;

  if(!code || !state || !storedState || state !== storedState || !codeVerifier){
    return new Response(null, {
      status: 400,
    });
  }

  try{
    const tokens = await googleAuth.validateAuthorizationCode(code,codeVerifier);
    const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo",{
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });

    const googleUser: GoogleUser = await res.json();
    const existingUser = await db.select().from(userTable).where(eq(userTable.googleId, googleUser.sub)).limit(1);

    if(existingUser.length > 0){
      const session = await lucia.createSession(existingUser[0].id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return new Response(null,{
        status: 302,
        headers:{
          Location: "/"
        }
      });
    }

    const user = await db.insert(userTable).values({
      firstName: googleUser.given_name || '',
      lastName: googleUser.family_name || '',
      email: googleUser.email || '',
      password: '',
      username: googleUser.name || null,
      googleId: googleUser.sub,
      emailVerified: true,
    }).returning({
      id: userTable.id,
    });
    
    const session = await lucia.createSession(user[0].id,{});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return new Response(null,{
      status: 302,
      headers:{
        Location: '/',
      }
    });


  }
  catch(e){
     // the specific error message depends on the provider
     if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400
      });
    }
    return new Response(null, {
      status: 500
    });
  }

}

