import SettingPage from '@/components/dashboard/setting-page'
import { getAllBloodBankInformation, getFacilityDetails } from '../../../../general-actions/utils'
import { BloodBanksSettingPagePropsType } from '@/lib/types';


export default async function Page() {
  const data = await getAllBloodBankInformation();
  return (
    <SettingPage data={data as BloodBanksSettingPagePropsType}/>
  )
  
}