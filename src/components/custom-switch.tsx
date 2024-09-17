import { useState } from 'react';
import { 
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from './ui/form';
import { Switch } from './ui/switch';


type Props = {
  name:string;
  control: any;
  state?: boolean;
}

export default function CustomSwitch({name, state, control}: Props) {
  const [isOpen, setIsOpen] = useState(state || false);

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