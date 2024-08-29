'use client';

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function SecondSection() {
  const ref = useRef(null);

  const [isIntersecting, setIsIntersecting] = useState<boolean>();
  console.log(isIntersecting);

  useEffect(()=>{
    //entries represent the list of items that matche the observe item.
    const observer = new IntersectionObserver((entries)=>{
      const entry = entries[0];
      setIsIntersecting(entry.isIntersecting);
    });
    observer.observe(ref.current!);
  },[]);
  return (
    <section className="text-h6-m bg-c-red-100 text-[#75222D] pl-4 pr-4 pt-20 pb-20 sm:pl-8 sm:pr-8 md:pl-8 md:pr-8 md:pt-40 md:pb-40 lg:pr-40 lg:pl-40  lg:pt-36 lg:pb-36 flex flex-col gap-6">

          <h1 ref={ref} className={cn(" text-p-n csz:text-h5-m sm:text-h3-m md:text-h2-m lg:text-h1-d min-w-full font-bold  csz:whitespace-nowrap opacity-0", {
          "animate-translate-y-fade-in-fast-then-float": isIntersecting,
          })}>
           Why You Should Become a Frequent Donor?
          </h1>
          <p  className={cn("max-w-[60ch] md:max-w-[55ch] sm:max-w-[50ch] text-p-n",{
            "animate-translate-y-fade-in-fast-then-float": isIntersecting
          })}>
          Blood has a limited shelf life. For instance, red blood cells last 42 days, and platelets only 5 days. Therefore, regular donations are essential to maintain an adequate supply for hospitals and emergency services. Moreover, Having a steady supply of donated blood ensures that there are reserves available in case of natural disasters, accidents, or other emergencies where a sudden influx of blood is needed.
          </p>
        </section>
  )
}