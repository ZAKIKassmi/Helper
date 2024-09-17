import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'
import { AvatarFallback, AvatarImage } from '../ui/avatar'
import DashboardIcons from '../icons/dashboard-icons'
import SettingInfoLine from './setting-info-line'
import SettingForm from './operational-details-form'
import { BloodBanksSettingPagePropsType } from '@/lib/types'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import FacilityDashboardForm from './facility-form'


export default function SettingPage({data}: {data: BloodBanksSettingPagePropsType}) {
  return (
    <div className=' grid-cols-1  xl:grid-cols-2 grid min-h-screen px-8 py-4'>
      <div className='xl:border-r border-n-40'>

        <div className='items-center flex gap-4'>
          <Avatar>
            <AvatarImage width={100} height={100} src='' alt='Setting page image' className='w-24 h-24'/>
            <AvatarFallback className='w-24 h-24'>C</AvatarFallback>
          </Avatar>
          <div>
            <h1 className='text-h4-d font-bold'>
              {data.name}
            </h1>
            <p>
              {data.id}
            </p>
          </div>
        </div>

        <div className='text-p-n border-b border-b-n-40 py-6'>
          <h2 className='text-n-900 font-bold text-p-n mb-4'>About</h2>
          <SettingInfoLine icon='email' name='Email: ' value={data.email}/>
          <SettingInfoLine icon='phone' name='Emergency Number: ' value={`(${data.dialCode}) ${data.emergencyContact?.slice(data.dialCode.length)}`}/>
        </div>

        <div className='text-p-n border-b border-b-n-40 py-6'>
          <h2 className='text-n-900 font-bold text-p-n mb-4 '>Address</h2>
          <SettingInfoLine icon='home-hospital' name='Address: ' value={data.address}/>
          <SettingInfoLine icon='map' name='City/Province: ' value={data.province}/>
          <SettingInfoLine icon='location-med' name='Zip Code: ' value={data.zip}/>
        </div>


        <div className='text-p-n border-b xl:border-b-0 border-b-n-40 py-6'>
          <div className='flex justify-between  pr-10'>
            <h2 className='text-n-900 font-bold text-p-n mb-4 '>Facility Details</h2>
            <div className='cursor-pointer stroke-n-900 stroke-[1.5]'>
            <Dialog>
          <Button asChild variant="outline" className='flex gap-2 focus:ring-0 focus:ring-offset-0'>
            <DialogTrigger>
                <DashboardIcons type='edit'/>
                Edit
            </DialogTrigger>
          </Button>

          <DialogContent className=''>
            <DialogHeader className="mb-4">
              <DialogTitle className='text-n-900 text-h4-d  font-bold'>
                1. Update Facility Details
              </DialogTitle>
            </DialogHeader>

            <FacilityDashboardForm data={{beds: data.availableBeds, donors: data.dailyDonorsNeeded, contact:data.emergencyContact}}/>

          </DialogContent>

          

        </Dialog>
            </div>
          </div>
          <SettingInfoLine icon='beds' name='Total Beds Available: ' value={String(data.availableBeds)}/>
          <SettingInfoLine icon='donors' name='Daily Donor Requirement: ' value={String(data.dailyDonorsNeeded)}/>
        </div>


      </div>


      <div>
        <SettingForm operationalDetails={data.operationalDetails}/>
      </div>

    </div>
  )
}