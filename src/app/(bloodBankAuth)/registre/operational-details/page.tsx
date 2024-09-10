import OperationalDetailsForm from '@/components/blood-centers-registration/operational-details'
import Balancer from 'react-wrap-balancer'

type Props = {}

export default function Page({}: Props) {
  return (
    <div className='min-h-[70vh] flex-col flex justify-center gap-4 max-w-[550px] w-full' >
      <div className="max-w-[550px] px-4 flex flex-col gap-2">
        <h1 className="text-h3-d font-bold text-n-900 text-left">Operational Details,</h1>
        <p className="text-p-n font-medium text-n-900">
          <Balancer>
        Set up your center&apos;s operating hours and list the types of donations you accept (e.g., blood, plasma, platelets)
          </Balancer>
        </p>
      </div>
     <OperationalDetailsForm/>
  </div>
  )
}