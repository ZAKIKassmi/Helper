'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BloodBankNameType, BloodBankSchema, TBloodBankSchema,  } from '@/lib/types';
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
import { Input } from '../ui/input';
import {bloodBankBasicInformationItems, signupItems} from '@/lib/constants';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import CountryCodes from "@/data/CountryCodes.json";
import { Command, CommandEmpty,CommandList, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { ScrollArea } from '../ui/scroll-area';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';


type Props = {}

export default function BasicInformationRegistrationForm({}: Props) {
  //TODO: add backend login later

  // const [state, formAction] = useFormState(createUser, null);
  const [passwordState, setPasswordState] = useState<'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Very Strong' | "">("");    
  const [open, setOpen] = useState(false);


  const form = useForm<TBloodBankSchema>({
      resolver: zodResolver(BloodBankSchema),
      defaultValues: {
          email: '',
          name: '',
          password: '',
          confirmPassword: '',
          address: '',
          country: '',
      }   
  });
  const router = useRouter();
  //prefetch the email verification route.
  // useEffect(()=>{
  //     if(Array.isArray(state) && state?.length > 0){
  //         state.forEach((issue: {name: BloodBankNameType, errorMessage: string, isToast: boolean, isError:boolean})=>{
  //             if(!issue.isToast){
  //                 form.setError(issue.name, {
  //                     message: issue.errorMessage
  //                 })
  //             }
  //             else if(issue.isToast && issue.isError){
  //                 toast.error(issue.errorMessage);
  //             }
  //             else if(issue.isToast && !issue.isError){
  //                 toast.success(issue.errorMessage);
  //                 router.push("/signup/email-verification");
  //             }
  //         });
  //     }
  // },[state]);

  function evaluatePasswordStrength(password: string) {
      const result = zxcvbn(password);
      if (password.length === 0) {
        setPasswordState('');
        return;
      }
      switch (result.score) {
          case 0:
              setPasswordState('Very Weak');
              break;
          case 1:
              setPasswordState('Weak');
              break;
          case 2:
              setPasswordState('Moderate');
              break;
          case 3:
              setPasswordState('Strong');
              break;
          case 4:
              setPasswordState('Very Strong');
              break;
          default:
              setPasswordState("");
      }
  }

  async function onSubmit(data: TBloodBankSchema){
      if(zxcvbn(data.password).score < 3){
          toast.error("Your password needs to be stronger. Please include a mix of letters, numbers, and special characters for better security.");
          return null;
      }
      if(data.password !== data.confirmPassword){
          toast.error("Passwords do not match!!");
          return null;
      }
      const formData = new FormData();
      //server actions accept FromData object
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('country', data.country);
      formData.append('address', data.address);
      formData.append('password', data.password);
      formData.append('confirmPassword', data.confirmPassword);
      //call the formAction
      // formAction(formData);
      
  }
return (
  
  <Form {...form}>
      <form className='flex flex-col max-w-[500px] w-full gap-4 px-4 ' onSubmit={form.handleSubmit(onSubmit)}>              
          {
              bloodBankBasicInformationItems.map((item)=>(
                  <FormField 
                      key={item.name}
                      name={item.name}
                      control={form.control}
                      render={({field})=>(
                      <FormItem>
                          <FormControl>
                              <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder={item.displayedName} type={item.type}  {...field} 
                                  onChange={(e) => {
                                      field.onChange(e);
                                      if (item.name === 'password') {
                                          evaluatePasswordStrength(e.target.value);
                                      }
                                  }}
                              />
                          </FormControl>
                          {item.name === 'password' && <FormDescription className={
                                !passwordState ? "hidden" :
                                passwordState === "Weak" ? "text-orange-500" :
                                passwordState === "Very Weak" ? "text-red-500" :
                                passwordState === "Moderate" ? "text-yellow-500" :
                                passwordState === "Strong" ? "text-green-500" :
                                "text-blue-500"
                              }>
                                  {passwordState}
                              </FormDescription>}
                          <FormMessage />
                      </FormItem>  
                      )}
                      >
                  </FormField>
              ))
          }

          {/* 
              TODO: the following fields needs to be added to the formdata and get inserted into the db.
          */}
          <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? CountryCodes.find(
                            (country) => country.name === field.value
                          )?.name
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {CountryCodes.map((country) => (
                          <CommandItem
                            value={country.name}
                            key={country.name}
                            onSelect={() => {
                              form.setValue("country", country.name)
                              setOpen(false)
                              
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                country.name === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {country.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />



          {/* TODO: add User phone number input */}
       


         <Button className='bg-c-red-500 hover:bg-c-red-600 duration-200' type="submit" disabled={form.formState.isSubmitting}>
          Sign Up
          </Button>

      </form>
  </Form>
)
}