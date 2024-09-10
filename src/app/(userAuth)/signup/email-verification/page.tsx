import VerificationCodeForm from "@/components/user-forms/verificationCodeForm";



export default function EmailVerfication() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <VerificationCodeForm href="/eligibility"/>
    </div>
  )
}