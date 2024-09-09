'use client';
import { 
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
 } from './ui/form';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { getBloodBanks } from '../../general-actions/get-blood-banks';
import { Command, CommandEmpty,CommandList, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { countriesCodes } from '@/data/countries';
import LocationIcon from './icons/location';


export default function DropDownSelector({form, type, className}: {form: any, type: 'bloodBank' | 'country' | 'donation', className?: string}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any>([]);
  useEffect(()=>{
    if(type == "bloodBank"){
      const fetchBloodBanks = async()=>{
        const res = await getBloodBanks();
        setItems(res);
        
      }
      fetchBloodBanks()
    }
    else{
      setItems(countriesCodes);
    }
  },[]);

  function handleClick(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
      });
    }
  //   const fetchData = async()=>{
  //     const res = await fetch(`${process.env.HOST_NAME}/api/get-user-location`);
  //     const data = await res.json();
  // }
}
  


  return (
      <FormField
        control={form.control}
        name={type}
        render={({field}:{field: any}) => (
          <FormItem className={`${className} flex flex-col`}>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild >
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "w-full justify-between ",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? items.find(
                          (item:any) => item.name === field.value
                        )?.name
                      : (type === "bloodBank" ? "Select a blood center" : "Select country")}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align='start' className="w-full p-0">
                <Command>
                  {
                    type !== "bloodBank" &&  <CommandInput className='w-full' placeholder="Search country..."/>  

                  }
                  {
                    type == "bloodBank" &&
                    <div className='flex'>
                      <CommandInput placeholder={type === "bloodBank" ? "Search blood bank": "Search country..." }/>  
                      <div className='flex items-center justify-center px-4 border-l border-b cursor-pointer hover:bg-n-40' onClick={handleClick}>
                        <LocationIcon color='#18181b'/>
                      </div>  
                    </div>
                  }

                  <CommandList>
                    <CommandEmpty>{type == "bloodBank" ? "No blood banks found." : "No country found"}</CommandEmpty>
                    <CommandGroup>
                      {items.map((item:any) => (
                        <CommandItem
                          value={item.name}
                          key={item.name}
                          onSelect={() => {
                            form.setValue(type, item.name)
                            setOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              item.name === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {item.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
            {
              type == "country" &&
                <FormDescription>
                  Please verify your data before submitting
                </FormDescription>
            }
          </FormItem>
        )}
      />  

        
     
  )
}