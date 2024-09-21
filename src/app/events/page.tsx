import Event from "@/components/event/event"
import Hero from "@/components/event/hero"
import Footer from "@/components/footer"
import HeaderContainer from "@/components/home/header-container"
import { Suspense } from "react"

type Props = {}

export default function EventPage({}: Props) {
 
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
          <HeaderContainer/>
      </Suspense>


      <div className='pt-24  '>
        <Hero/>

        <div className="grid  lg:grid-cols-3 md:grid-cols-2 gap-y-4 justify-center max-w-[90rem] mb-40 md:px-8 2xl:px-32  mx-auto w-full">

          <Event image="/images/test.jpg"/>
          <Event image="/images/blood.jpg"/>
          <Event image="/images/test1.jpg"/>
          <Event image="/images/test2.jpg"/>

        </div>

        <Footer/>
      </div>
    </>
  )
}