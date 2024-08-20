import VerificationCodeForm from "@/components/global/verificationCodeForm";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";


export default function EmailVerfication() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <VerificationCodeForm/>
    </div>
   
  )
}