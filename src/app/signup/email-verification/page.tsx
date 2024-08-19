import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";


export default function EmailVerfication() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center '>
      <h1>Please enter the verification code</h1>
      <p>We have sent a verification code to your email</p>
      <InputOTP maxLength={6}>
        <InputOTPGroup >
          <InputOTPSlot className="border-black" index={0} />
          <InputOTPSlot className="border-black" index={1} />
          <InputOTPSlot className="border-black" index={2} />
          <InputOTPSlot className="border-black" index={3} />
          <InputOTPSlot className="border-black" index={4} />
          <InputOTPSlot className="border-black" index={5} />
        </InputOTPGroup>
    </InputOTP>
    <Button type="submit">
          Verify Code
        </Button> 

    </div>
  )
}