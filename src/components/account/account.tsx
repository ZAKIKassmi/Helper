import Image from "next/image";
import SettingInfoLine from "../dashboard/setting-info-line";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {UserAppointmentTable} from "./user-appointements-table";
import { getUserAppointments } from "../../../general-actions/utils";
import { columns } from "./columns";
import { formatRFC7231 } from "date-fns";
import { Appointment } from "@/lib/types";

export default async function AccountPage() {


  const data = await getUserAppointments();

  return (
    <div className=' grid-cols-1 pt-28   xl:grid-cols-2 grid min-h-screen px-16 py-4'>
      <div className='xl:border-r border-n-40'>

        <div className='items-center flex gap-4'>
          <div className="relative w-32 h-32 rounded-full flex items-center justify-center">
            <Image src="/images/test.jpg" fill alt="Profile image" className="rounded-full object-cover"/>
          </div>
          <div>
            <h1 className='text-h4-d font-bold'>
              El Kassmi Zakariae
            </h1>
            <p>
              AB+
            </p>
          </div>
        </div>

        <div className='text-p-n border-b border-b-n-40 py-6'>
          <h2 className='text-n-900 font-bold text-p-n mb-4'>Personal Informations</h2>
          <SettingInfoLine icon='email' name='Email: ' value="zelkassimi9@gmail.com"/>
          <SettingInfoLine icon='phone' name='Phone number: ' value="(+212) 697975128"/>
          <SettingInfoLine icon='date' name='Birthday: ' value={formatRFC7231(new Date("2003-07-07")).slice(0, 16)}/>
        </div>

        <div className='text-p-n border-b border-b-n-40 py-6'>
          <h2 className='text-n-900 font-bold text-p-n mb-4 '>Address</h2>
          <SettingInfoLine icon='home-hospital' name='Address: ' value="address"/>
          <SettingInfoLine icon='map' name='City/Province: ' value="province"/>
          <SettingInfoLine icon='location-med' name='Zip Code: ' value="11004"/>
        </div>


      </div>


      <div className='pt-8 pl-4'>
        <h1 className="text-h4-d font-bold">Future donations</h1>      
        <UserAppointmentTable data={data as Appointment[]} columns={columns}/>
      </div>

    </div>
  )
}