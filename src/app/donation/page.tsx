import React from 'react'
import Balancer from 'react-wrap-balancer'
import DonationForm from '@/components/donation-page/donation-form'
import HeaderContainer from '@/components/home/header-container'

export default function Page() {
  return (
    <div className='relative min-h-screen'>

      <HeaderContainer/>

      <div className='flex flex-col pt-28 gap-4 w-full justify-center items-center py-8 px-2 csxxs:px-4'>

        <div className='min-h-[70vh] flex-col flex justify-start gap-12 max-w-[38rem] w-full' >

          <p className="font-bold text-p-d csz:text-h6-d sm:text-h4-d md:text-h3-d md:text-n-900 text-center">
            <Balancer>
              Your donation will help us build more <br /> blood centers around the world!
            </Balancer>
          </p>

          <DonationForm/>
          
        </div>


      </div>
    </div>
  )
}