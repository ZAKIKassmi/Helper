import 'dotenv/config';
import { Lucia, TimeSpan } from "lucia";
import { DrizzlePostgreSQLAdapter, PostgreSQLSessionTable } from "@lucia-auth/adapter-drizzle";
import { db } from "@/drizzle/db";
import { userTable, sessions, bloodBanks, bloodBanksSessions } from "@/drizzle/schema";
import type { Session, User } from "lucia";
import { cookies } from "next/headers";
import { GitHub, Google } from "arctic";
import { cache } from 'react';


//lucia connects to the database via an adapter
//takes as an arguments: the database, session table, and user table
const adapter = new DrizzlePostgreSQLAdapter(db, sessions, userTable);
const bloodBankAdapter = new DrizzlePostgreSQLAdapter(db, bloodBanksSessions, bloodBanks);

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
    email: string;
    email_verified: boolean;
}


export const lucia = new Lucia(adapter, {
    sessionExpiresIn: new TimeSpan(4,'w'),// 4 weeks 
	sessionCookie: {
        // this sets cookies with super long expiration
        // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		// expires: false,  
		attributes: {
            // set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (attributes:DatabaseUserAttributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			id: attributes.id,
            email: attributes.email,
            emailVerified: attributes.email_verified,
		};
	}
});


export const auth = new Lucia(bloodBankAdapter, {
    sessionExpiresIn: new TimeSpan(4, 'w'), // 4 weeks 
    sessionCookie: {
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes: DatabaseUserAttributes) => {
        return {
            id: attributes.id,
            email: attributes.email,
            emailVerified: attributes.email_verified,
        };
    }
});


export const validateBloodBankRequest = cache( async (): Promise<{user: User; session: Session} | {user: null; session:null}> =>{
    const sessionId = cookies().get("blood_bank_auth_session_id")?.value ?? null;
    if(!sessionId){
        //if no session cookie found => user must log in
        return {
            user: null,
            session: null,
        }
    }


    const result = await auth.validateSession(sessionId);
    try{
        if(result.session && result.session.fresh){
            // if session.fresh is true it indicates that the session expiration has been extended and you should set new session cookie
            const sessionCookie = auth.createSessionCookie(result.session.id);
            cookies().set("blood_bank_auth_session_id", sessionCookie.value, sessionCookie.attributes);
        }

        //if the session is invalide, delete the session cookie.
        if(!result.session){
            const sessionCookie = auth.createBlankSessionCookie();
			cookies().set("blood_bank_auth_session_id", sessionCookie.value, sessionCookie.attributes);
        }
    }
    catch{}
    return result;
})

//validateRequest will check for session cookie, validate it and set new cookie if necessary.
export const validateRequest = cache(async (): Promise<{user: User; session: Session} | {user: null; session:null}> =>{
    //check the session cookie
    const sessionId = cookies().get('user_auth_session_id')?.value ?? null;
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
            cookies().set("user_auth_session_id", sessionCookie.value, sessionCookie.attributes);
        }

        //if the session is invalide, delete the session cookie.
        if(!result.session){
            const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set("user_auth_session_id", sessionCookie.value, sessionCookie.attributes);
        }
    }
    catch{}
    return result;
    
})

export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!);
export const googleAuth = new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!
    ,`${process.env.HOST_NAME}/api/google/callback`);



