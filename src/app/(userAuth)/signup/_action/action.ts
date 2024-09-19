'use server';
import { db } from '@/drizzle/db';
import { userTable } from '@/drizzle/schema';
import { SignUpFormNameTypes, userSchema } from '@/lib/types';
import {hash} from '@node-rs/argon2';
import generateEmailVerificationCode from './generateAndSendVerificationCode';
import { eq } from 'drizzle-orm';
import { setSession } from '@/lib/session';
import { rateLimitByIp } from '@/lib/limiter';


export async function createUser(_: any, formData: FormData ):Promise<{name: SignUpFormNameTypes, errorMessage: string, isToast: boolean,isError:boolean}[]>{
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = (formData.get('email') as string).toLowerCase();
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const dateOfBirth = new Date(formData.get('dateOfBirth') as string).toISOString().split('T')[0];
    const gender = formData.get('gender') as 'Male' | 'Female';
    const phoneNumber = formData.get('phoneNumber') as string;
    const bloodType = formData.get('bloodType') as unknown as number;
    const address = formData.get('address') as string;
    const picture = formData.get('picture');

    // if(picture.name.length === 0){
    //     return[
    //       {
    //         errorMessage: "Picture is required",
    //         isError: true,
    //         isToast: true,
    //         name: "address"
    //       }
    //     ]
    //   }

    return [{
        errorMessage: "Picture is required",
        isError: true,
        isToast: true,
        name: "address"          
    }];
    
    // const checkLimit = await rateLimitByIp({limit: 20, window: 10000 * 360 * 5, key: email});    
    // if(checkLimit?.isError){
    //   return [{
    //     name: "confirmPassword",
    //     errorMessage: checkLimit.message,
    //     isToast: true,
    //     isError: true,
    //   }]
    // }
    
    const result = userSchema.safeParse({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        dateOfBirth,
        gender,
        phoneNumber,
        bloodType,
        address,
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
            return [{name: "confirmPassword", errorMessage: "Oops! Something went wrong. Please try again later", isToast: true,isError: true}];
        }
    }
    catch(e){
        return [{name: "confirmPassword", errorMessage: "Oops! Something went wrong. Please try again later", isToast: true,isError: true}];
    }

    if(password !== confirmPassword){
        return [{name: "confirmPassword", errorMessage: "Oops! Passwords do not match.", isToast: true,isError: true}];
        
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
            isEligible: false,
            gender,
            address,
            dateOfBirth,
            phoneNumber,
            bloodType,

        }).returning({
            id: userTable.id    
        });
        //generate and send email verification code.
        const {isError, isToast, errorMessage} = await generateEmailVerificationCode(userId[0].id, email, "user");
        if(isError){
            return [{name: "confirmPassword", isToast, errorMessage,isError}];
        }

        try{
            await setSession(userId[0].id);
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