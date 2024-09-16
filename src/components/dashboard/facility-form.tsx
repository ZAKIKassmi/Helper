"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { bloodBankFacilityDetailsItems } from "@/lib/constants";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-number";


type Props = {  
  data:{
    beds: number;
    donors: number;
    contact: string | null;
  }
}

export default function FacilityDashboardForm({data}: Props) {
  const form = useForm({
    defaultValues:{
      donationBeds: data.beds,
      capacity: data.donors,
      emergencyContact: '',
    }
  });
  return (
    <Form {...form}>
      <form className=" w-full">
        {
          bloodBankFacilityDetailsItems.filter((item)=> item.name!=="emergencyContact").map((item)=>(
              <FormField
                  key={item.name}
                  name={item.name}
                  control={form.control}
                  render={({field})=>(
                  <FormItem className="mb-4">
                    <FormLabel>{item.displayedName}</FormLabel>
                      <FormControl>
                          <Input className='focus-visible:ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0' placeholder={item.displayedName} type={item.type}  {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>  
                  )}
                  >
              </FormField>
          ))
        }

        <FormField
          name="emergencyContact"
          control={form.control}
          render={({field})=>(
          <FormItem>
            <FormLabel>Emergency Number</FormLabel>
              <PhoneInput className="focus:outline-none focus:ring-0" {...field}
              international
              defaultCountry='MA'
              placeholder='Enter a phone number'/>
              <FormMessage />
          </FormItem>  
          )}
      />
      </form>
    </Form>
  )
}