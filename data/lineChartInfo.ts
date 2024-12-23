import { LineChartArrType } from "@/types";

export function getLast30Days(): LineChartArrType[] {
  const dates: LineChartArrType[] = [];
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    dates.push({
      day: date,
      female: 0,
      male: 0,
    });
  }
  let lastMonthsArr = dates;
  return lastMonthsArr;
}

export const formattedDate = (date: Date) => {
  let newDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short", // Options: 'numeric', '2-digit', 'long', 'short', 'narrow'
    day: "numeric",
  });
  return newDate;
};
