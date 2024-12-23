import { AdminBranchProgressType } from "@/types";

export function generateOTP(length = 5) {
  const characters = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }

  return Number(otp);
}

export function addMinutesToDate(num: number) {
  const newDate = new Date();
  newDate.setMinutes(newDate.getMinutes() + num);
  return newDate;
}

export const generateUniqueTransId = (): string => {
  let length = 16;
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
};

export function generateDateArray(
  startDate: Date,
  endDate: Date
): AdminBranchProgressType[] {
  const dates: AdminBranchProgressType[] = [];

  // Loop from startDate to endDate
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // Push a copy of the date to the array
    dates.push({
      date: new Date(d),
      count: 0,
    });
  }

  return dates;
}

export function findEarliestDate(dates: Date[]) {
  return new Date(Math.min(...dates.map((date) => date.getTime())));
}

// generate dayWeeks
export function generateWeeklyData(
  weeks: number
): Array<{ count: number; time: { from: Date; to: Date } }> {
  const data = [];
  const today = new Date();

  // Loop to generate each week's data
  for (let i = 0; i < weeks; i++) {
    const fromDate = new Date(today);
    const toDate = new Date(today);

    // Calculate the `from` and `to` dates for the current week
    fromDate.setDate(today.getDate() - 7 * (i + 1) + 1);
    toDate.setDate(today.getDate() - 7 * i);

    // Add the week's data to the array
    data.push({
      count: 0,
      time: { from: fromDate, to: toDate },
    });
  }

  return data;
}
