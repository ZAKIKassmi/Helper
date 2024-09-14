"use client";
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import CustomCalendar from '../custom-calendar';
import CustomSelect from '../custom-select';
import { Button } from '../ui/button';
import CustomUpload from '../custom-upload';
import { useFormState } from 'react-dom';
import { createEvent } from '@/app/(dashboard)/create-event/_actions/createEvent';
import { eventFormSchema, TEventFormSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

type Props = {}

export default function EventForm({}: Props) {
  const [state, formAction] = useFormState(createEvent, null);
  const form = useForm<TEventFormSchema>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: '',
      address: '',
      description: '',
      date: (new Date().toISOString().split('T')[0]) as unknown as Date,
      startsAt: '09:00:00',
      endsAt: '09:00:00'
    }
  });

  useEffect(()=>{
      if(Array.isArray(state) && state?.length > 0){
          state.forEach((issue: {name: keyof TEventFormSchema, message: string, isToast: boolean, isError:boolean})=>{
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
              }
          });
      }
  },[state]);

  function onSubmit(data:TEventFormSchema){
    const formData = new FormData();
    Object.entries(data).forEach(([key, val])=>{
      formData.append(key as string, val as string);
    });
    formData.append('picture', data.picture[0])
    formAction(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-[30rem] flex-col flex gap-4 w-full mx-auto'>

        <FormField
        name='title'
        control={form.control}
        render={({field})=>(
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input className='focus-visible:ring-0 focus-visible:ring-offset-0' {...field} placeholder='Event Title'/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />

        <FormField
        name='description'
        control={form.control}
        render={({field})=>(
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea className='focus-visible:ring-0 focus-visible:ring-offset-0' {...field} placeholder='Event Description'/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />

      <FormField
        name='address'
        control={form.control}
        render={({field})=>(
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input className='focus-visible:ring-0 focus-visible:ring-offset-0' {...field} placeholder='Event Address'/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        )}
        />

        <CustomCalendar label='Date' name='date' form={form} placeholder='Event Date'
        fromYear={Number(new Date().toISOString().split('T')[0].split('-')[0])}
        toYear={Number(new Date().toISOString().split('T')[0].split('-')[0])+1}/>

        <div className='flex w-full gap-2'>
          <CustomSelect label='Starts At' name='startsAt' control={form.control} array={null}/>
          <CustomSelect label='Ends At' name='endsAt' control={form.control} array={null}/>
        </div>

        <CustomUpload form={form} name='picture' label='Event Picture'/>
      
        <Button className='bg-c-red-500 hover:bg-c-red-600' type='submit'> 
          Create Event
        </Button>

      </form>
    </Form>
  )
}