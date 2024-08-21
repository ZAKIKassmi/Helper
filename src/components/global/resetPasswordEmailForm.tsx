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
import { ResetPasswordSchema,TResetPasswordSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useFormState } from 'react-dom';
import { resetPasswordLink } from '@/app/login/reset-password/_actions/action';
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

                    
                
                    <Button type='submit' disabled={form.formState.isSubmitting}>
                        Send Link
                    </Button>
                    
                </form>
                
            </Form>

            


    )
}