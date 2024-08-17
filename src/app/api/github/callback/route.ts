import { github, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { userTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";


export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

    try{
      const tokens = await github.validateAuthorizationCode(code);
      const githubUserResponse = await fetch("https://api.github.com/user",{
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      });

      const githubUser: GitHubUser = await githubUserResponse.json();
      const gitId = Number(githubUser.id);

      if(!githubUser.email){
        const res = await fetch("https://api.github.com/user/emails",{
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
          }
        });
      }


      const existingUser = await db.select().from(userTable).where(eq(userTable.githubId, gitId)).limit(1);
		  // const existingUser = await db.table("user").where("github_id", "=", githubUser.id).get();
      if (existingUser.length > 0) {
        const session = await lucia.createSession(existingUser[0].id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/"
          }
        });
      }

      
      

      const user = await db.insert(userTable).values({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        githubId: gitId,
        username: githubUser.login,
      }).returning({
        id: userTable.id    
    });

      const session = await lucia.createSession(user[0].id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/"
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

function getPrimaryEmail(emails: Email[]): string {
  const primaryEmail = emails.find((email) => email.primary);
  return primaryEmail!.email;
}

interface Email {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string | null;
}

interface GitHubUser {
	id: string;
	login: string;
  email: string;
}
