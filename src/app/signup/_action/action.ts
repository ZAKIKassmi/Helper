'use server';
import { db } from '@/drizzle/db';
import { userTable } from '@/drizzle/schema';
import { lucia } from '@/lib/auth';

import { SignUpFormNameTypes, userSchema } from '@/lib/types';
import {hash} from '@node-rs/argon2';
import { cookies } from 'next/headers';
import generateEmailVerificationCode from './generateAndSendVerificationCode';
import { eq } from 'drizzle-orm';


export async function createUser(_: any, formData: FormData ):Promise<{name: SignUpFormNameTypes, errorMessage: string, isToast: boolean,isError:boolean}[]>{
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

    let errors: {name:  SignUpFormNameTypes, errorMessage: string, isToast:boolean, isError: boolean}[] = [];

    if(!result.success){
        result.error.issues.forEach((issue)=>{
            errors = [...errors, {name: issue.path[0] as SignUpFormNameTypes, errorMessage: issue.message,isToast: false, isError: true}]
        });
        return errors;
    }
    //Check if the email already exist in the database. (EMAILS MUST BE UNIQUE);
    try{
        const checkExistingEmail = await db.select().from(userTable).where(eq(userTable.email, email));
        if(checkExistingEmail.length > 0){
            //trying to keep the errorMessages vague.
            return [{name: "confirmPassword", errorMessage: "Oops! Something went wrong", isToast: true,isError: true}];
        }
    }
    catch(e){
        return [{name: "confirmPassword", errorMessage: "Oops! Something went wrong. Please try again later", isToast: true,isError: true}];
    }

    if(password !== confirmPassword){
        return [{name: "confirmPassword", errorMessage: "Passwords do not match!", isToast: true,isError: true}];
        
    }

    let hashed_password = '';
    try{
        hashed_password = await hash(password,{
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
    }
    catch(e){
        return[{
            name: 'confirmPassword',
            isError: true,
            isToast: true,
            errorMessage: "Oops! Something went wrong. Please try again later."
        }];
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
        //generate and send email verification code.
        const {isError, isToast, errorMessage} = await generateEmailVerificationCode(userId[0].id, email);
        if(isError){
            return [{name: "confirmPassword", isToast, errorMessage,isError}];
        }

        try{
            const session = await lucia.createSession(userId[0].id,{});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
        }catch(e){
            return[{
                name: 'confirmPassword',
                isError: true,
                isToast: true,
                errorMessage: "Oops! Something went wrong. Please try again later."
            }]
        }
    }
    catch(e){
        return[{
            name: 'confirmPassword',
            isError: true,
            isToast: true,
            errorMessage: "Oops! Something went wrong. Please try again later."
        }];
    }
    return [{name: 'confirmPassword', isError: false, isToast: true, errorMessage: "We've sent a verification code to your email"}];

    
} 