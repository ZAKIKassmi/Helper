import LoginForm from "@/components/global/loginForm";
import Image from "next/image";
import Link from "next/link";



export default function Page() {  
  return (
    <>
    <Link href="/" className="flex justify-center  csz:pt-4">
      <Image src="/images/Helper..svg" width={86} height={31} alt='Helper Logo Icon'/>
      </Link>
    <div className="relative w-full h-[90vh] flex items-center justify-center">
        <LoginForm/>
    </div>
    </>
  )
}