"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components//ui/chart";
import { AdminBranchProgressType } from "@/types";
import { format } from "date-fns";

type ProgressType = {
  count: number;
  date: string;
};

const BranchGrouthChart = ({
  data,
  branchCount,
  notVarified,
}: {
  data: AdminBranchProgressType[];
  branchCount: number;
  notVarified: number;
}) => {
  return (
    <div>
      <Card className="flex flex-col lg:max-w-md" x-chunk="charts-01-chunk-1">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
          <div>
            <CardDescription>Varified Branches</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              {branchCount}
              <span className="text-sm font-normal tracking-normal text-muted-foreground"></span>
            </CardTitle>
          </div>
          <div>
            <CardDescription>Not Varified </CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              {notVarified}
              <span className="text-sm font-normal tracking-normal text-muted-foreground"></span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 items-center">
          <ChartContainer
            config={{
              resting: {
                label: "Resting",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="w-full"
          >
            <LineChart
              accessibilityLayer
              margin={{
                left: 14,
                right: 14,
                top: 10,
              }}
              data={data}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="hsl(var(--muted-foreground))"
                strokeOpacity={0.5}
              />
              <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    weekday: "short",
                  });
                }}
              />
              <Line
                dataKey="count"
                type="natural"
                fill="var(--color-resting)"
                stroke="var(--color-resting)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  fill: "var(--color-resting)",
                  stroke: "var(--color-resting)",
                  r: 4,
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator="line"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      });
                    }}
                  />
                }
                cursor={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1">
          <CardDescription>
            Here The line chart showing the progress of your branch approval
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BranchGrouthChart;
