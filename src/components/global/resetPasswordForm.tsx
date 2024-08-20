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


export default function ResetPasswordForm() {

    // const [state, formAction] = useFormState(, );
    
    const form = useForm<TResetPasswordSchema>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: '',
        }
    });

    

    async function onSubmit(data: TResetPasswordSchema){
        const formData = new FormData;
        formData.append('email', data.email);

        // formAction(formData);
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
                        Reset Password
                    </Button>
                    
                </form>
                
            </Form>

            


    )
}