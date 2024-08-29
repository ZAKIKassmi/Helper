import React from 'react'
import CustomButton from './customButton';

type Props = {
  title: string;
  description: string;
  isSignUp: boolean
}

export default function CustomCard({title,description,isSignUp}: Props) {
  return (
    <div className='max-w-[360px] p-8 border border-n-70 flex flex-col gap-6 rounded-lg'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-n-700 text-h6-d font-bold'>{title}</h1>
        <p className='text-p-n text-n-100'>
          {description}
        </p>
      </div>
      {
        isSignUp && <CustomButton type='primary' value='Sign Up'/>
      }
    </div>
  )
}