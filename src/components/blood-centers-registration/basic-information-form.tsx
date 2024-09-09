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
import CountryCodes from "@/data/CountryCodes.json";
import { Command, CommandEmpty,CommandList, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AddBasicInformation } from '@/app/(bloodBankAuth)/registre/basic-information/_actions/action';
import DropDownSelector from '../drop-down-selector';

type Props = {}

export default function BasicInformationRegistrationForm({}: Props) {
  //TODO: add backend logic

  const [state, formAction] = useFormState(AddBasicInformation, null);
  const [passwordState, setPasswordState] = useState<'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Very Strong' | "">("");    
  const [open, setOpen] = useState(false);

  


  const form = useForm<TBloodBankSchema>({
      resolver: zodResolver(BloodBankSchema),
      defaultValues: {
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
          address: '',
          country: '',
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
      //server actions accept FromData object
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('country', data.country);
      formData.append('address', data.address);
      formData.append('password', data.password);
      formData.append('confirmPassword', data.confirmPassword);

      //TODO: call the formAction
      formAction(formData);

      
  }
return (
  
  <Form {...form}>
      <form className='flex flex-col w-full max-w-[500px] gap-4 px-4' onSubmit={form.handleSubmit(onSubmit)}>              
          {
              bloodBankBasicInformationItems.map((item)=>(
                  <FormField 
                      key={item.name}
                      name={item.name}
                      control={form.control}
                      render={({field})=>(
                      <FormItem>
                        {/* <FormLabel>{item.displayedName}</FormLabel> */}
                          <FormControl>
                              <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder={item.displayedName} type={item.type}  {...field} 
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

          {/* 
              TODO: the following fields needs to be added to the formdata and get inserted into the db.
          */}
          <DropDownSelector type='country' form={form}/>
          
      
          <div className='w-full justify-end flex'>

            <Button className='flex border rounded-lg gap-2 duration-200 px-8 bg-white hover:bg-n-20' type="submit" disabled={form.formState.isSubmitting}>
              <p className='text-n-900'>Next</p>
              <Image src="/icons/Arrow.svg" alt='Arrow Icon' width={15} height={18}/>
            </Button>
          </div>
          

      </form>
  </Form>
)
}