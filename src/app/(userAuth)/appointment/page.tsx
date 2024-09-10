import AppointmentForm from '@/components/user-forms/appointment'
import Logo from '@/components/icons/logo'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Appointment({}: Props) {
  return (
    <div className='relative min-h-screen'>
    <Link href="/" className="flex justify-center pt-8 csz:py-4">
    <Logo/>
    </Link>
    <div className='flex  flex-col gap-4 w-full justify-center items-center min-h-[80vh] py-8 px-2 csxxs:px-4 '>
      <div className="max-w-[35rem] px-4 flex flex-col gap-2 duration-200 basic-information-page ">
          <h1 className="text-h3-d font-bold text-n-900 text-left">Take your first appointment,</h1>
          <p className="text-p-n font-medium text-n-900">
          Once you schedule your first appointment and set your preferred donation interval, we’ll handle future appointment notifications for you. You can adjust the interval at any time.
          </p>
        <AppointmentForm/>
      </div>
    </div>
  </div>
    
  )
}