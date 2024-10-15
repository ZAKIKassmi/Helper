'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BloodBankNameType, BloodBankSchema, TBloodBankSchema,  } from '@/lib/types';
import { 
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
 } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {bloodBankBasicInformationItems} from '@/lib/constants';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AddBasicInformation } from '@/app/(bloodBankAuth)/registre/basic-information/_actions/action';
import DropDownSelector from '../drop-down-selector';
import PasswordInput from '../password-input';
import SubmitButton from '../submit-button';
import { useFormButtonStateToggle } from '@/hooks/form-button-state-toggle';

type Props = {}

export default function BasicInformationRegistrationForm({}: Props) {

  const [state, formAction] = useFormState(AddBasicInformation, null);
  const toggleButtonState = useFormButtonStateToggle((state)=>state.toggleButtonState);



  const form = useForm<TBloodBankSchema>({
      resolver: zodResolver(BloodBankSchema),
      defaultValues: {
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
          address: '',
          country: '',
          zip: '',
          province: '',
      }   
  });
  const router = useRouter();
  //prefetch the email verification route.
  useEffect(()=>{
      if(Array.isArray(state) && state?.length > 0){
          state.forEach((issue: {name: BloodBankNameType, errorMessage: string, isToast: boolean, isError:boolean})=>{
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
                  router.push("/registre/email-verification");
              }
            });
            toggleButtonState();
      }
  },[state]);

  

  async function onSubmit(data: TBloodBankSchema){
      if(zxcvbn(data.password).score < 4){
          toast.error("Your password needs to be stronger. Please include a mix of letters, numbers, and special characters for better security.");
          return null;
      }
      if(data.password !== data.confirmPassword){
          toast.error("Oops! Passwords do not match.");
          return null;
      }
      const formData = new FormData();
      Object.entries(data).forEach(([key,value])=>{
        formData.append(key, value as string);
      });

      toggleButtonState();
      formAction(formData);

      
  }
return (
  
  <Form {...form}>
      <form className='flex flex-col w-full max-w-[500px] gap-4 px-4' onSubmit={form.handleSubmit(onSubmit)}>              
          {
              bloodBankBasicInformationItems.map((item)=>(
                item.name !== "password" && item.name !== "confirmPassword" ?
                  <FormField 
                      key={item.name}
                      name={item.name}
                      control={form.control}
                      render={({field})=>(
                      <FormItem>
                          <FormControl>
                              <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder={item.displayedName} type={item.type}  {...field} 
                              />
                          </FormControl>
                          <FormMessage />
                      </FormItem>  
                      )}
                      >
                  </FormField> :
                <PasswordInput key={item.name} form={form} name={item.name}/>
              ))
          }

          <DropDownSelector type='country' form={form}/>
          
      
          <div className='w-full justify-end flex'>

           <SubmitButton placeholder='submit'/>
          </div>
          

      </form>
  </Form>
)
}