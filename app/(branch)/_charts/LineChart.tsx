"use client";

import { formattedDate } from "@/data/lineChartInfo";
import { LineChartArrType } from "@/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type ChartDataType = {
  male: number;
  female: number;
  day: string;
};
const LineCharts = ({ data }: { data: LineChartArrType[] }) => {
  let newData: ChartDataType[] =
    data &&
    data.map((item) => ({
      day: formattedDate(item.day).slice(0, 6),
      male: item.male,
      female: item.female,
    }));

  return (
    <div className="p-2 rounded shadow-md overflow-x-scroll scrollbar_hidden">
      <LineChart
        height={300}
        width={500}
        data={newData.slice().reverse()}
        className="w-full"
      >
        <XAxis dataKey="day" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="female" stroke="#8884d8" />
        <Line type="monotone" dataKey="male" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default LineCharts;
