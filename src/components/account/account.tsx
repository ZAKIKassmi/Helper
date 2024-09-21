import Image from "next/image";
import SettingInfoLine from "../dashboard/setting-info-line";
import {UserAppointmentTable} from "./user-appointements-table";
import { getUser, getUserAppointments } from "../../../general-actions/utils";
import { columns } from "./columns";
import { formatRFC7231 } from "date-fns";
import { Appointment } from "@/lib/types";
import { ScrollArea } from "../ui/scroll-area";

export default async function AccountPage() {

  const user = getUser();
  const data = getUserAppointments();

  const res = await Promise.all([user, data]);

  return (
    <div className=' grid-cols-1 pt-28   xl:grid-cols-2 grid min-h-screen px-16 py-4'>
      <div className='xl:border-r border-n-40'>

        <div className='items-center flex gap-4'>
          <div className="relative w-32 h-32 rounded-full flex items-center justify-center">
            <Image src="/images/test.jpg" fill alt="Profile image" className="rounded-full object-cover"/>
          </div>
          <div>
              {
              res[0]?.firstName ?
                <h1 className='text-h4-d font-bold'>
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
      
      <ScrollArea>

        <div className='text-p-n border-b border-b-n-40 py-6'>
          <h2 className='text-n-900 font-bold text-p-n mb-4'>Personal Informations</h2>
          <SettingInfoLine icon='email' name='Email: ' value={res[0]?.email as string}/>
          <SettingInfoLine icon='phone' name='Phone number: ' value={`(${res[0]?.dialCode}) ${res[0]?.phoneNumber!.slice(res[0].dialCode.length)}`}/>
          <SettingInfoLine icon='date' name='Birthday: ' value={formatRFC7231(new Date(res[0]?.birthday!)).slice(0, 16)}/>
          <SettingInfoLine icon={res[0]?.gender === 'Male' ? 'male' : 'female'} name='Gender: ' value={res[0]?.gender!}/>
          <SettingInfoLine icon='blood' name='Blood type: ' value={res[0]?.bloodTypeName!}/>
        </div>

        <div className='text-p-n border-b border-b-n-40 py-6'>
          <h2 className='text-n-900 font-bold text-p-n mb-4 '>Address</h2>
          <SettingInfoLine icon='home-hospital' name='Address: ' value={res[0]?.address as string}/>
          <SettingInfoLine icon='map' name='City/Province: ' value={res[0]?.province as string}/>
          <SettingInfoLine icon='location-med' name='Zip Code: ' value={res[0]?.zip as string}/>
        </div>
        
        
        </ScrollArea>


      </div>


      <div className='pt-8 pl-4'>
        <h1 className="text-h4-d font-bold">Future donations</h1>      
        <UserAppointmentTable data={res[1] as Appointment[]} columns={columns}/>
      </div>

    </div>
  )
}