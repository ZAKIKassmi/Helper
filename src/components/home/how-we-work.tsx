import { cardItems } from "@/lib/constants";
import CustomCard from "../customCard";
import { useEffect, useRef, useState } from "react";


export default function HowWeWork() {

 
  
  return (
    <div className="lg:px-32 lg:py-20 px-8 py-20">
      <h1 className='text-p-n csz:text-h5-m sm:text-h3-m md:text-h2-m lg:text-h1-d font-bold text-n-900 mb-10'>How Helper Works?</h1>

      

      <div className="flex flex-wrap gap-5">
        {
          cardItems.map((item)=>(
            <CustomCard key={item.title} className="flex-1" title={item.title} description={item.description} isSignUp={item.isSignUp}/>
          ))
        }
      </div>
      
    </div>
  )
}