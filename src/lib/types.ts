import {z} from 'zod';

export const userSchema = z.object({
    firstName: z.string().trim().toLowerCase().min(1,{
        message: 'First Name must contain at least 1 character'
    }),
    lastName: z.string().trim().toLowerCase().min(1,{
        message: 'Last Name must contain at least 1 character'
    }),
    email: z.string().trim().email({
        message: 'Email is not valid'
    }).refine((val)=>val.endsWith('@gmail.com'),{
        message: 'Email must end with @gmail.com',
    }),
    password: z.string().trim().min(8, {
        message: 'Password must contain at least 8 characters',
    }),
    confirmPassword: z.string().trim().min(8,{
        message: 'Password must contain at least 8 characters',
    }),
}).refine((data)=> data.password === data.confirmPassword,{
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


export type TUserSchema = z.infer<typeof userSchema>; 

