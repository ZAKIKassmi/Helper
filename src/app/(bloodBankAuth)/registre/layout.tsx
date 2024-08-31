import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function Layout({children}: Props) {
  return (
    <div className='relative min-h-screen'>
      <Link href="/" className="flex justify-center pt-8 csz:py-4 bg-black">
      <Image src="/images/Helper..svg" width={86} height={31} alt='Helper Logo Icon'/>
      </Link>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {children}
      </div>
    </div>
  )
}