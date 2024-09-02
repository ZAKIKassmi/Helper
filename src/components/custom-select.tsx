"use client";
import { 
  Form, 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { generateTimeSlots } from '@/lib/generate-time-slots';
import { useMemo } from 'react';


type Props = {
  name:string;
  control: any
}

export default function CustomSelect({name, control}: Props) {

  const timeSlots = useMemo(() => generateTimeSlots("09:00", "22:00", 30), []);


  return (
    <FormField
              key={name}
              name={name}
              control={control}
              render={({field})=>(
                <FormItem className=''>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='focus-visible:ring-n-40 duration-200 focus-visible:ring-offset-n-40 focus:ring-n-40 focus:ring-offset-n-40 w-[100px]'>
                            <SelectValue placeholder="09:00" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          timeSlots.map((time)=>(
                            <SelectItem  key={time} value={`${time}:00`}>{time}</SelectItem>
                          ))
                        }
                      </SelectContent>
                  </Select> 
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
  )
}