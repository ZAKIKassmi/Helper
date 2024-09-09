'use client';
import {FieldValues, useForm, UseFormReturn} from 'react-hook-form';
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
 } from './ui/form';
import { Button } from './ui/button';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { getBloodBanks } from '../../general-actions/get-blood-banks';
import { Command, CommandEmpty,CommandList, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { countriesCodes } from '@/data/countries';


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
                        : (type == "bloodBank" ? "Select a blood center" : "Select country")}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-[500px] p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>{type == "bloodBank" ? "No blood items found." : "No country found"}</CommandEmpty>
                      <CommandGroup>
                        {items.map((item:any) => (
                          <CommandItem
                            value={item.name}
                            key={item.name}
                            onSelect={() => {
                              form.setValue("item", item.name)
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