'use client';
import { 
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
 } from '@/components/ui/form';
import {useForm} from 'react-hook-form';
import { loginSchema,TLoginSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { loginAction } from '@/app/login/_action/action';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function LoginForm() {

    const [state, formAction] = useFormState(loginAction, []);
    
    const form = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    useEffect(()=>{
        if(Array.isArray(state) && state?.length > 0){
            state.forEach((issue: {name: "email" | "password" | "root", errorMessage: string, isToast:boolean})=>{
                if(!issue.isToast){
                    form.setError(issue.name, {
                        message: issue.errorMessage
                    })
                }
                else{
                    toast.error(issue.errorMessage);
                }
            })
        }
    },[state]);

    async function onSubmit(data: TLoginSchema){
        const formData = new FormData;
        formData.append('email', data.email);
        formData.append('password', data.password);
        formAction(formData);
    }
    return (
    
            <Form {...form}>
                <form
                className='flex flex-col max-w-[500px] w-full gap-4'
                onSubmit={form.handleSubmit(onSubmit)}>


                    <FormField 
                        name='email'
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Email' type='email'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    >
                    </FormField>

                    <FormField 
                        name='password'
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Password' type='password'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    >
                    </FormField>
                
                    <Button type='submit' disabled={form.formState.isSubmitting}>
                        Log in
                    </Button>
                    <Link  href='/api/github'>
                        <Button className='w-full'>
                            Log in with GitHub
                        </Button>
                    </Link>

                    <Link  href='/api/google'>
                        <Button className='w-full'>
                            Log in with Google
                        </Button>
                    </Link>
                    <div className='flex justify-between text-xs'>

                    <Link href="/signup" className='text-blue-600 underline'>
                        Create an accout
                    </Link>
                    <Link href="/login/reset-password" className='text-blue-600 underline'>
                        Forget Password?
                    </Link>
                    </div>
                </form>
                
            </Form>

            


    )
}