import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

export default function ChartsSkeleton({}: Props) {
  return (
    <div className='w-full relative h-[24.3rem] px-4'>
      <Skeleton className='bg-n-200 absolute left-6 top-6 w-64 h-6'/>
      <Skeleton className='bg-n-200 absolute left-6 top-[3.4rem] w-72 h-4'/>
      <Skeleton className='bg-n-200 absolute right-6 top-8  w-52 h-10'/>
      <Skeleton className='w-full h-[24.3rem]'/>      
    </div>
  )
}