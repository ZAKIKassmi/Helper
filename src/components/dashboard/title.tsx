import { formatRFC7231 } from 'date-fns';


export default function DashboardTitle() {
  return (
    <div className=' gap-1 items-center hidden csz:block'>
      <p className='text-n-900'>
        {formatRFC7231(new Date()).slice(0, 16)}
      </p>
    </div>
  )
}