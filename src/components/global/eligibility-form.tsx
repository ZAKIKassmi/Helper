'use client';
import {useForm, useFormContext} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BloodBankFacilityNameTypes, facilityDetailsSchema, TFacilityDetails,  } from '@/lib/types';
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
import {bloodBankFacilityDetailsItems} from '@/lib/constants';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { addFacilityDetails } from '@/app/(bloodBankAuth)/registre/facility-details/_action/action';
import Arrow from '../icons/arrow';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';


type Props = {}

export default function EligibilityForm({}: Props) {

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
      // formAction(formData);
      
  }
return (
  
  <Form {...form}>
      <form className='flex flex-col w-full max-w-[560px] gap-4 px-4' onSubmit={form.handleSubmit(onSubmit)}>              
        
              <FormField 
                        name="capacity"
                        control={form.control}
                        render={({field})=>(
                        <FormItem>
                          
                            <FormControl>

                            
                            </FormControl>
                            <FormMessage />
                        </FormItem>  
                        )}
                        >
                    </FormField>
                    
                    <div className='w-full justify-end flex'>
                      <Button className='flex w-full border px-8 rounded-lg gap-2  duration-200 bg-white text-n-900 hover:bg-n-20' type="submit" disabled={form.formState.isSubmitting}>
                        I've read condition, and I confirm that I'm eligible
                      </Button>
                    </div>
                  
              
        

      
          
          

      </form>
  </Form>
)
}