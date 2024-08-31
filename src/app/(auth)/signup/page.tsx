// import dynamic from "next/dynamic";
// const CustomForm = dynamic(()=>import('@/components/global/form'), {ssr: false});

import CustomForm from "@/components/global/form";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Link href="/" className="flex justify-center pt-8 csz:pt-4">
      <Image src="/images/Helper..svg" width={86} height={31} alt='Helper Logo Icon'/>
      </Link>
    <div className=" flex w-full h-screen justify-center items-center">
        <CustomForm/>
    </div>
    </>
  )
}