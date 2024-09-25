"use client";
import { cn } from '@/lib/utils';
import CustomButton from './customButton';
import Link from 'next/link';
import { useEffect, useRef, useState } from "react";
type Props = {
  title: string;
  description: string;
  isSignUp: boolean;
  className:string;
}

export default function CustomCard({title,description,isSignUp, className}: Props) {
  const ref = useRef(null);

  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const scrollRef = useRef(0);

  useEffect(()=>{
    //entries represent the list of items that matche the observe item.
    const observer = new IntersectionObserver((entries)=>{
      const entry = entries[0];
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if(scrollTop > scrollRef.current && entry.isIntersecting){
        setIsIntersecting(true);
      }
      else if(scrollTop < scrollRef.current && !entry.isIntersecting){
        setIsIntersecting(false);
      }
      

      scrollRef.current = scrollTop <= 0 ? 0 : scrollTop;
      
    });
    observer.observe(ref.current!);
  },[]);

  return (
    <div ref={ref} className={cn(`min-w-[150px] csxxs:min-w-[300px] lg:min-w-[400px] p-8 border border-n-70 flex flex-col gap-6 rounded-lg min-h-[230px]  ${className}`,{
      "animate-translate-y-fade-in-fast-then-float": isIntersecting,
    })}>
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