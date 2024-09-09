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
        <div className='flex gap-4 justify-center'>

        <DropDownSelector type="bloodBank" form={form} className='flex-1'/>

        <FormField
          name='check'
          control={form.control}
          render={({field})=>(
            <FormItem className='flex-1'>
              <FormControl>
                
                <Button className='bg-c-red-500 hover:bg-c-red-600 w-full'  {...field}>
                  <div className='flex items-center gap-1'>
                    <LocationIcon/>
                    Help me
                  </div>
                </Button>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}          
          />
        </div>
        <div className='flex w-full gap-4'>
          <CustomSelect array={null}  name="time" className='w-full' control={form.control}/>
          <CustomCalendar name='date' form={form} placeholder='Date'/>
        </div>

        
          
      </form>
    </Form>
  )
}