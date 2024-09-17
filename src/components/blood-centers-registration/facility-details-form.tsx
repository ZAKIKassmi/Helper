'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BloodBankFacilityNameTypes, facilityDetailsSchema, TFacilityDetails,  } from '@/lib/types';
import { 
    Form, 
    FormControl,
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
import { addFacilityDetails } from '@/app/(bloodBankAuth)/registre/facility-details/_action/action';
import { PhoneInput } from '../ui/phone-number';


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
  useEffect(()=>{

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
      formData.append('donationBeds', data.donationBeds);
      formData.append('capacity', data.capacity);
      formData.append('emergencyContact',data.emergencyContact);
    
      formAction(formData);
      
  }
return (
  
  <Form {...form}>
      <form className='flex flex-col w-full max-w-[500px] gap-4 px-4' onSubmit={form.handleSubmit(onSubmit)}>              
          {
              bloodBankFacilityDetailsItems.filter((item)=> item.name!=="emergencyContact").map((item)=>(
                  <FormField 
                      key={item.name}
                      name={item.name}
                      control={form.control}
                      render={({field})=>(
                      <FormItem>
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
          <FormField
          name="emergencyContact"
          control={form.control}
          render={({field})=>(
          <FormItem>
              <PhoneInput className="focus:outline-none focus:ring-0" {...field}
              international
              defaultCountry='MA'
              placeholder='Enter a phone number'/>
              <FormMessage />
          </FormItem>  
          )}
      />

      
          <div className='w-full justify-end flex'>
              <Button className='flex border px-8 rounded-lg gap-2  duration-200 bg-white hover:bg-n-20' type="submit" disabled={form.formState.isSubmitting}>
                <p className='text-n-900'>Next</p>
                <Image src="/icons/Arrow.svg" alt='Arrow Icon' width={15} height={18}/>
              </Button>
          </div>
          

      </form>
  </Form>
)
}