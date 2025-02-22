"use client";
import { cn } from '@/lib/utils';
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
import { useMemo, useState } from 'react';


type Props = {
  name:string;
  control: any;
  label?: string;
  array: string[] | null;
  placeholder?: string;
  className?: string
}

export default function CustomSelect({name, control, array,placeholder,className,label}: Props) {

  const timeSlots = useMemo(() => generateTimeSlots("09:00", "22:00", 30), []);
  const [isSelected, setisSelected] = useState(false);


  return (
    <FormField
              key={name}
              name={name}
              control={control}
              render={({field})=>(
                <FormItem className='w-full'>
                  {
                    label &&  <FormLabel>
                      {label}
                    </FormLabel>
                  }
                  <FormControl>
                    <Select onValueChange={(data)=>{
                      field.onChange(data);
                      setisSelected(true)
                    }} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={cn(`focus:ring-0 focus:ring-offset-0 text-muted-foreground w-full`,{
                          "text-n-900": isSelected,
                          "min-w-[100px] w-full": !array,
                        })}>
                            <SelectValue placeholder={placeholder || "09:00"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          !array ?
                          timeSlots.map((time)=>(
                            <SelectItem  key={time} value={`${time}:00`}>{time}</SelectItem>
                          )) : (
                            array.map((item, index)=>(
                              <SelectItem key={item} value={name=="gender" ? item: String(index+1)}>
                                  {item}
                              </SelectItem>
                            ))
                          )
                        }
                      </SelectContent>
                  </Select> 
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
  )
}