import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Balancer from 'react-wrap-balancer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import DonationForm from '@/components/donation-page/donation-form'
import PaypalIcon from '@/components/icons/paypal-icon'
import { ChevronRight } from 'lucide-react'

export default function Page() {
  return (
    <div className='relative min-h-screen'>

      <Link href="/" className="flex justify-center pt-8 csz:py-4">
      <Image priority={true} src="/images/Helper..svg" width={86} height={31} alt='Helper Logo Icon'/>
      </Link>

      <div className='flex flex-col gap-4 w-full justify-center items-center py-8 px-2 csxxs:px-4'>

        <div className='min-h-[70vh] flex-col flex justify-center gap-4 max-w-[561px] w-full' >

          <p className="csxxs:text-h6-d  sm:text-h3-d font-bold md:text-n-900 text-center">
            <Balancer>
              Your donation will help us build more blood centers around the world!
            </Balancer>
          </p>


          <div className='flex flex-col gap-0'>

            <Accordion className='border rounded-t-xl px-4'  type="single" collapsible>
              <AccordionItem  value="donation">
                <AccordionTrigger className='hover:no-underline'>
                  <div className='flex gap-2 justify-start items-center'>
                    <Image src="/icons/creditCard.svg" alt='credit card icon for the donation page' width={36} height={36}/>
                    <p className='text-n-900 text-p-n font-normal'>
                      Credit Card
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {/* <PaymentForm/> */}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          <div className='flex justify-between px-4 items-center text-n-900 text-label-n border py-4 border-t-0 rounded-b-xl'>

            <div className='flex gap-2 items-center'>
              <PaypalIcon/>
              <p>
                Continue with PayPal
              </p>
            </div>

            <ChevronRight className='h-4 w-4'/>

          </div>

          </div>



          
        </div>


      </div>
    </div>
  )
}