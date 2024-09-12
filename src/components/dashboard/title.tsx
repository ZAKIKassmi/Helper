"use client";
import { format, formatRFC7231, parse } from 'date-fns';
import { usePathname } from 'next/navigation'

type Props = {}

export default function DashboardTitle({}: Props) {
  const pathname = usePathname();
  const urlItems = pathname.split('/');
  return (
    <div className='flex gap-1 items-center'>
      <p>
        {formatRFC7231(new Date()).slice(0, 16)}
      </p>
    </div>
  )
}