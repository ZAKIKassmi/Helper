import DashboardSideBar from '@/components/dashboard/dashboard-side-bar'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({children}: Props) {
  return (
    <>
      <DashboardSideBar className="bg-white border-r bottom-0 top-0 w-60 fixed"/>
      <div>
        {children}
      </div>
    </>
  )
}