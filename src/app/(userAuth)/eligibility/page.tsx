import EligibilityConditions from '@/components/eligibilityConditions'
import Logo from '@/components/icons/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'




type Props = {}

export default function Eligibility({}: Props) {
  return (
    <div className='relative min-h-screen'>
    <Link href="/" className="flex justify-center pt-8 csz:py-4">
    <Logo/>
    </Link>
    <div className='flex  flex-col gap-4 w-full justify-center items-center min-h-[80vh] py-8 px-2 csxxs:px-4'>
      <div className="max-w-[560px] px-4 flex flex-col gap-2 duration-200 basic-information-page">
          <h1 className="text-h3-d font-bold text-n-900 text-left">Check your eligibility</h1>
          <p className="text-p-n font-medium text-n-900">
          Before scheduling an appointment, we need to ensure you meet the requirements to be a blood donor. If you have a temporary condition, you can check your eligibility later. Until then, appointments  cannot be made. 
          </p>
        </div>
        <EligibilityConditions/>
        <Button asChild className='flex  w-full border max-w-[33rem] rounded-lg gap-2  duration-200 bg-white text-n-900 hover:bg-n-20'>
          <Link href="/">
            Not eligible right now
          </Link>
        </Button>
    </div>
  </div>
  )
}