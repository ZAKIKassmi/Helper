'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {eligibilitySchema, TEligibilitySchema, } from '@/lib/types';
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
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { getBloodBanks } from '../../../general-actions/get-blood-banks';
import { Command, CommandEmpty,CommandList, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import DropDownSelector from '../drop-down-selector';
import LocationIcon from '../icons/location';
import CustomSelect from '../custom-select';
import CustomCalendar from '../custom-calendar';


export default function AppointmentForm() {
 
  const form = useForm();



  return (
    <Form {...form}>
      <form className='w-full flex-col flex gap-4'>

        <DropDownSelector type="bloodBank" form={form}/>

    
        <div className='flex w-full gap-4'>
          <CustomCalendar  name='date' form={form} placeholder='Date'/>
          <CustomSelect placeholder='time' array={null}  name="time" className='w-full' control={form.control}/>
        </div>

        <CustomSelect array={['Each 3 months', 'Each 4 months' , 'Each 5 months','Each 6 months','Each 7 months','Each 8 months','Each 9 months','Each 10 months','Each 11 months','Each 12 months']} name='interval' className='w-full' control={form.control} placeholder='Time Gap Between Donations'/>


          
      </form>
    </Form>
  )
}