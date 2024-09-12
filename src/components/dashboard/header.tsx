import React from 'react'
import DashboardTitle from './title'
import DashboardAvatar from './avatar'

type Props = {}

export default function DashboardHeader({}: Props) {
  return (
    <div className=' px-8   py-3 flex items-center justify-between'>
      <DashboardTitle/>
      <DashboardAvatar/>    
    </div>
  )
}