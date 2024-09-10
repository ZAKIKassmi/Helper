'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OperationalDaysSchema, TOperaionalDaysSchema,  } from '@/lib/types';
import { 
    Form, 
 } from '../ui/form';
import { Button } from '../ui/button';
import { OperationalDetailsItems} from '@/lib/constants';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import CustomSwitch from '../custom-switch';
import CustomSelect from '../custom-select';
import { addOperationalDetails } from '@/app/(bloodBankAuth)/registre/operational-details/_action/action';


type Props = {}

export default function OperationalDetailsForm({}: Props) {

  const [state, formAction] = useFormState(addOperationalDetails, null);
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
  const router = useRouter();
  useEffect(()=>{
      if(Array.isArray(state) && state?.length > 0){
          state.forEach((issue: {name: keyof TOperaionalDaysSchema, errorMessage: string, isToast: boolean, isError:boolean})=>{
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
                  router.push("/registre/certification-license");
              }
          });
      }
  },[state]);

  
  async function onSubmit(data: TOperaionalDaysSchema){
      const formData = new FormData();

      Object.keys(data).forEach(key=>{
        formData.append(key, String(data[key as keyof TOperaionalDaysSchema]))
      }) 
      
      formAction(formData);
      
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
                  <CustomSelect array={null}  name={item.statrsAt} control={form.control}/>
                  <p className='text-label-n font-medium'>To</p>
                  <CustomSelect array={null}  name={item.endsAt} control={form.control}/>
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
              <Button className='flex border px-8 rounded-lg gap-2  duration-200 bg-white hover:bg-n-20' type="submit" disabled={form.formState.isSubmitting}>
                <p className='text-n-900'>Next</p>
                <Image src="/icons/Arrow.svg" alt='Arrow Icon' width={15} height={18}/>
              </Button>

          </div>
          
          

      </form>
  </Form>
)
}