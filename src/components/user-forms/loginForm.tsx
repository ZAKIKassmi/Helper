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
import { loginAction } from '@/app/(userAuth)/login/_action/action';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import LoginWithGoogleButton from '../login-with-google-button';
import CustomSeperator from '../custom-seperator';
import { useSearchParams } from 'next/navigation';
import { useFormButtonStateToggle } from '@/hooks/form-button-state-toggle';

export default function LoginForm() {

    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    const [state, formAction] = useFormState(loginAction, []);
    const toggleButtonState = useFormButtonStateToggle((state)=>state.toggleButtonState);

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
            toggleButtonState();
        }
    },[state]);

    async function onSubmit(data: TLoginSchema){
        const formData = new FormData;
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('type', type as string);
        toggleButtonState();

        formAction(formData);
    }
    return (
    
            <Form {...form}>
                <form
                className='flex flex-col max-w-[500px] w-full gap-4 p-4'
                onSubmit={form.handleSubmit(onSubmit)}>


                    <FormField 
                        name='email'
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                {/* <FormLabel className='text-label-n text-n-900 font-medium'>
                                    Email
                                </FormLabel> */}
                                <FormControl>
                                    <Input {...field} className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder='Email' type='email'/>
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
                                {/* <FormLabel className='text-label-n text-n-900 font-medium'>
                                    Password
                                </FormLabel> */}
                                <FormControl>
                                    <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' {...field} placeholder='Password' type='password'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    >
                    </FormField>
                
                    <Button className='bg-c-red-500 hover:bg-c-red-600 duration-200' type='submit' disabled={form.formState.isSubmitting}>
                        Log in
                    </Button>
                    
                    {
                        type === 'user' && <div>

                    <CustomSeperator/>
                    
                    <LoginWithGoogleButton/>
                    
                        </div>
                    }

                    <div className='flex flex-wrap whitespace-nowrap justify-between text-xs'>

                    <Link href={type === 'user' ? "/signup" : "registre/basic-information"}className=' text-label-x-small font-medium text-n-900 underline' prefetch={true}>
                        Create an accout
                    </Link>
                    <Link href="/login/reset-password" className='text-label-x-small font-medium text-n-900 underline' prefetch={true}>
                        Forget Password?
                    </Link>
                    </div>
                </form>
                
            </Form>

            


    )
}