"use client";

import { Area, AreaChart, Line, LineChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const data = [
  {
    revenue: 10_400,
    subscription: 40,
  },
  {
    revenue: 14_405,
    subscription: 90,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 89,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11_244,
    subscription: 78,
  },
  {
    revenue: 26_475,
    subscription: 89,
  },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
  subscription: {
    label: "Subscriptions",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function CardsStats() {
  return (
    <div className="grid @5xl:grid-cols-1 @7xl:grid-cols-2 @xl:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-3xl">$15,231.89</CardTitle>
          <CardDescription>+20.1% from last month</CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <ChartContainer className="h-[120px] w-full" config={chartConfig}>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Line
                activeDot={{
                  r: 6,
                }}
                dataKey="revenue"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                type="monotone"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="relative @7xl:flex flex @5xl:hidden flex-col pb-0">
        <CardHeader>
          <CardDescription>Subscriptions</CardDescription>
          <CardTitle className="text-3xl">+2,350</CardTitle>
          <CardDescription>+180.1% from last month</CardDescription>
        </CardHeader>
        <CardContent className="relative flex flex-1 items-end p-0">
          <ChartContainer
            className="relative size-full h-[120px]"
            config={chartConfig}
          >
            <AreaChart
              className="mt-auto size-fit"
              data={data}
              margin={{
                left: 0,
                right: 0,
              }}
            >
              <Area
                dataKey="subscription"
                fill="var(--color-subscription)"
                fillOpacity={0.05}
                stroke="var(--color-subscription)"
                strokeWidth={2}
                type="monotone"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
