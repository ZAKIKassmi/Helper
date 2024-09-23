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
import {bloodBankBasicInformationItems} from '@/lib/constants';
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
import Balancer from 'react-wrap-balancer';
import { Slider } from '../ui/slider';
import DropDownSelector from '../drop-down-selector';


type Props = {}

export default function DonationForm({}: Props) {
  //TODO: add backend logic

  // const [state, formAction] = useFormState(createUser, null);
  const [amount, setAmount] = useState<number>(0);
  const [tip, setTip] = useState(0);
  const [step, setStep] = useState(0);
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
          amount: Number(parseFloat("0").toFixed(2))
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

  function handleSlider(e: number){
    setTip((amount*e)/100);
    setStep(e);
  }


  async function onSubmit(data: TDonationSchema){
      const formData = new FormData();
      //server actions accept FromData object

      //TODO: call the formAction
      // formAction(formData);
      
  }
return (
  
  <Form {...form}>
      <form className='flex  min-h-[75vh]  flex-col items-center w-full max-w-[40rem] gap-4 px-4' onSubmit={form.handleSubmit(onSubmit)}>

          <div className='flex flex-col w-full mb-4'>
            <p className='sm:text-h5-d font-bold mb-4 text-h6-d'>Enter your donation</p>
            <FormField 
                name="amount"
                control={form.control}
                render={({field})=>(
                <FormItem className='flex-1 w-full'>
                    <FormControl>
                      <div className='relative'>
                        <p className='absolute left-4 top-1/2 -translate-y-1/2 font-bold text-h2-d'>
                          $
                        </p>
                        <Input
                        
                        className='focus-visible:ring-n-40 rounded-xl focus-visible:ring-offset-n-40 h-16 pl-11 text-4xl font-bold'  type="text"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);  
                          setAmount(Number(e.target.value));
                          setTip((Number(e.target.value)*step)/100);
                        }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>  
                )}
                >
            </FormField>
          </div>
                  
          <div className='flex flex-col w-full mb-4'>
            <p className='sm:text-h5-d font-bold mb-4 text-h6-d'>Tip Helper</p>
            <p className='mb-16 text-p-n font-medium'>
                Helper has a 0% platform fee for organizers. Helper will continue offering  its services thanks to donors who will leave an optional amount here:
            </p>
            <Slider customStep={step} tip={tip} onValueChange={(e)=>{handleSlider(e[0])}} defaultValue={[0]} max={30} step={1} />
          </div>        
      

          <div className='flex flex-col gap-0 w-full'>
            <p className='sm:text-h5-d font-bold mb-4 text-h6-d'>
              Payment Method
            </p>
          

            <Accordion className='border rounded-t-xl px-4 w-full mb-0'  type="single" collapsible >
              <AccordionItem  value="donation">
                <AccordionTrigger className='hover:no-underline'>
                  <div className='flex gap-2 justify-start items-center'>
                    <Image src="/icons/creditcard.svg" alt='credit card icon for the donation page' width={36} height={36}/>
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
                
                <DropDownSelector type='donation' form={form} className='w-full'/>
                 

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

            <div className=' w-full flex justify-between px-4 items-center text-n-900 text-label-n border py-4 border-t-0  rounded-b-xl'>

              <div className='flex gap-2 items-center'>
                <PaypalIcon/>
                <p>
                  Continue with PayPal
                </p>
              </div>
              <ChevronRight className='h-4 w-4'/>

            </div>

          </div>


          <div className='w-full flex flex-col gap-3'>
            <p className='text-label-n font-bold'>
              Your donation
            </p>
            <div className='flex flex-col gap-2'>
              <div className='text-muted-foreground text-label-s font-medium flex justify-between'>
                <p>Total Amount</p>
                <p>{`$${(amount ? amount : 0).toFixed(2)}`}</p>
              </div>
              <div className='text-muted-foreground text-label-s font-medium flex justify-between'>
                <p>Helper Tip</p>
                <p>{`$${(tip || 0).toFixed(2)}`}</p>
              </div>
            </div>
          </div>



          
       

          <div className='w-full justify-end flex'>

            <Button className='flex border w-full rounded-lg gap-2 duration-200 px-8 bg-c-red-500 hover:bg-c-red-600' type="submit" disabled={form.formState.isSubmitting}>
              Donate
            </Button>
          </div>

          <p className='text-p-s  text-muted-foreground '>
            

          By choosing the payment method above, you agree to the Helper <span className='text-n-900 underline cursor-pointer'> Terms of Service </span>  and acknowledge the <span className='text-n-900 underline cursor-pointer'> Privacy Notice. </span>
            
          </p>

      </form>
  </Form>
)
}