import DashboardHeader from '@/components/dashboard/header'
import DashboardSideBar from '@/components/dashboard/side-bar'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({children}: Props) {
  return (
    <>
      <DashboardSideBar/>
      <DashboardHeader/>
      <div>
        {children}
      </div>
    </>
  )
}