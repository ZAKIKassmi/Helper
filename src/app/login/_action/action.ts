'use server';
import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { lucia } from "@/lib/auth";
import { loginSchema } from "@/lib/types";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(_:any, formData: FormData){
    const email = (formData.get('email') as string).toLowerCase();
    const password = formData.get('password') as string;
    
    const result = loginSchema.safeParse({
        email,
        password
    });

    let errors: {name: "email" | "password" | "root", errorMessage: string}[] = [];
    if(!result.success){
        result.error.issues.forEach((issue)=>{
           errors = [...errors, {name: issue.path[0] as "email" | "password" | "root", errorMessage: issue.message}]
        });
        return errors;
    }

    try{
        const user = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);
        if(user.length == 0){
            return errors = [...errors, {name: 'password',errorMessage: 'Email or Password is incorrect'}]
            
        }

        const validPassword = await verify(user[0].password, password, {
            memoryCost: 65536,
            timeCost: 3,
            outputLen: 32,
            parallelism: 1
        });

        if (!validPassword) {
            return errors = [...errors, {name: 'password',errorMessage: 'Email or Password is incorrect'}]
        }
        
        try{
            const session = await lucia.createSession(user[0].id,{});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }
        catch(e){
            console.log('Somthing went wrong while trying to create the session');
        }
    }
    catch(e){
        console.log('can not fetch user');
    }
    redirect('/');
}