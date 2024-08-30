import { footerItems } from '@/lib/constants'
import Link from 'next/link'
import React from 'react'
import { Textarea } from './ui/textarea'
import CustomButton from './customButton'


export default function Footer() {
  return (
    <div className='grid grid-cols-1 csxxs:grid-cols-2 sm:justify-items-center sm:grid-cols-4 justify-between sm:justify-evenly gap-10 lg:px-32 lg:py-20 px-8 py-20 border-t border-n-70 text-n-700'>
      {
        footerItems.map((item)=>(
          <div key={item.title} className='flex flex-col gap-6  mb-10 sm:min-w-fit '>
            <p className='text-label-n font-bold'>
              {item.title}
            </p>
            {
              item.subTitles.map((subTitle)=>(
                <Link key={subTitle.title} href={subTitle.link} className='text-n-700 hover:text-c-red-500 duration-300'>
                  {subTitle.title}
                </Link> 
              ))
            }
          </div>
        ))
      }

    </div>
  )
}