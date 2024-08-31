import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Page({}: Props) {
  return (
    <>
    <Link href="/" className='fixed bg-white z-10 left-1/2 -translate-x-1/2 items-center justify-center p-4'>
      <Image src="/images/Helper..svg" width={86} height={31} alt='Helper Logo Icon'/>
    </Link>
    <div className='flex flex-col w-full gap-8 h-screen items-center justify-center'>
      <h3 className=' text-h6-d csz:text-h3-d font-bold '>Please Select Your Role</h3>
      <div className='flex flex-wrap gap-4'>


        <Link href="/signup" className='flex flex-col max-csz:flex-1  max-csz:mx-4 p-14 items-center justify-center border rounded-lg text-n-900 cursor-pointer hover:bg-n-20 duration-200 text-label-n font-medium gap-3'>
            <Image src="/icons/user-heart.svg" alt='user heart icon' width={21} height={21}/>
            <p className='min-w-[100px] text-center'>Donor</p>
        </Link>


        <Link href="/registre" className='flex  flex-col max-csz:flex-1 max-csz:mx-4 justify-center items-center p-14 gap-3 rounded-lg border cursor-pointer text-n-900 hover:bg-n-20  duration-200 text-label-n font-medium'>
            <Image src="/icons/home-hospital.svg" alt='home hospital icon' width={24} height={24}/>
            <p className='text-center whitespace-nowrap'>Blood Center</p> 
        </Link>

      </div>
    </div>
    </>
  )
}