import React from 'react'
import { Button } from './ui/button'


export default function CustomButton({type,value}: {type: string,value:string}) {
  if(type === 'primary'){
    return (
      <Button className='p-3 pl-5 pr-5 w-full bg-c-red-500 font-normal text-white text-base leading-[110%] hover:bg-c-red-700'>
        {value}
      </Button> 
      )
  }

  if(type === 'link'){
    return(<Button className='p-3 pl-3 pr-3 bg-white font-normal w-full text-n-90 text-base leading-[110%] hover:bg-[#EFEFEF] 
    '>
     {value}
   </Button> )
  }
  
  if(type === 'secondary'){
    return (
      <Button className='p-3 pl-5 pr-5 w-full box-border font-normal border border-c-red-500 bg-white text-c-red-500 text-base leading-[110%] hover:bg-c-red-500
       hover:text-white'>
        {value}
      </Button> )
  }
}