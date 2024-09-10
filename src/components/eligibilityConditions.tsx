import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader, 
  DialogTitle, 
  DialogTrigger } 
from "@/components/ui/dialog";
import { eligibilityConditions } from '@/lib/constants'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from "./ui/button";
import EligibilityForm from "./user-forms/eligibility-form";

export default function EligibilityConditions() {
  return (
    <Dialog>
          <Button asChild className='bg-c-red-500 hover:bg-c-red-600'>
            <DialogTrigger className='w-full max-w-[33rem] '>
                Take the eligibility test
            </DialogTrigger>
          </Button>

          <DialogContent className=' h-[90vh] '>
          <ScrollArea className="pr-4">

            <DialogHeader className="mb-4">
              <DialogTitle >
                1. You must be between 18 and 60 years old and weigh at least 50 kg.
              </DialogTitle>
            </DialogHeader>


            <DialogHeader className="mb-4">
              <DialogTitle >
              2. Blood donation is not permitted for individuals with the following conditions:              
              </DialogTitle>
              <DialogDescription>
                
                {
                  eligibilityConditions[0].map((item:string)=>{
                    return(
                      <li className='pl-4 mb-2 leading-[160%]' key={item}> 
                        - {item}
                      </li>
                    )
                  })
                }
                
              </DialogDescription>

              
            </DialogHeader>


            <DialogHeader className="mb-4">
              <DialogTitle >
              3. Temporary contraindications for blood donation include:              
              </DialogTitle>

              <DialogDescription>
                {
                  eligibilityConditions[1].map((item:string)=>{
                    return(
                      <li className='pl-4 mb-2 leading-[160%]' key={item}> 
                        - {item}
                      </li>
                    )
                  })
                }
              </DialogDescription>
              
            </DialogHeader>


            <DialogHeader className="mb-4">
              <DialogTitle >
              4. Individuals who have stayed in a malaria-endemic area or who use intravenous drugs cannot donate blood.             
              </DialogTitle>
            </DialogHeader>


            <EligibilityForm/>
            
          </ScrollArea>
          </DialogContent>

          

        </Dialog>
        
  )
}