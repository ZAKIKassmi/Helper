import { useState } from 'react';
import { 
  Form, 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { generateTimeSlots } from '@/lib/generate-time-slots';

type Props = {
  name:string;
  control: any
}

export default function CustomSwitch({name, control}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
              key={name}
              name={name}
              control={control}
              render={({field})=>(
                <FormItem>
                  <FormControl>
                        <div className='flex gap-2'>
                          <Switch
                            className='duration-500'

                            onClick={()=>{
                              setIsOpen(i=>!i)
                            }}

                            checked={field.value}
                            onCheckedChange={field.onChange}
                            
                            />
                          {
                            isOpen ? <div className='text-label-n font-medium'>Open</div> : <div className='text-label-n font-medium'>Close</div>
                          } 
                          
                        </div>                    
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}/>
  )
}