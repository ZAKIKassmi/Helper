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


export default function AppointmentForm() {
 
  const form = useForm();



  return (
    <Form {...form}>
      <form>
        <DropDownSelector type="bloodBank" form={form}/>

        <FormField
          name='check'
          control={form.control}
          render={({field})=>(
            <FormItem>
              <FormControl>
                <Button className='bg-c-red-500 hover:bg-c-red-600' {...field}>
                  Help me
                </Button>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}          
        />
          
      </form>
    </Form>
  )
}