"use client";
import { Form } from '../ui/form'
import { useForm, useFormContext } from 'react-hook-form'
import { Gender, TUserSchema, userSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import UserSignUpInputs from '../user-forms/user-sign-up-inputs';
import { Button } from '../ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { updateUserInformation } from '@/app/(user)/account/_action/upate-user-information';
import { useEffect, useState} from 'react';
import { toast } from 'sonner';
import { LoadingSpinner } from '../ui/loading-spinner';
import SubmitButton from '../submit-button';
import { useFormButtonStateToggle } from '@/hooks/form-button-state-toggle';


type Props = {
  data:{
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender ;
  phoneNumber: string | null;
  bloodType: string;
  address: string | null;
  zip: string | null;
  province: string | null;
  country: string;
},
}



export default function UpdateUserInformation({data}: Props) {
  const [state, formAction] = useFormState(updateUserInformation, {
    message:  '',
    isError: false,
  });
  const toggleButtonState = useFormButtonStateToggle((state)=>state.toggleButtonState);


  const form = useForm<Omit<TUserSchema, 'dateOfBirth' | 'password' | 'confirmPassword' | 'picture'>>({
    defaultValues: {
      email: data.email || '',
      firstName: data.firstName ||'',
      lastName: data.lastName || '',
      address: data.address || '',
      phoneNumber: data.phoneNumber || '',
      province: data.province || '',
      zip: data.zip || '',
      gender: data.gender,
      bloodType: data.bloodType,
      country: data.country,
    }
  });

  useEffect(()=>{
    if(state){
      if(state?.isError && state.message){
        toast.error(state.message);
      }
      else if(!state?.isError && state.message){
        toast.success(state?.message && state.message);
      }
      toggleButtonState();
    }
    
  }, [state]);

  

  function onSubmit(
    input: Omit<TUserSchema, 'dateOfBirth' | 'password' | 'confirmPassword' | 'picture'>){
      
      const formData = new FormData();
      let inputChanged = false;
      Object.entries(input).forEach(([key, value]) => {
        if(key === 'dateOfBirth'){
          return;
        }
        if (value !== data[key as keyof Props['data']]) {
          inputChanged = true;
          formData.append(key, value as string);
        }
      });

      formData.append('reservedGender', data.gender);

      if(!inputChanged){
        toast.success("Everything is up to date");
      }
      else{
        toggleButtonState();
        formAction(formData); 
      }      
    }

   
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='p-4 flex flex-col gap-4'>
          <UserSignUpInputs form={form} isVisible={false}/>

          <SubmitButton/>
       
      </form>
    </Form>
  )
}