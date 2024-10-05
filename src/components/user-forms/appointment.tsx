'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {appointmentSchema, eligibilitySchema, TAppointmentSchema, TEligibilitySchema, } from '@/lib/types';
import { 
    Form,
 } from '../ui/form';
import { Button } from '../ui/button';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import DropDownSelector from '../drop-down-selector';
import CustomSelect from '../custom-select';
import CustomCalendar from '../custom-calendar';
import { setAppointment } from '@/app/(userAuth)/appointment/_action/set-appoitment';
import { useFormButtonStateToggle } from '@/hooks/form-button-state-toggle';
import SubmitButton from '../submit-button';


export default function AppointmentForm() {

  const [state, formAction] = useFormState(setAppointment,null);
  const toggleButtonState = useFormButtonStateToggle((state)=>state.toggleButtonState);

  const form = useForm<TAppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
    }    
  );
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  useEffect(()=>{
    if(Array.isArray(state) && state?.length > 0){
        state.forEach((issue: {name: keyof TAppointmentSchema, message: string, isToast: boolean, isError:boolean})=>{
            if(!issue.isToast){
                form.setError(issue.name, {
                    message: issue.message
                })
            }
            else if(issue.isToast && issue.isError){
                toast.error(issue.message);
            }
            else if(issue.isToast && !issue.isError){
                toast.success(issue.message);
                router.push("/account");
            }
        });
        toggleButtonState();
    }
  },[state]);


  function onSubmit(data:TAppointmentSchema){
    const formData = new FormData();
    formData.append('bloodBank', data.bloodBank);
    formData.append('date', String(data.date));
    formData.append('time', data.time);
    formData.append('interval', data.interval);
    toggleButtonState();

    formAction(formData);

  }

  return (
    <Form {...form}>
      <form className='w-full flex-col flex gap-4' onSubmit={form.handleSubmit(onSubmit)}>

        <DropDownSelector type="bloodBank" form={form}/>

    
        <div className='flex w-full gap-4 flex-wrap csz:flex-nowrap'>
          <CustomCalendar fromYear={currentYear} toYear={currentYear+2}  name='date' form={form} placeholder='Date'/>
          <CustomSelect placeholder='time' array={null}  name="time"  control={form.control}/>
        </div>

        <CustomSelect array={['Each 3 months', 'Each 4 months' , 'Each 5 months','Each 6 months','Each 7 months','Each 8 months','Each 9 months','Each 10 months','Each 11 months','Each 12 months']} name='interval' className='w-full' control={form.control} placeholder='Time Gap Between Donations'/>
        <SubmitButton/>
          
      </form>
    </Form>
  )
}