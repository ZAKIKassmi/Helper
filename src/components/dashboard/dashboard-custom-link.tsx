"use client";
import Link from 'next/link'
import React from 'react'
import DashboardIcons from '../icons/dashboard-icons'
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  iconType: string;
  label: string;
}

export default function DashboardCustomLink({href, iconType, label}: Props) {
  const pathname = usePathname();
  return (
    <Link href={href} className={cn('flex items-center justify-start gap-2 w-full  py-4 px-11 text-n-200 hover:text-c-red-500 stroke-[#747476] hover:stroke-c-red-500 duration-300 stroke-1',{
      "stroke-c-red-500 text-c-red-500": pathname === href
    })}>
      <DashboardIcons type={iconType}/>
      <p className=' text-label-n '>
        {label}
      </p>
    </Link>
  )
}