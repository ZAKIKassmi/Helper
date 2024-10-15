'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {eligibilitySchema, TEligibilitySchema, } from '@/lib/types';
import { 
    Form, 
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
 } from '../ui/form';
import { Button } from '../ui/button';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Checkbox } from '../ui/checkbox';
import { updateEligibiliye } from '@/app/(userAuth)/eligibility/_action/action';
import { useFormButtonStateToggle } from '@/hooks/form-button-state-toggle';
import SubmitButton from '../submit-button';


export default function EligibilityForm() {

  const [state, formAction] = useFormState(updateEligibiliye, {
    isError: false,
    message: '',
  });
  const toggleButtonState = useFormButtonStateToggle((state)=>state.toggleButtonState);


  const form = useForm<TEligibilitySchema>({
      resolver: zodResolver(eligibilitySchema),
      defaultValues: {
          isEligible: false
      }   
  });
  const router = useRouter();
  useEffect(()=>{
    if(state?.isError){
      toast.error(state.message)
      toggleButtonState();
    }
    if(!state.isError && state.message.length > 0){
      toast.success(state.message);
      router.push('/appointment');
      toggleButtonState();
    }
  },[state]);


  async function onSubmit(data: TEligibilitySchema){
      const formData = new FormData();
      formData.append('isEligible', String(data.isEligible));
      toggleButtonState();
      formAction(formData);
      
  }
return (
  
  <Form {...form}>
      <form className='flex flex-col w-full gap-4' onSubmit={form.handleSubmit(onSubmit)}>              
        
        <FormField 
          name="isEligible"
          control={form.control}
          render={({field}:{field:any})=>(
          <FormItem className='flex flex-row items-end gap-2'>
            
              <FormControl>

              <Checkbox
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
              />
              </FormControl>
              <FormLabel className='pb-[1.3px]'>
              I have read the conditions and confirm that I am eligible to donate blood
              </FormLabel>
              <FormMessage />
          </FormItem>  
          )}
          >
      </FormField>

      <SubmitButton placeholder='Confirm'/>
      </form>
  </Form>
)
}