import SettingPage from '@/components/dashboard/setting-page'
import { getAllBloodBankInformation, getFacilityDetails } from '../../../../general-actions/utils'
import { notFound } from 'next/navigation';
import { BloodBanksSettingPagePropsType } from '@/lib/types';

type Props = {}

export default async function Page({}: Props) {
  const data = await getAllBloodBankInformation();
  return (
    <SettingPage data={data as BloodBanksSettingPagePropsType}/>
  )
  
}