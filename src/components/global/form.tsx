'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TUserSchema, userSchema } from '@/lib/types';
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
        
        if(state?.errors){
           
            const errors = state.errors;


            if(errors.firstName){
                form.setError('firstName',{
                    type: 'server',
                    message: errors.firstName
                });
            }
            if(errors.lastName){
                form.setError('lastName',{
                    type: 'server',
                    message: errors.lastName
                });
            }
            if(errors.email){
                form.setError('email',{
                    type: 'server',
                    message: errors.email
                });
            }
            if(errors.password){
                form.setError('password',{
                    type: 'server',
                    message: errors.password
                });
            }
            if(errors.confirmPassword){
                form.setError('confirmPassword',{
                    type: 'server',
                    message: errors.confirmPassword
                });
            }
           
        }
        //reset the function after a successfull submit.
        

        
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


