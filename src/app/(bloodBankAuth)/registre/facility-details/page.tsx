import FacilityDetailsForm from '@/components/blood-centers-registration/facility-details-form'
import React from 'react'

type Props = {}

export default function Page({}: Props) {
  return (
    
    <div className='h-[70vh] flex-col flex justify-center gap-4 max-w-[500px] w-full' >
      <div className="max-w-[500px] px-4 flex flex-col gap-2">
        <h1 className="text-h3-d font-bold text-n-900 text-left">Facility Details,</h1>
        <p className="text-p-n font-medium text-n-900">
        Share the number of donation beds, your daily capacity, and emergency contact information.
        </p>
      </div>
      <FacilityDetailsForm/>
  </div>
  )
}