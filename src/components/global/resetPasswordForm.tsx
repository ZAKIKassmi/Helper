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
import { SetNewPasswordSchema, TSetNewPasswordSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { resetPassword } from '@/app/(auth)/login/reset-password/[token]/_actions/actions';
import zxcvbn from 'zxcvbn';
import { useRouter } from 'next/navigation';


export default function ResetPasswordForm(
    {token}:{token:string}
){

    const [state, formAction] = useFormState(resetPassword, {
        message: "",
        isError: true
    });

    const [passwordState, setPasswordState] = useState<'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Very Strong' | "">("");    
    const form = useForm<TSetNewPasswordSchema>({
        resolver: zodResolver(SetNewPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    });

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

    const onInvalid = (errors:any) => console.error(errors)
    return (
    
            <Form {...form}>
                <form
                className='flex flex-col max-w-[500px] w-full gap-4'
                onSubmit={form.handleSubmit(onSubmit,onInvalid)}>

                    <FormField 
                        name='password'
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field} 
                                    placeholder='Password'
                                    onChange={(e) => {
                                      field.onChange(e);
                                      evaluatePasswordStrength(e.target.value);
                                    }} 
                                    type='password'/>
                                </FormControl>
                                <FormMessage/>
                                <FormDescription className={
                                  !passwordState ? "hidden" :
                                  passwordState === "Weak" ? "text-orange-500" :
                                  passwordState === "Very Weak" ? "text-red-500" :
                                  passwordState === "Moderate" ? "text-yellow-500" :
                                  passwordState === "Strong" ? "text-green-500" :
                                  "text-blue-500"
                                }>
                                  {passwordState}
                                </FormDescription>
                            </FormItem>
                        )}
                    >
                    </FormField>

                    <FormField 
                        name="confirmPassword"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder='Confirm Password' type='Password'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    >
                    </FormField>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        Reset Password
                    </Button>
                </form>
            </Form>

            


    )
}