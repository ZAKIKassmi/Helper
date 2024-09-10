'use client';
import { 
    Form, 
 } from '@/components/ui/form';
import {useForm} from 'react-hook-form';
import { SetNewPasswordSchema, TSetNewPasswordSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { resetPassword } from '@/app/(userAuth)/login/reset-password/[token]/_actions/actions';
import zxcvbn from 'zxcvbn';
import { useRouter } from 'next/navigation';
import PasswordInput from '../password-input';


export default function ResetPasswordForm(
    {token}:{token:string}
){

    const [state, formAction] = useFormState(resetPassword, {
        message: "",
        isError: true
    });

    const form = useForm<TSetNewPasswordSchema>({
        resolver: zodResolver(SetNewPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    });


    const router = useRouter();
    useEffect(()=>{
        if(state.isError && state.message.length > 0){
            toast.error(state.message);
        }
        else if(!state.isError && state.message.length > 0){
            toast.success(state.message);
            router.push('/');
        }
    },[state]);
  

    async function onSubmit(data: TSetNewPasswordSchema){
        if(zxcvbn(data.password).score < 3){
            toast.error("Your password needs to be stronger. Please include a mix of letters, numbers, and special characters for better security.",{
                duration: 4500,
            });
            return;
        }
        const formData = new FormData;
        if(data.password !== data.confirmPassword){
          toast.error("Oops! The passwords you entered don't match.");
          return;
        }
        formData.append('password', data.password);
        formData.append('confirmPassword',data.confirmPassword);
        formData.append('token',token);

        formAction(formData);
    }

    return (
            <Form {...form}>
                <form
                className='flex flex-col max-w-[500px] w-full gap-4'
                onSubmit={form.handleSubmit(onSubmit)}>

                    <PasswordInput form={form} name='password'/>
                    <PasswordInput form={form} name='confirmPassword'/>
                    <Button className='bg-c-red-500 hover:bg-c-red-600 duration-200' type="submit" disabled={form.formState.isSubmitting}>
                        Reset Password
                    </Button>
                </form>
            </Form>

            


    )
}