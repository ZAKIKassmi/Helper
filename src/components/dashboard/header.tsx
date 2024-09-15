import DashboardTitle from './title'
import DashboardAvatar from './avatar'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Menu } from './menu'
import HumburgerIcon from '../icons/Humburger'
import { Suspense } from 'react'


export default async function DashboardHeader() {

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
      <Suspense fallback={<p>Loading...</p>}>
        <DashboardAvatar />
      </Suspense>
    </div>  
  )
}