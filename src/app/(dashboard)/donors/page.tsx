import { columns } from '@/components/charts/data-table/columns';
import {DonorsTable} from '@/components/charts/data-table/data-table';
import { donors } from '@/data/fake-table-data';

type Props = {}

export default function Page({}: Props) {
  return (
    <div className='w-full pl-4 text-white pr-4 pt-4 min-h-screen flex flex-col gap-4'>
      <DonorsTable columns={columns} data={donors}/>
    </div>
  )
}