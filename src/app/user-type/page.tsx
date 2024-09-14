import UserType from '@/components/user-type'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'


export default function Page() {

  return (
    <>
    <Link href="/" className='fixed bg-white z-10 left-1/2 -translate-x-1/2 items-center justify-center p-4'>
      <Image src="/images/Helper..svg" width={86} height={31} alt='Helper Logo Icon'/>
    </Link>
    <Suspense fallback={<p>Loading...</p>}>
      <UserType/>
    </Suspense>
    </>
  )
}