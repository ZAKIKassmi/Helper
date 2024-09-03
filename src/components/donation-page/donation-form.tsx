'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BloodBankNameType, BloodBankSchema, donationSchema, TBloodBankSchema, TDonationSchema,  } from '@/lib/types';
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
import CountryCodes from "@/data/CountryCodes.json";
import { Command, CommandEmpty,CommandList, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { Check, ChevronRight, ChevronsUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PaypalIcon from '../icons/paypal-icon';


type Props = {}

export default function DonationForm({}: Props) {
  //TODO: add backend logic

  // const [state, formAction] = useFormState(createUser, null);
  const [passwordState, setPasswordState] = useState<'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Very Strong' | "">("");    
  const [open, setOpen] = useState(false);


  const form = useForm<TDonationSchema>({
      resolver: zodResolver(donationSchema),
      defaultValues: {
          firstName: '',
          lastName: '',
          email:'',
          cardNumber: '',
          monthYear: '',
          cvv: '',
          nameOnCard: '',
          country: '',
          zipCode: '',
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


  async function onSubmit(data: TDonationSchema){
      const formData = new FormData();
      //server actions accept FromData object

      //TODO: call the formAction
      // formAction(formData);
      
  }
return (
  
  <Form {...form}>
      <form className='flex  min-h-[75vh]  flex-col items-center w-full max-w-[37.5rem] gap-4 px-4' onSubmit={form.handleSubmit(onSubmit)}>

         
                  
                  
      
            

            <Accordion className='border rounded-t-xl px-4 w-full mb-0'  type="single" collapsible >
              <AccordionItem  value="donation">
                <AccordionTrigger className='hover:no-underline'>
                  <div className='flex gap-2 justify-start items-center'>
                    <Image src="/icons/creditCard.svg" alt='credit card icon for the donation page' width={36} height={36}/>
                    <p className='text-n-900 text-p-n font-normal'>
                      Credit Card
                    </p>
                  </div>
                </AccordionTrigger>


                <AccordionContent className='p-4'>

                  <div className='flex flex-col items-center w-full max-w-[37.5rem] gap-4 '>

                  


                <div className='flex gap-2 w-full flex-wrap'>
                  <FormField 
                      name="firstName"
                      control={form.control}
                      render={({field})=>(
                      <FormItem className='flex-1'>
                          <FormControl>
                              <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40 min-w-[150px]' placeholder="First name" type="text"  {...field}/>
                          </FormControl>
                          <FormMessage />
                      </FormItem>  
                      )}
                      >
                  </FormField>
                  <FormField 
                      name="lastName"
                      control={form.control}
                      render={({field})=>(
                      <FormItem className='flex-1'>
                          <FormControl>
                              <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40 min-w-[150px]' placeholder="Last name" type="text"  {...field}/>
                          </FormControl>
                          <FormMessage />
                      </FormItem>  
                      )}
                      >
                  </FormField>
                </div>

                <FormField 
                      name="email"
                      control={form.control}
                      render={({field})=>(
                      <FormItem className='flex-1 w-full'>
                          <FormControl>
                              <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder="Email address" type="text"  {...field}/>
                          </FormControl>
                          <FormMessage />
                      </FormItem>  
                      )}
                      >
                  </FormField>

                <FormField 
                      name="cardNumber"
                      control={form.control}
                      render={({field})=>(
                      <FormItem className='flex-1 w-full'>
                          <FormControl>
                              <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder="Card number" type="text"  {...field}/>
                          </FormControl>
                          <FormMessage />
                      </FormItem>  
                      )}
                      >
                  </FormField>

                <div className='flex gap-2 w-full flex-wrap'>
                  <FormField 
                      name="monthYear"
                      control={form.control}
                      render={({field})=>(
                      <FormItem className='flex-1'>
                          <FormControl>
                              <Input maxLength={5} className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40 min-w-[150px]' placeholder="MM/YY" type="text"  {...field}/>
                          </FormControl>
                          <FormMessage />
                      </FormItem>  
                      )}
                      >
                  </FormField>
                  <FormField 
                      name="cvv"
                      control={form.control}
                      render={({field})=>(
                      <FormItem className='flex-1'>
                          <FormControl>
                              <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40 min-w-[150px]' placeholder="CVV" type="text"  {...field}/>
                          </FormControl>
                          <FormMessage />
                      </FormItem>  
                      )}
                      >
                  </FormField>
                </div>
          
                
                  <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col w-full">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild  className='focus:ring-n-40 focus:ring-offset-n-40 w-full'>
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
                                ? CountryCodes.find(
                                    (country) => country.name === field.value
                                  )?.name
                                : "Select country"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className=" max-w-[31.25rem] p-0">
                          <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList>
                              <CommandEmpty>No country found.</CommandEmpty>
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

                  <FormField 
                      name="zipCode"
                      control={form.control}
                      render={({field})=>(
                      <FormItem className='flex-1 w-full'>
                          <FormControl>
                              <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40 min-w-[150px]' placeholder="Zip code" type="text"  {...field}/>
                          </FormControl>
                          <FormMessage />
                      </FormItem>  
                      )}
                      >
                  </FormField>

                

                </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion> 

            <div className=' w-full mt-[-18px]  flex justify-between px-4 items-center text-n-900 text-label-n border py-4 border-t-0  rounded-b-xl'>

              <div className='flex gap-2 items-center'>
                <PaypalIcon/>
                <p>
                  Continue with PayPal
                </p>
              </div>
              <ChevronRight className='h-4 w-4'/>

            </div>

      



          
       

          <div className='w-full justify-end flex'>

            <Button className='flex border w-full rounded-lg gap-2 duration-200 px-8 bg-c-red-500 hover:bg-c-red-600' type="submit" disabled={form.formState.isSubmitting}>
              Donate
            </Button>
          </div>
          

      </form>
  </Form>
)
}