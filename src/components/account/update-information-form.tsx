"use client";
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'
import { TUserSchema, userSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import UserSignUpInputs from '../user-forms/user-sign-up-inputs';
import { Button } from '../ui/button';


type Props = {
  data:{
  firstName: string;
  lastName: string;
  email: string;
  gender: "Female" | "Male" | null;
  phoneNumber: string | null;
  dateOfBirth: Date;
  bloodType: string;
  address: string | null;
  zip: string | null;
  province: string | null;
  country: string;
}
}

export default function UpdateUserInformation(data: Props) {
  console.log(data.data);

  const form = useForm({
    defaultValues: {
      email: data.data.email || '',
      firstName: data.data.firstName ||'',
      lastName: data.data.lastName || '',
      address: data.data.address || '',
      phoneNumber: data.data.phoneNumber || '',
      province: data.data.province || '',
      zip: data.data.zip || '',
      dateOfBirth: data.data.dateOfBirth || new Date(),
      gender: data.data.gender,
      bloodType: data.data.bloodType,
      country: data.data.country
    }
  });

  return (
    <Form {...form}>
      <form className='p-4 bg-c-red-100 flex flex-col gap-4'>
          <UserSignUpInputs form={form} isVisible={false}/>
          <Button className='bg-c-red-500 hover:bg-c-red-600'>
            Update Information
          </Button>
      </form>
    </Form>
  )
}