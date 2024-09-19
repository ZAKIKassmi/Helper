"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "Demand vs Supply"

const chartData = [
  { date: "2024-07-01", desktop: 150, mobile: 150 },
  { date: "2024-07-02", desktop: 150, mobile: 180 },
  { date: "2024-07-03", desktop: 150, mobile: 120 },
  { date: "2024-07-04", desktop: 150, mobile: 260 },
  { date: "2024-07-05", desktop: 150, mobile: 290 },
  { date: "2024-07-06", desktop: 150, mobile: 340 },
  { date: "2024-07-07", desktop: 150, mobile: 180 },
  { date: "2024-07-08", desktop: 150, mobile: 320 },
  { date: "2024-07-09", desktop: 150, mobile: 110 },
  { date: "2024-07-10", desktop: 150, mobile: 190 },
  { date: "2024-07-11", desktop: 150, mobile: 350 },
  { date: "2024-07-12", desktop: 150, mobile: 210 },
  { date: "2024-07-13", desktop: 150, mobile: 380 },
  { date: "2024-07-14", desktop: 150, mobile: 220 },
  { date: "2024-07-15", desktop: 150, mobile: 170 },
  { date: "2024-07-16", desktop: 150, mobile: 190 },
  { date: "2024-07-17", desktop: 150, mobile: 360 },
  { date: "2024-07-18", desktop: 150, mobile: 410 },
  { date: "2024-07-19", desktop: 150, mobile: 180 },
  { date: "2024-07-20", desktop: 150, mobile: 150 },
  { date: "2024-07-21", desktop: 150, mobile: 200 },
  { date: "2024-07-22", desktop: 150, mobile: 170 },
  { date: "2024-07-23", desktop: 150, mobile: 230 },
  { date: "2024-07-24", desktop: 150, mobile: 290 },
  { date: "2024-07-25", desktop: 150, mobile: 250 },
  { date: "2024-07-26", desktop: 150, mobile: 130 },
  { date: "2024-07-27", desktop: 150, mobile: 420 },
  { date: "2024-07-28", desktop: 150, mobile: 180 },
  { date: "2024-07-29", desktop: 150, mobile: 240 },
  { date: "2024-07-30", desktop: 150, mobile: 380 },
  { date: "2024-08-01", desktop: 150, mobile: 220 },
  { date: "2024-08-02", desktop: 150, mobile: 310 },
  { date: "2024-08-03", desktop: 150, mobile: 190 },
  { date: "2024-08-04", desktop: 150, mobile: 420 },
  { date: "2024-08-05", desktop: 150, mobile: 390 },
  { date: "2024-08-06", desktop: 150, mobile: 520 },
  { date: "2024-08-07", desktop: 150, mobile: 300 },
  { date: "2024-08-08", desktop: 150, mobile: 210 },
  { date: "2024-08-09", desktop: 150, mobile: 180 },
  { date: "2024-08-10", desktop: 150, mobile: 330 },
  { date: "2024-08-11", desktop: 150, mobile: 270 },
  { date: "2024-08-12", desktop: 150, mobile: 240 },
  { date: "2024-08-13", desktop: 150, mobile: 160 },
  { date: "2024-08-14", desktop: 150, mobile: 490 },
  { date: "2024-08-15", desktop: 150, mobile: 380 },
  { date: "2024-08-16", desktop: 150, mobile: 400 },
  { date: "2024-08-17", desktop: 150, mobile: 420 },
  { date: "2024-08-18", desktop: 150, mobile: 350 },
  { date: "2024-08-19", desktop: 150, mobile: 180 },
  { date: "2024-08-20", desktop: 150, mobile: 230 },
  { date: "2024-08-21", desktop: 150, mobile: 140 },
  { date: "2024-08-22", desktop: 150, mobile: 120 },
  { date: "2024-08-23", desktop: 150, mobile: 290 },
  { date: "2024-08-24", desktop: 150, mobile: 220 },
  { date: "2024-08-25", desktop: 150, mobile: 250 },
  { date: "2024-08-26", desktop: 150, mobile: 170 },
  { date: "2024-08-27", desktop: 150, mobile: 460 },
  { date: "2024-08-28", desktop: 150, mobile: 190 },
  { date: "2024-08-29", desktop: 150, mobile: 130 },
  { date: "2024-08-30", desktop: 150, mobile: 280 },
  { date: "2024-08-31", desktop: 150, mobile: 230 },
  { date: "2024-09-01", desktop: 150, mobile: 200 },
  { date: "2024-09-02", desktop: 150, mobile: 410 },
  { date: "2024-09-03", desktop: 150, mobile: 160 },
  { date: "2024-09-04", desktop: 150, mobile: 380 },
  { date: "2024-09-05", desktop: 150, mobile: 140 },
  { date: "2024-09-06", desktop: 150, mobile: 250 },
  { date: "2024-09-07", desktop: 150, mobile: 370 },
  { date: "2024-09-08", desktop: 150, mobile: 320 },
  { date: "2024-09-09", desktop: 150, mobile: 480 },
  { date: "2024-09-10", desktop: 150, mobile: 200 },
  { date: "2024-09-11", desktop: 150, mobile: 150 },
  { date: "2024-09-12", desktop: 150, mobile: 420 },
  { date: "2024-09-13", desktop: 150, mobile: 130 },
  { date: "2024-09-14", desktop: 150, mobile: 380 },
  { date: "2024-09-15", desktop: 150, mobile: 350 },
  { date: "2024-09-16", desktop: 150, mobile: 310 },
  { date: "2024-09-17", desktop: 150, mobile: 520 },
  { date: "2024-09-18", desktop: 150, mobile: 170 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Component() {

  const [timeRange, setTimeRange] = React.useState("last 3 monthes");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "last 30 days") {
      daysToSubtract = 30
    } else if (timeRange === "last 7 days") {
      daysToSubtract = 7
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Demand vs Supply</CardTitle>
          <CardDescription>
            Showing total donors for the {timeRange}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg focus:ring-0 focus:ring-offset-0 sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="last 3 monthes" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="last 30 days" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="last 7 days" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
