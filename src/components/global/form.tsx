'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormNameTypes, TUserSchema, userSchema } from '@/lib/types';
import { 
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
 } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {signupItems} from '@/lib/constants';
import { createUser } from '@/app/signup/_action/action';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
 

export default function CustomForm() {

    const [state, formAction] = useFormState(createUser, null);

    const form = useForm<TUserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        }   
    });

    useEffect(()=>{
        if(Array.isArray(state) && state?.length > 0){
            state.forEach((issue: {name: SignUpFormNameTypes, errorMessage: string})=>{
                form.setError(issue.name, {
                    message: issue.errorMessage
                })
            })
        }
    },[state]);

    async function onSubmit(data: TUserSchema){
        const formData = new FormData();
        //server actions accept FromData object
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('confirmPassword', data.confirmPassword);
        //call the formAction
        formAction(formData);
        
    }
  return (
    <Form {...form}>
        <form className='flex flex-col max-w-[500px] w-full gap-4' onSubmit={form.handleSubmit(onSubmit)}>
            {
                signupItems.map((item)=>(
                    <FormField 
                        key={item.name}
                        name={item.name}
                        control={form.control}
                        render={({field})=>(
                        <FormItem>
                            <FormLabel>{item.displayedName}</FormLabel>
                            <FormControl>
                                <Input placeholder={item.displayedName} type={item.type}  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>  
                        )}
                        >
                    </FormField>
                ))
            }
           <Button type="submit" disabled={form.formState.isSubmitting}>
            Sign Up
            </Button>
        </form>
    </Form>
  )
}


