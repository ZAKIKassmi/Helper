'use client';
import { 
    Form, 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
 } from '@/components/ui/form';
import {useForm} from 'react-hook-form';
import { ResetPasswordSchema,TResetPasswordSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useFormState } from 'react-dom';
import { resetPasswordLink } from '@/app/(auth)/login/reset-password/_actions/action';
import { useEffect } from 'react';
import { toast } from 'sonner';


export default function ResetPasswordEmailForm() {

    const [state, formAction] = useFormState(resetPasswordLink, {
        message: "",
        isError: true
    });
    
    const form = useForm<TResetPasswordSchema>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: '',
        }
    });

    
    useEffect(()=>{
        if(state.isError && state.message.length > 0){
            toast.error(state.message);
        }
        else if(!state.isError && state.message.length > 0){
            toast.success(state.message);
        }
    },[state]);
  

    async function onSubmit(data: TResetPasswordSchema){
        const formData = new FormData;
        formData.append('email', data.email);

        formAction(formData);
    }
    return (
    
            <Form {...form}>
                <form
                className='flex flex-col max-w-[500px] w-full gap-4'
                onSubmit={form.handleSubmit(onSubmit)}
                noValidate
                >


                    <FormField 
                        name='email'
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className='text-label-n text-n-900 font-medium'>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' {...field} placeholder='Email' type='email'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    >
                    </FormField>

                    
                
                    <Button className='bg-c-red-500 hover:bg-c-red-600 duration-200' type='submit' disabled={form.formState.isSubmitting}>
                        Send Link
                    </Button>
                    
                </form>
                
            </Form>

            


    )
}