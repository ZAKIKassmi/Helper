import DashboardLayout from '@/components/dashboard/dashboard-layout'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({children}: Props) {
  
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}