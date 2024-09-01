import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function Layout({children}: Props) {
  return (
    <div className='relative min-h-screen'>
      <Link href="/" className="flex justify-center pt-8 csz:py-4">
      <Image priority={true} src="/images/Helper..svg" width={86} height={31} alt='Helper Logo Icon'/>
      </Link>
      <div className='flex flex-col gap-4 w-full justify-center items-center py-8 px-2 csxxs:px-4'>
        {children}
      </div>
    </div>
  )
}