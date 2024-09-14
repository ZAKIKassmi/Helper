"use client";
import Link from "next/link";
import UserHeartIcon from "./icons/user-heart";
import DashboardIcons from "./icons/dashboard-icons";
import { useSearchParams } from "next/navigation";


export default function UserType() {

  const searchParams = useSearchParams();
  const path = searchParams.get('path');

  return (
    <div className='flex flex-col w-full gap-8 h-screen items-center justify-center'>
      <h3 className=' text-h6-d csz:text-h3-d font-bold '>Please Select Your Role</h3>

      
      <div className='flex flex-wrap gap-4'>
        <Link href={path === 'signup' ? '/signup' : '/login?type=user'} className='flex flex-col max-csz:flex-1  max-csz:mx-4 p-14 items-center justify-center border rounded-lg text-n-900 cursor-pointer hover:bg-n-20 duration-200 text-label-n font-medium gap-3'>

            <UserHeartIcon/>
            <p className='min-w-[100px] text-center'>Donor</p>
        </Link>
     
        <Link href={path === 'signup' ? "/registre/basic-information" : "/login?type=bloodBank"} className='flex  flex-col max-csz:flex-1 max-csz:mx-4 justify-center items-center p-14 gap-3 rounded-lg border cursor-pointer text-n-900 hover:bg-n-20  duration-200 text-label-n font-medium'>
        <div className="stroke-n-900 stroke-[1.5]">
            <DashboardIcons type="home-hospital"/>
        </div>
              <p className='text-center whitespace-nowrap'>Blood Center</p> 
        </Link>
      </div>
      
      



    </div>
  )
}