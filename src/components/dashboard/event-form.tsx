"use client";
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import CustomCalendar from '../custom-calendar';
import CustomSelect from '../custom-select';
import { Button } from '../ui/button';
import CustomUpload from '../custom-upload';

type Props = {}

export default function EventForm({}: Props) {

  const form = useForm();

  function onSubmit(data:any){

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='max-w-[30rem] flex-col flex gap-4 w-full mx-auto'>

        <FormField
        name='eventTitile'
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
        name='eventDescription'
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
        name='eventAddress'
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

        <CustomCalendar label='Date' name='eventDate' form={form} placeholder='Event Date'
        fromYear={Number(new Date().toISOString().split('T')[0].split('-')[0])}
        toYear={Number(new Date().toISOString().split('T')[0].split('-')[0])+1}/>

        <div className='flex w-full gap-2'>
          <CustomSelect label='Starts At' name='eventStartsTime' control={form.control} array={null}/>
          <CustomSelect label='Ends At' name='eventEndsTime' control={form.control} array={null}/>
        </div>

        <CustomUpload form={form} name='eventImage' label='Event Picture'/>
      
        <Button className='bg-c-red-500 hover:bg-c-red-600'> 
          Create Event
        </Button>
        




      </form>
    </Form>
  )
}