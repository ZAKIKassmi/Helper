'use server';
import { db } from "@/drizzle/db";
import { userTable } from "@/drizzle/schema";
import { lucia } from "@/lib/auth";
import { setSession } from "@/lib/session";
import { loginSchema } from "@/lib/types";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(_:any, formData: FormData):Promise<{name: "email" | "password" | "root", errorMessage: string, isToast: boolean}[]>{
    const email = (formData.get('email') as string).toLowerCase();
    const password = formData.get('password') as string;
    
    const result = loginSchema.safeParse({
        email,
        password
    });

    let errors: {name: "email" | "password" | "root", errorMessage: string, isToast: boolean}[] = [];
    if(!result.success){
        result.error.issues.forEach((issue)=>{
           errors = [...errors, {name: issue.path[0] as "email" | "password" | "root", errorMessage: issue.message, isToast: false}]
        });
        return errors;
    }

    try{
        const user = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);
        if(user.length == 0){
            return errors = [...errors, {name: 'password',errorMessage: 'Email or password is incorrect.t', isToast:true}]
            
        }

        const validPassword = await verify(user[0].password, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });

        if (!validPassword) {
            return errors = [...errors, {name: 'password',errorMessage: 'Email or password is incorrect.',isToast:true}];
        }
        
        try{
            await setSession(user[0].id);
        }
        catch(e){
            return[{
                name: 'password',
                isToast: true,
                errorMessage: "Oops! Something went wrong. Please try again later."
            }];
        }
    }
    catch(e){
        return[{
            name: 'password',
            isToast: true,
            errorMessage: "Oops! Something went wrong. Please try again later."
        }];
    }
    redirect('/');
}