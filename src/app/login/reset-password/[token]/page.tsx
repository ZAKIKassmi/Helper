import ResetPasswordForm from "@/components/global/resetPasswordForm";


export default function Page({ params:{token} }: { params: {token:string}}){
  
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center">
      <ResetPasswordForm token={token}/>
    </div>
  )
}