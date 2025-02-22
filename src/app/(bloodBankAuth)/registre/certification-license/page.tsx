import Certification from '@/components/blood-centers-registration/certifications'
import React from 'react'

type Props = {}

export default async function Page({}: Props) {
  return (
    <>
      <div className="max-w-[550px] px-4 flex flex-col gap-2">
        <h1 className="text-h3-d font-bold text-n-900 text-left">Certification and Licensing</h1>
        <p className="text-p-n font-medium text-n-900">
        Upload your center&apos;s certifications, licenses, and accreditations. This step verifies your center&apos;s credentials and builds trust with potential donors.
        </p>
      </div>
      <Certification/>
    </>
  )
}