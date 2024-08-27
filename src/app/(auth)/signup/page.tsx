// import dynamic from "next/dynamic";
// const CustomForm = dynamic(()=>import('@/components/global/form'), {ssr: false});

import CustomForm from "@/components/global/form";

export default function Page() {
  return (
    <div className=" flex w-full h-screen justify-center items-center overflow-scroll">
        <CustomForm/>
    </div>
  )
}