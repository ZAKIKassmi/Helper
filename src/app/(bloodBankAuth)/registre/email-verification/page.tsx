import VerificationCodeForm from "@/components/user-forms/verificationCodeForm";



export default function EmailVerfication() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <VerificationCodeForm href="/registre/facility-details"/>
    </div>
  )
}