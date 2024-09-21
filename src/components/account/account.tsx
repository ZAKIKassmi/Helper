import Image from "next/image";
import SettingInfoLine from "../dashboard/setting-info-line";
import {UserAppointmentTable} from "./user-appointements-table";
import { getUser, getUserAppointments } from "../../../general-actions/utils";
import { columns } from "./columns";
import { formatRFC7231 } from "date-fns";
import { Appointment } from "@/lib/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import DashboardIcons from "../icons/dashboard-icons";
import CustomForm from "../user-forms/form";
import { ScrollArea } from "../ui/scroll-area";
import UpdateUserInformation from "./update-information-form";

export default async function AccountPage() {

  const user = getUser();
  const data = getUserAppointments();

  const res = await Promise.all([user, data]);

  return (

    res[0] && res[1] ? 
    <div className=' grid-cols-1 pt-28 xl:grid-cols-2 grid min-h-screen px-4 sm:px-8 md:px-16 py-4'>
      <div className='xl:border-r  border-n-40'>

        <div className='flex w-full items-start flex-col sm:items-center sm:flex-row gap-4'>
          <div className="relative w-32 h-32 rounded-full flex items-center justify-center">
            <Input type="file" title="Update profile picture" className="absolute z-20 h-full rounded-full opacity-0"/>
            <Image src="/images/test.jpg" fill alt="Profile image" className="rounded-full object-cover"/>
          </div>
          <div>
              {
              res[0]?.firstName ?
                <h1 className='text-h4-d sm:text-h2-d font-bold'>
                {res[0]?.firstName} {res[0]?.lastName}
                </h1>
                : 
                <h1 className="text-h4-d font-bold">
                  {res[0]?.username}
                </h1>
              }
            <p className="text-muted-foreground">
              Credits: 100 points
            </p>
          </div>
        </div>
      

        <div className='text-p-n border-b border-b-n-40 py-6'>
          <div className="flex w-full justify-between pr-4">

            <h2 className='text-n-900 font-bold text-p-n mb-4'>
              Personal Informations
            </h2>

            <Dialog>
          <Button asChild variant="outline" className='flex gap-2 focus:ring-0 focus:ring-offset-0'>
            <DialogTrigger className="stroke-1 stroke-n-900">
                <DashboardIcons type='edit'/>
                Edit
            </DialogTrigger>
          </Button>

          <DialogContent>
            <DialogHeader className="mb-4">
              <DialogTitle className='text-n-900 text-h4-d  font-bold'>
                Personal informations
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="h-96">
            <UpdateUserInformation data={
              {
                firstName: res[0].firstName,
                lastName: res[0].lastName,
                email: res[0].email,
                gender: res[0].gender,
                phoneNumber: res[0].phoneNumber,
                address: res[0].address,
                zip: res[0].zip,
                province: res[0].province,
                dateOfBirth: new Date(res[0].birthday as string),
                bloodType: String(res[0].bloodTypeCode),
                country: res[0].countryName,
              }}/>
            </ScrollArea>
          

          </DialogContent>

          

        </Dialog>
            

          </div>
          <SettingInfoLine icon='email' name='Email: ' value={res[0].email as string}/>
          <SettingInfoLine icon='phone' name='Phone number: ' value={`(${res[0]?.dialCode}) ${res[0]?.phoneNumber!.slice(res[0].dialCode.length)}`}/>
          <SettingInfoLine icon='date' name='Birthday: ' value={formatRFC7231(new Date(res[0]?.birthday!)).slice(0, 16)}/>
          <SettingInfoLine icon={res[0]?.gender === 'Male' ? 'male' : 'female'} name='Gender: ' value={res[0]?.gender!}/>
          <SettingInfoLine icon='blood' name='Blood type: ' value={res[0]?.bloodTypeName!}/>
        </div>

        <div className='text-p-n border-b border-b-n-40 py-6'>
          <div className="flex w-full justify-between pr-4">

              <h2 className='text-n-900 font-bold text-p-n mb-4'>
                Address
              </h2>


            </div>
          <SettingInfoLine icon='home-hospital' name='Address: ' value={res[0]?.address as string}/>
          <SettingInfoLine icon='map' name='City/Province: ' value={res[0]?.province as string}/>
          <SettingInfoLine icon='location-med' name='Zip Code: ' value={res[0]?.zip as string}/>
        </div>
        
        


      </div>


      <div className='pt-8 pl-4'>
        <h1 className="text-h4-d sm:text-h2-d font-bold">Future donations</h1>      
        <UserAppointmentTable data={res[1] as Appointment[]} columns={columns}/>
      </div>

    </div>
    :
    <div className="pt-40 w-full h-[80vh] flex items-center justify-center flex-col" >
      <p className="text-display-large text-center px-16 font-medium">
        403 Forbidden<br />
      Only logged in users are allowed to access this page please login or sign up if do not have an account 
      </p>
      <div className="flex gap-2 mt-4">

      <Button  className="bg-c-red-500 text-h2-d hover:bg-c-red-600 text-white" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button  className="bg-c-red-500 text-h2-d hover:bg-c-red-600 text-white" asChild>
        <Link href="/login">Sign up</Link>
      </Button>
      </div>
    </div>
  )
}