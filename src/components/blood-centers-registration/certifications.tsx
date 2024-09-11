'use client';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { certificationSchema, TCertificationSchema, } from '@/lib/types';
import { 
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
 } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { addCertifications } from '@/app/(bloodBankAuth)/registre/certification-license/_action/action';
import CustomCalendar from '../custom-calendar';

type Props = {}

export default function Certification({}: Props) {


  const [state, formAction] = useFormState(addCertifications, null);
  const [fileInputName, setFileInputName] = useState<string[]>(["upload"]);


  const form = useForm<TCertificationSchema>({
      resolver: zodResolver(certificationSchema),
      defaultValues: {
          licenseNumber: '',
          expiryDate: new Date(),
          certifications: '',
      }
  });
  const router = useRouter();
  useEffect(()=>{
      if(Array.isArray(state) && state?.length > 0){
          state.forEach((issue: {name: keyof TCertificationSchema, errorMessage: string, isToast: boolean, isError:boolean})=>{
              if(!issue.isToast){
                  form.setError(issue.name, {
                      message: issue.errorMessage
                  })
              }
              else if(issue.isToast && issue.isError){
                  toast.error(issue.errorMessage);
              }
              else if(issue.isToast && !issue.isError){
                  toast.success(issue.errorMessage);
                  router.push("/");
              }
          });
      }
  },[state]);

  const fileRef = form.register("certifications");

  async function onSubmit(data: TCertificationSchema){
      const formData = new FormData();
      formData.append('licenseNumber', data.licenseNumber);
      formData.append('expiryDate', String(data.expiryDate));
      for(let i=0; i<3;i++){
        if(data.certifications[i]){
          formData.append('file',data.certifications[i]);
        }
      }
      formAction(formData);
      
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
        

        <CustomCalendar fromYear={Number((new Date().getFullYear() ))} toYear={2050} name='expiryDate' form={form} placeholder='License Expiry Date'/>

                  
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
                You can upload up to 3 certifications
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