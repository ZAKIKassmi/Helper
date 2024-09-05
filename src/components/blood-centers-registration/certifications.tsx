'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { certificationSchema, facilityDetailsSchema, TCertificationSchema, TFacilityDetails,  } from '@/lib/types';
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
import {bloodBankBasicInformationItems, bloodBankFacilityDetailsItems, signupItems} from '@/lib/constants';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import CountryCodes from "@/data/CountryCodes.json";
import { Command, CommandEmpty,CommandList, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { CalendarIcon, Check, ChevronsUpDown, UploadIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { facilityDetails } from '@/drizzle/schema';
import Link from 'next/link';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { Matcher } from 'react-day-picker';


type Props = {}

export default function Certification({}: Props) {
  //TODO: add backend logic

  // const [state, formAction] = useFormState(createUser, null);
  const [fileInputName, setFileInputName] = useState<string[]>(["upload"]);


  const form = useForm<TCertificationSchema>({
      resolver: zodResolver(certificationSchema),
      defaultValues: {
          licenseNumber: '',
          expiryDate: new Date(),
          certifications: '',
      }
  });

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

  const fileRef = form.register("certifications");

  async function onSubmit(data: TCertificationSchema){
      // const formData = new FormData();
      console.log(data.expiryDate);
      console.log(data.certifications);

      //TODO: call the formAction
      // formAction(formData);
      
  }

return (
  
  <Form {...form}>
      <form className='flex flex-col w-full max-w-[550px] gap-4 px-4' 
      onSubmit={form.handleSubmit(onSubmit)}
      >              
                  <FormField
                      name="licenseNumber"
                      control={form.control}
                      render={({field})=>(
                      <FormItem>
                          <FormControl>
                              <Input className='focus-visible:ring-n-40 focus-visible:ring-offset-n-40' placeholder="License Number" type="text"  {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>  
                      )}
                      />
                  




                  <FormField
                      name="expiryDate"
                      control={form.control}
                      render={({field})=>(
                      <FormItem>
                          <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left w-full font-normal gap-2 flex justify-start",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <Image src="/icons/calendar.svg" alt='calendar icon svg' width={24} height={24}/>

                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>License Expiry Date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    //@ts-ignore
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                License expiry date
              </FormDescription>
                          <FormMessage />
                      </FormItem>  
                      )}
                      />
                  
              <FormField
                  name="certifications"
                  control={form.control}
                  render={({field})=>(
                  <FormItem>
                      <FormControl>
                        <div className='w-full border rounded-lg relative py-2 flex pl-3 gap-2 items-center hover:border-n-70 duration-200'>
                          <Image src="/icons/upload.svg" alt='upload icon svg' width={24} height={24}/>
                          <p className='text-left w-full font-normal gap-2 flex justify-start text-label-s file:bg-transparent file:text-sm file:font-medium text-muted-foreground 
                         
                          ' >
                            {fileInputName}
                          </p>
                          <Input className='focus-visible:ring-n-40 left-0 opacity-0 absolute top-0 focus-visible:ring-offset-n-40' type="file" {...fileRef} multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files || []);
                            setFileInputName(files.map(file => `${file.name?.split('\\').pop()}, ` || ''));
                          }}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Upload at least one certification
                      </FormDescription>
                      <FormMessage />
                  </FormItem>  
                  )}
                  />

                  
            

      
          <div className='w-full justify-between flex'>
             <Link href="/registre/facility-details">
              <Button className='flex border rounded-lg gap-2 px-6 duration-200  bg-white hover:bg-n-20' disabled={form.formState.isSubmitting}>
                  <Image src="/icons/Arrow-left.svg" alt='Arrow Icon' width={15} height={18}/>
                  <p className='text-n-900'>Go Back</p>
                </Button>
            </Link> 
              <Button className='flex border px-8 rounded-lg gap-2  duration-200 bg-c-red-500 hover:bg-c-red-600 text-white' type="submit" disabled={form.formState.isSubmitting}>
                Create
              </Button>
          </div>
          
          

      </form>
  </Form>
)
}