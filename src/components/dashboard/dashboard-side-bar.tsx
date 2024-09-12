import { dashboardItems } from '@/lib/constants';
import Link from 'next/link';
import React, { Suspense } from 'react'
import DashboardIcons from '../icons/dashboard-icons';
import Logo from '../icons/logo';
import { Separator } from '../ui/separator';
import Logout from '../skeletons/logout';
import LogOutForm from '../user-forms/logoutFrom';
import DashboardCustomLink from './dashboard-custom-link';


export default function DashboardSideBar() {
  return (
    <div className={`bg-white bottom-0 top-0 w-60 border-r border-n-50 fixed flex flex-col justify-between py-6`}>

    <div className={` flex flex-col gap-4 items-center `}>
      <Link href="/">
        <Logo/> 
      </Link>

      <div className='flex flex-col  mt-16 w-full'>
      {
        dashboardItems.map((item)=>(
          <DashboardCustomLink label={item.name} href={item.href} iconType={item.type}/>
        ))
      }
      </div>
      
      <Separator className='w-40 bg-n-50'/>
      <DashboardCustomLink href='/dashboard/settings' iconType='settings' label='Settings'/>

    </div>


    <Suspense fallback={<Logout/>}>
      <LogOutForm/>
    </Suspense>
    </div>

  )
}