"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { bloodBankFacilityDetailsItems } from "@/lib/constants";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-number";
import { facilityDetailsSchema, TFacilityDetails } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useFormState } from "react-dom";
import { updateFacilityDetails } from "@/app/(dashboard)/settings/actions/update-facility-details";
import { useEffect } from "react";
import { formErrorHandling } from "@/lib/utils";


type Props = {  
  data:{
    beds: number;
    donors: number;
    contact: string | null;
  }
}

export default function FacilityDashboardForm({data}: Props) {

  const [state, formAction] = useFormState(updateFacilityDetails, null);
  const form = useForm<TFacilityDetails>({
    resolver: zodResolver(facilityDetailsSchema),
    defaultValues:{
      donationBeds: String(data.beds),
      capacity: String(data.donors),
      emergencyContact: data.contact || '',
    }
  });

  useEffect(()=>{
    formErrorHandling(state, form);
  },[state]);


  function onSubmit(input:TFacilityDetails){
    const formData = new FormData();
    if(Number(input.capacity) !== data.donors || Number(input.donationBeds) !== data.beds || input.emergencyContact !== data.contact){
      formData.append('beds', input.donationBeds);
      formData.append('capacity', input.capacity);
      formData.append('contact', input.emergencyContact)

      formAction(formData);
    } 
    else{
      toast.success("Everthing is up to date")
    }

  }

  return (
    <Form {...form}>
      <form className=" w-full" onSubmit={form.handleSubmit(onSubmit)}>
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
              placeholder='Enter a phone number'/>
              <FormMessage />
          </FormItem>  
          )}
        />

        <Button className="bg-c-red-500 float-end mt-4 hover:bg-c-red-600">
            {form.formState.isSubmitting ? <p>Updating details...</p> : <p>Update details</p>}
        </Button>
      </form>
    </Form>
  )
}

