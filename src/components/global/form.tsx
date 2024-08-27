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
import { createUser } from '@/app/(auth)/signup/_action/action';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
 

export default function CustomForm() {

    const [state, formAction] = useFormState(createUser, null);
    const [passwordState, setPasswordState] = useState<'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Very Strong' | "">("");    
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
    const router = useRouter();
    //prefetch the email verification route.
    // router.prefetch("/signup/email-verification");
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
        }
    },[state]);

    function evaluatePasswordStrength(password: string) {
        const result = zxcvbn(password);
        if (password.length === 0) {
          setPasswordState('');
          return;
        }
        switch (result.score) {
            case 0:
                setPasswordState('Very Weak');
                break;
            case 1:
                setPasswordState('Weak');
                break;
            case 2:
                setPasswordState('Moderate');
                break;
            case 3:
                setPasswordState('Strong');
                break;
            case 4:
                setPasswordState('Very Strong');
                break;
            default:
                setPasswordState("");
        }
    }

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
                                <Input placeholder={item.displayedName} type={item.type}  {...field} 
                                    onChange={(e) => {
                                        field.onChange(e);
                                        if (item.name === 'password') {
                                            evaluatePasswordStrength(e.target.value);
                                        }
                                    }}
                                />
                            </FormControl>
                            {item.name === 'password' && <FormDescription className={
                                  !passwordState ? "hidden" :
                                  passwordState === "Weak" ? "text-orange-500" :
                                  passwordState === "Very Weak" ? "text-red-500" :
                                  passwordState === "Moderate" ? "text-yellow-500" :
                                  passwordState === "Strong" ? "text-green-500" :
                                  "text-blue-500"
                                }>
                                    {passwordState}
                                </FormDescription>}
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


