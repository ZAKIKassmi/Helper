import DashboardSideBar from '@/components/dashboard/dashboard-side-bar'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({children}: Props) {
  return (
    <>
      <DashboardSideBar/>
      <div>
        {children}
      </div>
    </>
  )
}