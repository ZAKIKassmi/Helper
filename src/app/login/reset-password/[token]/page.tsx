import ResetPasswordForm from "@/components/global/resetPasswordForm";


export default function Page({ token }: { token: string}){
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <ResetPasswordForm/>
    </div>
  )
}