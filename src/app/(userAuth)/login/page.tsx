import LoginForm from "@/components/global/loginForm";
import Image from "next/image";
import Link from "next/link";



export default function Page() {  
  return (
    <>
    <Link href="/" className="flex justify-center  csz:pt-4">
      <Image src="/images/Helper..svg" width={86} height={31} alt='Helper Logo Icon'/>
      </Link>
    <div className="relative w-full h-[90vh] flex flex-col items-center justify-center">
      <div className="max-w-[500px] px-4 flex flex-col gap-2">
        <h1 className="text-h3-d font-bold text-n-900 text-left">Welcome Back!</h1>
        <p className="text-p-n text-n-900">
        Let’s manage the blood supply together and make a difference for millions of people worldwide!
        </p>
      </div>
        <LoginForm/>
    </div>
    </>
  )
}