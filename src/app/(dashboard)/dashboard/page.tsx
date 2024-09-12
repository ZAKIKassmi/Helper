import { Component } from "@/components/charts/area-chart";
import DashboardHeader from "@/components/dashboard/header";


export default function Dashboard(){
  return (
    <div className='w-full pl-4 text-white pr-4 pt-4 min-h-screen flex flex-col gap-4'>
      <Component/>
    </div>
  )
}