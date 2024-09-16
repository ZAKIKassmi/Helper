import { columns } from '@/components/charts/data-table/columns';
import {DonorsTable} from '@/components/charts/data-table/data-table';
import { getbloodBankAppointments, getFacilityDetails } from '../../../../general-actions/utils';
import { Donors } from '@/lib/types';


export default async function Page() {
  const data = getbloodBankAppointments();
  const facilityDetails = getFacilityDetails();
  const res= await Promise.all([data, facilityDetails]);
  return (
    <div className='w-full pl-4 pr-4 pt-4 min-h-screen flex flex-col gap-4'>
      <DonorsTable columns={columns} capacity={res[1]?.capacity || 1} data={res[0] as Donors[]}/>
    </div>
  )
}