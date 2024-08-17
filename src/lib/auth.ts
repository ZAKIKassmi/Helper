import 'dotenv/config';
import { Lucia, TimeSpan } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "@/drizzle/db";
import { userTable, sessions } from "@/drizzle/schema";
import type { Session, User } from "lucia";
import { cookies } from "next/headers";
import { GitHub, Google } from "arctic";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, userTable);


//we are importing lucia module above, but we do not have Typescript definitions in it.
//Therefore, we delcare them here.
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}   

interface DatabaseUserAttributes {
	id: string;
    github_id: number,
    username: string,
}


export const lucia = new Lucia(adapter, {
    // sessionExpiresIn: new TimeSpan(2,'w'),// 2 weeks 
	sessionCookie: {
        // this sets cookies with super long expiration
        // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
            // set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (attributes:DatabaseUserAttributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			id: attributes.id,
            github_id: attributes.github_id,
            username: attributes.username,
		};
	}
});


//validateRequest will check for session cookie, validate it and set new cookie if necessary.

export const validateRequest = async (): Promise<{user: User; session: Session} | {user: null; session:null}> =>{
    //check the session cookie
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if(!sessionId){
        //if no session cookie found => user must log in
        return {
            user: null,
            session: null,
        }
    }

    //validate sessionId
    const result =  await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering the page
    try{
        if(result.session && result.session.fresh){
            // if session.fresh is true it indicates that the session expiration has been extended and you should set new session cookie
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }

        //if the session is invalide, delete the session cookie.
        if(!result.session){
            const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
    }
    catch{}
    return result;
    
}

export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!);
export const googleAuth = new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!
    ,`${process.env.HOST_NAME}/api/google/callback`);



