'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BloodBankFacilityNameTypes, facilityDetailsSchema, TFacilityDetails,  } from '@/lib/types';
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
import {bloodBankBasicInformationItems, bloodBankFacilityDetailsItems, signupItems} from '@/lib/constants';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import CountryCodes from "@/data/CountryCodes.json";
import { Command, CommandEmpty,CommandList, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn, formErrorHandling } from '@/lib/utils';
import Image from 'next/image';
import { facilityDetails } from '@/drizzle/schema';
import Link from 'next/link';
import { addFacilityDetails } from '@/app/(bloodBankAuth)/registre/facility-details/_action/action';


type Props = {}

export default function FacilityDetailsForm({}: Props) {

  const [state, formAction] = useFormState(addFacilityDetails, null);


  const form = useForm<TFacilityDetails>({
      resolver: zodResolver(facilityDetailsSchema),
      defaultValues: {
          donationBeds: '',
          capacity: '',
          emergencyContact: '',
      }   
  });
  const router = useRouter();
  //prefetch the email verification route.
  useEffect(()=>{
      // formErrorHandling(state, form);

      if(Array.isArray(state) && state?.length > 0){
          state.forEach((issue: {name: BloodBankFacilityNameTypes, errorMessage: string, isToast: boolean, isError:boolean})=>{
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
                  router.push("/registre/operational-details");
              }
          });
      }
  },[state]);


  async function onSubmit(data: TFacilityDetails){
      const formData = new FormData();
      //server actions accept FromData object
      formData.append('donationBeds', data.donationBeds);
      formData.append('capacity', data.capacity);
      formData.append('emergencyContact',data.emergencyContact);
      
      //TODO: call the formAction
      formAction(formData);
      
  }
return (
  
  <Form {...form}>
      <form className='flex flex-col w-full max-w-[500px] gap-4 px-4' onSubmit={form.handleSubmit(onSubmit)}>              
          {
              bloodBankFacilityDetailsItems.map((item)=>(
                  <FormField 
                      key={item.name}
                      name={item.name}
                      control={form.control}
                      render={({field})=>(
                      <FormItem>
                        {/* <FormLabel>{item.displayedName}</FormLabel> */}
                          <FormControl>
                              <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder={item.displayedName} type={item.type}  {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>  
                      )}
                      >
                  </FormField>
              ))
          }

      
          <div className='w-full justify-between flex'>
            <Link href="/registre/basic-information">
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