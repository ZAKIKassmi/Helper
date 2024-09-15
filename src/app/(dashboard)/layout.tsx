import DashboardLayout from '@/components/dashboard/dashboard-layout'
import DashboardHeader from '@/components/dashboard/header'
import { ReactNode } from 'react';


type Props = {
  children: ReactNode
}

export default function Layout({children}: Props) {
  return (  
    <DashboardLayout>
      <DashboardHeader/>
      {children}
    </DashboardLayout>
  )
}