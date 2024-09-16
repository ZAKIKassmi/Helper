import DashboardIcons from "../icons/dashboard-icons";

type Props = {
  name: string;
  value: string;
  icon: string;
}

export default function SettingInfoLine({name, value, icon}: Props) {
  return (
  <div className='flex flex-wrap font-medium gap-2 mb-3 items-center fill-[hsl(var(--muted-foreground))] stroke-[hsl(var(--muted-foreground))] stroke-[1.3]'>
    <DashboardIcons type={icon} />
    <p className='text-muted-foreground text-nowrap'>{name}</p>
    <p className='text-n-900 text-nowrap'>{value}</p>
  </div>  
  )
}