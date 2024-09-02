'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BloodBankNameType, BloodBankSchema, OperationalDaysSchema, TBloodBankSchema, TOperaionalDaysSchema,  } from '@/lib/types';
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
import {bloodBankBasicInformationItems, OperationalDetailsItems, signupItems} from '@/lib/constants';
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
import Link from 'next/link';
import CustomInput from '../custom-switch';
import CustomSwitch from '../custom-switch';
import CustomSelect from '../custom-select';


type Props = {}

export default function OperationalDetailsForm({}: Props) {
  //TODO: add backend logic

  // const [state, formAction] = useFormState(createUser, null);
  const form = useForm<TOperaionalDaysSchema>({
      resolver: zodResolver(OperationalDaysSchema),
      defaultValues:{
        SundaySwitch: false,
        MondaySwitch: false,
        TuesdaySwitch: false,
        WednesdaySwitch: false,
        ThursdaySwitch: false,
        FridaySwitch: false,
        SaturdaySwitch: false,
        SundayStartAt: "09:00:00",
        SundayEndsAt: "09:00:00",
        MondayStartAt: "09:00:00",
        MondayEndsAt: "09:00:00",
        TuesdayStartAt: "09:00:00",
        TuesdayEndsAt: "09:00:00",
        WednesdayStartAt: "09:00:00",
        WednesdayEndsAt: "09:00:00",
        ThursdayStartAt: "09:00:00",
        ThursdayEndsAt: "09:00:00",
        FridayStartAt: "09:00:00",
        FridayEndsAt: "09:00:00",
        SaturdayStartAt: "09:00:00",
        SaturdayEndsAt: "09:00:00",

      }
       
  });
  // useEffect(()=>{
  //     if(Array.isArray(state) && state?.length > 0){
  //         state.forEach((issue: {name: BloodBankNameType, errorMessage: string, isToast: boolean, isError:boolean})=>{
  //             if(!issue.isToast){
  //                 form.setError(issue.name, {
  //                     message: issue.errorMessage
  //                 })
  //             }
  //             else if(issue.isToast && issue.isError){
  //                 toast.error(issue.errorMessage);
  //             }
  //             else if(issue.isToast && !issue.isError){
  //                 toast.success(issue.errorMessage);
  //                 router.push("/signup/email-verification");
  //             }
  //         });
  //     }
  // },[state]);

  
  async function onSubmit(data: TOperaionalDaysSchema){
      const formData = new FormData();
      //server actions accept FromData object
      console.log(data.SundayStartAt);
      console.log("is submitting")

      //TODO: call the formAction
      // formAction(formData);
      
  }
return (
  
  <Form {...form}>
      <form className='flex flex-col w-full cs:max-w-[800px] gap-4 px-4' onSubmit={form.handleSubmit(onSubmit)}>              
         {
            OperationalDetailsItems.map((item)=>(
              <div key={item.dayName} className='flex flex-col gap-2 mb-3 cs:flex-row cs:items-center items-stretch justify-between sm:items-center'>
                <div className='flex justify-between w-full flex-1'>
                <p className='text-label-n font-medium max-w-[100px] w-full'>{item.dayName}</p>
                <CustomSwitch name={item.switch} control={form.control}/>
                </div>
                <div className='flex justify-between items-center gap-4 flex-[1.2]'>    
                  <CustomSelect name={item.statrsAt} control={form.control}/>
                  <p className='text-label-n font-medium'>To</p>
                  <CustomSelect name={item.endsAt} control={form.control}/>
                </div>
              </div>
            ))
          }

          <div className='w-full justify-between flex'>
            <Link href="/registre/facility-details">
              <Button className='flex border rounded-lg gap-2 px-6 duration-200  bg-white hover:bg-n-20' disabled={form.formState.isSubmitting}>
                  <Image src="/icons/Arrow-left.svg" alt='Arrow Icon' width={15} height={18}/>
                  <p className='text-n-900'>Go Back</p>
                </Button>
            </Link>
            <Link href="/registre/certification-license">
              <Button className='flex border px-8 rounded-lg gap-2  duration-200 bg-white hover:bg-n-20' type="submit" disabled={form.formState.isSubmitting}>
                <p className='text-n-900'>Next</p>
                <Image src="/icons/Arrow.svg" alt='Arrow Icon' width={15} height={18}/>
              </Button>
            </Link> 
          </div>
          
          

      </form>
  </Form>
)
}