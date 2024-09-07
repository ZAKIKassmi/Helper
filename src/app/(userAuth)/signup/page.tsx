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
    <div className=" flex flex-col gap-4 w-full min-h-[120vh] sm:h-screen justify-center items-center">
      <div className="max-w-[500px] px-4 flex flex-col gap-2">
          <h1 className="text-h3-d font-bold text-n-900 text-left">Join Helper,</h1>
          <p className="text-p-n text-n-900">
          Helper assists in managing your blood donation schedules
          to ensure a steady hospital blood supply.
          </p>
        </div>
        <CustomForm/>
    </div>
    </>
  )
}