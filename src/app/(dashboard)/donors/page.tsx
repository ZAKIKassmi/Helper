import { columns } from '@/components/charts/data-table/columns';
import {DonorsTable} from '@/components/charts/data-table/data-table';
import { donors } from '@/data/fake-table-data';
import { getbloodBankAppointments } from '../../../../general-actions/utils';
import { Donors } from '@/lib/types';


export default async function Page() {
  const data = await getbloodBankAppointments() as Donors[];
  return (
    <div className='w-full pl-4 pr-4 pt-4 min-h-screen flex flex-col gap-4'>
      <DonorsTable columns={columns} data={data}/>
    </div>
  )
}