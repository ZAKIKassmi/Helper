import React from 'react'
import CustomButton from './customButton';
import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  isSignUp: boolean;
  className:string;
}

export default function CustomCard({title,description,isSignUp, className}: Props) {
  return (
    <div className={`min-w-[300px] p-8 border border-n-70 flex flex-col gap-6 rounded-lg min-h-[230px]  ${className}`}>
      <div className='flex flex-col gap-2'>
        <h1 className='text-n-700 text-h6-d font-bold'>{title}</h1>
        <p className='text-p-n text-n-100'>
          {description}
        </p>
      </div>
      {
        isSignUp && <Link href="/signup">
            <CustomButton type='primary' value='Sign Up'/>
        </Link> 
      }
    </div>
  )
}