'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormNameTypes, TUserSchema, userSchema } from '@/lib/types';
import { 
    Form, 
 } from '../ui/form';
import { Button } from '../ui/button';
import { createUser } from '@/app/(userAuth)/signup/_action/action';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import LoginWithGoogleButton from '../login-with-google-button';
import CustomSeperator from '../custom-seperator';

import UserSignUpInputs from './user-sign-up-inputs';
import SubmitButton from '../submit-button';
import { useFormButtonStateToggle } from '@/hooks/form-button-state-toggle';
 

export default function CustomForm() {

    const [state, formAction] = useFormState(createUser, null);
    const toggleButtonState = useFormButtonStateToggle((state)=>state.toggleButtonState);


    const form = useForm<TUserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            address: '',
            phoneNumber: '',
            province: '',
            zip: ''
        }   
    });
    const router = useRouter();

    useEffect(()=>{
        if(Array.isArray(state) && state?.length > 0){
            state.forEach((issue: {name: SignUpFormNameTypes, errorMessage: string, isToast: boolean, isError:boolean})=>{
                if(!issue.isToast){
                    form.setError(issue.name, {
                        message: issue.errorMessage
                    })
                }
                else if(issue.isToast && issue.isError){
                    toast.error(issue.errorMessage);
                }
                else if(issue.isToast && !issue.isError){
                    toast.success(issue.errorMessage);
                    router.push("/signup/email-verification");
                }
            });
            toggleButtonState();
        }
    },[state]);

   

    async function onSubmit(data: TUserSchema){
        if(zxcvbn(data.password).score < 3){
            toast.error("Your password needs to be stronger. Please include a mix of letters, numbers, and special characters for better security.");
            return null;
        }
        if(data.password !== data.confirmPassword){
            toast.error("Passwords do not match!!");
            return null;
        }
        const formData = new FormData();

        Object.entries(data).forEach(([key, val])=>{
            formData.append(key as string, val as string);
        });
        formData.append('picture', data.picture[0]);
        formData.append('dateOfBirth', String(data.dateOfBirth?.toISOString().split('T')[0]));
        toggleButtonState();
        formAction(formData);
        
    }

  return (
    
    <Form {...form}>
        <form className='flex flex-col max-w-[500px] w-full gap-4 px-4 ' onSubmit={form.handleSubmit(onSubmit)}>

            <UserSignUpInputs form={form}/>


           <SubmitButton/>


            <CustomSeperator/>

            <LoginWithGoogleButton/>
        </form>
    </Form>
  )
}


