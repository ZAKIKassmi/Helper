import BasicInformationRegistrationForm from '@/components/blood-centers-registration/basic-information-form'
import React from 'react'

type Props = {}

export default function Page({}: Props) {
  return (
    <>
      <div className="max-w-[500px] px-4 flex flex-col gap-2">
        <h1 className="text-h3-d font-bold text-n-900 text-left">Basic information</h1>
        <p className="text-p-n font-medium text-n-900">
        Helper streamlines your donor management and scheduling, helping you maintain a consistent and reliable blood supply.
        </p>
      </div>
      <BasicInformationRegistrationForm/>
    </>
    
  )
}