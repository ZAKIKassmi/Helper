'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormNameTypes, TUserSchema, userSchema } from '@/lib/types';
import { 
    Form, 
    FormControl,
    FormField,
    FormItem,
    FormMessage,
 } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { createUser } from '@/app/(userAuth)/signup/_action/action';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import LoginWithGoogleButton from '../login-with-google-button';
import CustomSeperator from '../custom-seperator';
import CustomSelect from '../custom-select';
import { PhoneInput } from '../ui/phone-number';
import CustomCalendar from '../custom-calendar';
import PasswordInput from '../password-input';
 

export default function CustomForm() {

    const [state, formAction] = useFormState(createUser, null);

    const form = useForm<TUserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            address: '',
            phoneNumber: '',
        }   
    });
    const router = useRouter();

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
        const date = data.dateOfBirth?.toISOString().split('T')[0]
        formData.append('dateOfBirth', String(date));
        formData.append('gender', String(data.gender));
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('bloodType', String(data.bloodType));
        formData.append('address', data.address);
        formAction(formData);
        
    }

  return (
    
    <Form {...form}>
        <form className='flex flex-col max-w-[500px] w-full gap-4 px-4 ' onSubmit={form.handleSubmit(onSubmit)}>

            <div className='grid grid-cols-1 gap-4 csz:grid-cols-2'>
                <FormField 
                    key="firstName"
                    name="firstName"
                    control={form.control}
                    render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder="First Name" type="text"  {...field}   
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>  
                    )}
                    >
                </FormField>

                <FormField 
                    key="lastName"
                    name="lastName"
                    control={form.control}
                    render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder="Last Name" type="text"  {...field}   
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>  
                    )}
                    >
                </FormField>

                

            </div>

            <FormField 
                    name="email"
                    control={form.control}
                    render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder="Email" type="email"  {...field}   
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>  
                    )}
                    >
            </FormField>

            <FormField 
                    name="address"
                    control={form.control}
                    render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder="Address" type="text"  {...field}   
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>  
                    )}
                    >
                </FormField>
            

            <PasswordInput form={form} name="password"/>
            <PasswordInput form={form} name='confirmPassword'/>

            
            <CustomCalendar name='dateOfBirth' form={form} placeholder='Your birthday'/>

            <CustomSelect 
            placeholder='Please select your gender.' 
            array={["Male","Female"]} 
            name='gender' 
            control={form.control}/>

            <CustomSelect 
            placeholder='Please select your blood type.' 
            array={["Unknown","A+","A-", "B+","B-","AB+","AB-","O+","O-"]} 
            name='bloodType' 
            control={form.control}/>
            

            
            <FormField
                name="phoneNumber"
                control={form.control}
                render={({field})=>(
                <FormItem>
                        <PhoneInput {...field}
                        international
                        defaultCountry='MA'
                        placeholder='Enter a phone number'/>
                        <FormMessage />
                    </FormItem>  
                )}
            />
                         


           <Button className='bg-c-red-500 hover:bg-c-red-600 duration-200' type="submit" disabled={form.formState.isSubmitting}>
                Sign Up
            </Button>


            <CustomSeperator/>

            <LoginWithGoogleButton/>
        </form>
    </Form>
  )
}


