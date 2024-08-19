'use server';
import { db } from '@/drizzle/db';
import { userTable } from '@/drizzle/schema';
import { lucia } from '@/lib/auth';

import { SignUpFormNameTypes, userSchema } from '@/lib/types';
import {hash} from '@node-rs/argon2';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sendVerificationCode } from '../email-verification/_action/action';
import generateEmailVerificationCode from '../email-verification/_action/generateVerificationCode';



export async function createUser(_: any, formData: FormData ){
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = (formData.get('email') as string).toLowerCase();
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    
    const result = userSchema.safeParse({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    });

    let errors: {name:  SignUpFormNameTypes, errorMessage: string}[] = [];

    if(!result.success){
        result.error.issues.forEach((issue)=>{
            errors = [...errors, {name: issue.path[0] as SignUpFormNameTypes, errorMessage: issue.message}]
        });
        return errors;
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
            emailVerified: false,
        }).returning({
            id: userTable.id    
        });
        //generate email verification code.
        const verificationCode = await generateEmailVerificationCode(userId[0].id, email);
        await sendVerificationCode({email, verificationCode});
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
    redirect('/signup/email-verification');
} 