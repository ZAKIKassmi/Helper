import { format, formatRFC7231, parse } from 'date-fns';


export default function DashboardTitle() {
  return (
    <div className='flex gap-1 items-center'>
      <p className='text-n-900'>
        {formatRFC7231(new Date()).slice(0, 16)}
      </p>
    </div>
  )
}