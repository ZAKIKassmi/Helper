'use server';
import { db } from '@/drizzle/db';
import { userTable } from '@/drizzle/schema';
import { userSchema } from '@/lib/types';

export async function createUser(_: any, formData: FormData ){
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

   
    // const result = userSchema.safeParse({
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     confirmPassword
    // });

    // if(!result.success){
    //     return {
    //         errors: result.error.flatten().fieldErrors,
    //     }
    // }

    try{
        await db.insert(userTable).values({
            firstName,
            lastName,
            email,
            password,
        });
    }
    catch(e){
        return{
            errors: {
                email: '',
                password: '',
                confirmPassword: '',
                error: e,
            }
        }
    }
} 