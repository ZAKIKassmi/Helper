import React from 'react'
import DashboardTitle from './title'
import DashboardAvatar from './avatar'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Sidebar } from './sidebar'
import { Menu } from './menu'
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle'
import { useStore } from '@/hooks/use-store'
import HumburgerIcon from '../icons/Humburger'

type Props = {}

export default function DashboardHeader({}: Props) {

  return (
    <div className=' px-8 py-3 flex items-center justify-between'>
      <Sheet>
        <SheetTrigger className='lg:hidden'>
          <HumburgerIcon width='24' height='24'/>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] ">
          <Menu isOpen={true}/> 
        </SheetContent>
      </Sheet>
      <DashboardTitle/>
      <DashboardAvatar/>    
    </div>
  )
}