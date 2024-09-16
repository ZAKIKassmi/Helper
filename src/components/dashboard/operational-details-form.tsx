"use client";;
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import {OperationalDetailsItems } from "@/lib/constants";
import CustomSelect from "../custom-select";
import CustomSwitch from "../custom-switch";
import { Button } from "../ui/button";



const dayOrder = {
  'Sunday': 0,
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6,
};

type Props = {
  operationalDetails: {
    day: keyof typeof dayOrder,
    isWorking: boolean,
    startsAt: string,
    endsAt: string
  }[]
}

export default function SettingForm({operationalDetails}: Props) {

 

operationalDetails.sort((a,b)=>dayOrder[a.day] - dayOrder[b.day]);

  const form = useForm({
    defaultValues: {
      SundaySwitch: operationalDetails[0].isWorking,
        MondaySwitch: operationalDetails[1].isWorking,
        TuesdaySwitch: operationalDetails[2].isWorking,
        WednesdaySwitch: operationalDetails[3].isWorking,
        ThursdaySwitch: operationalDetails[4].isWorking,
        FridaySwitch: operationalDetails[5].isWorking,
        SaturdaySwitch: operationalDetails[6].isWorking,
        SundayStartAt: operationalDetails[0].startsAt,
        SundayEndsAt: operationalDetails[0].endsAt,
        MondayStartAt: operationalDetails[1].startsAt,
        MondayEndsAt: operationalDetails[1].endsAt,
        TuesdayStartAt: operationalDetails[2].startsAt,
        TuesdayEndsAt:  operationalDetails[2].endsAt,
        WednesdayStartAt: operationalDetails[3].startsAt,
        WednesdayEndsAt: operationalDetails[3].endsAt,
        ThursdayStartAt: operationalDetails[4].startsAt,
        ThursdayEndsAt: operationalDetails[4].endsAt,
        FridayStartAt: operationalDetails[5].startsAt,
        FridayEndsAt: operationalDetails[5].endsAt,
        SaturdayStartAt: operationalDetails[6].startsAt,
        SaturdayEndsAt: operationalDetails[6].endsAt,
    }
  });

  return (
   <Form {...form}>
    <form className="w-full min-h-screen items-start py-4 xl:px-8">
      
        <div className="w-full flex flex-col gap-4 justify-start">
          <h4 className="text-n-900 text-h4-d pb-4 font-bold">Operational Details</h4>
          {
            OperationalDetailsItems.map((item)=>(
              <div key={item.dayName} className='flex flex-col gap-2 mb-3 cs:flex-row cs:items-center items-stretch justify-between sm:items-center'>
                <div className='flex justify-between w-full flex-1'>
                <p className='text-label-n font-medium min-w-[100px] max-w-[100px] w-full'>{item.dayName}</p>
                <CustomSwitch name={item.switch} control={form.control}/>
                </div>
                <div className='flex justify-between items-center gap-4 flex-[1.2]'>    
                  <CustomSelect array={null}  name={item.statrsAt} control={form.control}/>
                  <p className='text-label-n font-medium'>To</p>
                  <CustomSelect array={null}  name={item.endsAt} control={form.control}/>
                </div>
              </div>
            ))
          }
        </div>

        <Button type="submit" className="float-end mt-4 bg-c-red-500 hover:bg-c-red-600">
          Update Details
        </Button>

      
    </form>
   </Form>
  )
}