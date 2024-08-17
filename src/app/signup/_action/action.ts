'use server';
import { db } from '@/drizzle/db';
import { userTable } from '@/drizzle/schema';
import { lucia } from '@/lib/auth';
import { userSchema } from '@/lib/types';
import {hash} from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export async function createUser(_: any, formData: FormData ){
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = "formData.get('email') as string";
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    
    const result = userSchema.safeParse({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    });
    let zodErrors: { [key: string]: string } = {};
    if(!result.success){
        result.error.issues.forEach((i)=>{
            zodErrors = { ...zodErrors, [i.path[0]]: i.message }
        });
    }

    if(Object.keys(zodErrors).length > 0 ){
        return {errors: zodErrors}
    }
    let hashed_password = '';
    try{
        hashed_password = await hash(password,{
            memoryCost: 65536,
            timeCost: 3,
            outputLen: 32,
            parallelism: 1
        });
    }
    catch(e){
        console.log('something went wrong with hashing password!');
    }

    try{
        const userId = await db.insert(userTable).values({
            firstName,
            lastName,
            email,
            password: hashed_password,
        }).returning({
            id: userTable.id    
        });

        try{
            const session = await lucia.createSession(userId[0].id,{});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }catch(e){
            console.log('Something went wrong while sitting up the cookies',e);
            return;
        }
    }
    catch(e){
        console.log('Could not insert the user');
        return;
    }
    redirect('/');
} 