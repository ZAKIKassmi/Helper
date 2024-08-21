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
import { verifyVerificationCode } from "@/app/signup/email-verification/_action/action";
import { useFormState } from "react-dom";
import {Toaster, toast} from 'sonner';
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function VerificationCodeForm() {

  const [state, formAction] = useFormState(verifyVerificationCode, {
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
      router.push("/");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col items-center max-w-[450px] w-full gap-4'>
        <FormField 
          name="verificationCode"
          control={form.control}
          render={({field})=>(
            <FormItem>
                <FormLabel>
                    Verification Code
                </FormLabel>
                <FormControl>
                <InputOTP {...field} maxLength={8}>
                  <InputOTPGroup>
                    <InputOTPSlot  index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
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
                We have sent a verification code to your email.
                </FormDescription>
                {/* <FormMessage/> */}
            </FormItem>
          )}
        >
        </FormField>
        <Button className="w-full" type="submit" disabled={form.formState.isSubmitting} >Verify Code</Button>  
      </form>
    </Form>
    </>

  )
}