import React from 'react'
import DashboardTitle from './title'
import DashboardAvatar from './avatar'

type Props = {}

export default function DashboardHeader({}: Props) {
  return (
    <div className='pl-6 pr-10 fixed right-0 left-60 border-b border-n-50 py-3 flex justify-between'>
      <DashboardTitle/>
      <DashboardAvatar/>
    </div>
  )
}