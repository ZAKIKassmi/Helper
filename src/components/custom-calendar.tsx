import React, { useState } from 'react'
import { FormField, FormItem, FormMessage } from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import CalenderIconSVG from './icons/calendar';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

type Props = {
  name: string,
  form: any,
  className?: string,
  placeholder: string,
  fromYear?: number,
  toYear?: number,
}

export default function CustomCalendar({name, form, className, placeholder, fromYear, toYear}: Props) {
  const [date, setDate] = useState<Date>()
  const [iconColor, setIconColor] = useState('#ACACAD');
  return (
    <FormField
      name={name}
      control={form.control}
      render={({field})=>(
      <FormItem className='w-full'>
          <Popover>
              <PopoverTrigger asChild className='w-full'>
                  <Button
                  variant={"outline"}
                  className={cn("justify-start gap-1 text-left font-normal w-full ", !date && "text-muted-foreground")}
                  >
                  <CalenderIconSVG color={iconColor}/>
                  {date ? format(date, "PPP") : <span>{placeholder}</span>}
                  </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-full p-0">
                  <Calendar
                  mode="single"
                  captionLayout="dropdown-buttons"
                  selected={date}
                  onSelect={(date)=>{
                      setDate(date);
                      field.onChange(date);
                      setIconColor("#242426")
                  }}
                  fromYear={fromYear || 1960}
                  toYear={toYear || 2024}
                  />
              </PopoverContent>
              </Popover>
            <FormMessage />
        </FormItem>  
        )}
        />
)
}