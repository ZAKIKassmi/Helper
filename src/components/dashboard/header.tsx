import React from 'react'
import DashboardTitle from './title'
import DashboardAvatar from './avatar'

type Props = {}

export default function DashboardHeader({}: Props) {
  return (
    <div className='px-4 fixed right-0 left-60 border-b border-n-50 py-4 flex justify-between'>
      <DashboardTitle/>
      <DashboardAvatar/>
    </div>
  )
}