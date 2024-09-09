import AppointmentForm from '@/components/global/appointment'
import React from 'react'

type Props = {}

export default function Appointment({}: Props) {
  return (
    <div className='flex items-center min-h-screen justify-center'>
      <AppointmentForm/>
    </div>
  )
}