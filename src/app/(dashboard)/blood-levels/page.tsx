import { CustomPieChart } from "@/components/charts/pie"

type Props = {}

export default function BloodLevels({}: Props) {
  return (
    <div className="flex gap-4 px-4">
      <CustomPieChart/>
      <CustomPieChart/>
    </div>
  )
}