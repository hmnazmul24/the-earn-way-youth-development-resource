import {
  Bar,
  BarChart,
  Label,
  Rectangle,
  ReferenceLine,
  XAxis,
} from "recharts";

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

type AllDataType = {
  total: number;
  paid: number;
  unpaid: number;
  data: DataType[];
};
type DataType = {
  count: number;
  week: string;
};
const StudentGrouthChart = ({ data, paid, total, unpaid }: AllDataType) => {
  return (
    <div>
      <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
        <CardHeader className="space-y-0 pb-2">
          <CardDescription>Total Students</CardDescription>
          <CardTitle className="text-4xl tabular-nums">
            {total}
            <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground"></span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              steps: {
                label: "Steps",
                color: "hsl(var(--chart-1))",
              },
            }}
          >
            <BarChart
              accessibilityLayer
              margin={{
                left: -4,
                right: -4,
              }}
              data={data}
            >
              <Bar
                dataKey="count"
                fill="var(--color-steps)"
                radius={5}
                fillOpacity={0.6}
                activeBar={<Rectangle fillOpacity={0.8} />}
              />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                tickFormatter={(value) => {
                  return value;
                }}
              />
              <ChartTooltip
                defaultIndex={2}
                content={
                  <ChartTooltipContent
                    hideIndicator
                    labelFormatter={(value) => "info"}
                  />
                }
                cursor={false}
              />
              <ReferenceLine
                y={1200}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="3 3"
                strokeWidth={1}
              >
                <Label
                  position="insideBottomLeft"
                  value="Average Steps"
                  offset={10}
                  fill="hsl(var(--foreground))"
                />
                <Label
                  position="insideTopLeft"
                  value="12,343"
                  className="text-lg"
                  fill="hsl(var(--foreground))"
                  offset={10}
                  startOffset={100}
                />
              </ReferenceLine>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-1">
          <CardDescription>
            The bar Chart show the last 7 week student registration progress
            information
          </CardDescription>
          <CardDescription>
            You have <span className="font-medium text-foreground">{paid}</span>{" "}
            paid Students and{" "}
            <span className="text-red-500 font-bold">{unpaid}</span> unpaid
            students from all of your branches
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentGrouthChart;
