"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from 'zod';
import { 
  Form, 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { TVerificationFormSchema, VerificationFormSchema } from "@/lib/types";
import { verifyVerificationCode } from "@/app/(userAuth)/signup/email-verification/_action/action";
import { useFormState } from "react-dom";
import {Toaster, toast} from 'sonner';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { verifyVerificationCodeBloodBank } from "@/app/(bloodBankAuth)/registre/email-verification/_action/action";


export default function VerificationCodeForm({href}:{href:string}) {

  const action = href == "/eligibility" ? verifyVerificationCode : verifyVerificationCodeBloodBank;

  const [state, formAction] = useFormState(action, {
    error: "",
    isError: true
  });

  const router = useRouter();

  useEffect(()=>{
    if(state.isError && state.error.length > 0){
      toast.error(state.error);
    }
    else if(!state.isError && state.error.length > 0){
      toast.success(state.error);
      router.push(href);
    }
  },[state]);


  const form = useForm<TVerificationFormSchema>(
    {
      resolver: zodResolver(VerificationFormSchema),
      defaultValues: {
        verificationCode: ''
      }
    }
  );

  function onSubmit(data: TVerificationFormSchema){ 
    const formData = new FormData();
    formData.append('code', data.verificationCode);
    formAction(formData);
  }
  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center max-w-fit w-full gap-4'>
        <FormField 
          name="verificationCode"
          control={form.control}
          render={({field})=>(
            <FormItem>
                <FormLabel className="text-label-n font-medium">
                  Verification Code
                </FormLabel>
                <FormControl>
                <InputOTP {...field} maxLength={8} className="focus-visible:ring-n-40 focus-visible:ring-offset-n-40 focus:ring-n-40">
                  <InputOTPGroup >
                    <InputOTPSlot  index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator/>
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                  </InputOTPGroup>
                </InputOTP>
                </FormControl>
                <FormMessage/>
                <FormDescription>
                  Email verification code is valid for 5 minutes.
                </FormDescription>
                {/* <FormMessage/> */}
            </FormItem>
          )}
        >
        </FormField>
        
          
          <Button className="w-full bg-c-red-500 hover:bg-c-red-600" type="submit" disabled={form.formState.isSubmitting} >Verify Code</Button>
        
      </form>
    </Form>
    </>

  )
}