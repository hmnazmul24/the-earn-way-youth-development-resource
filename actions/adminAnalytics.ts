"use server";

import { addDays, differenceInDays, format, isSameDay } from "date-fns";

import {
  findEarliestDate,
  generateDateArray,
  generateWeeklyData,
} from "@/data/helper";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

export const admin_branch_grouth = async () => {
  try {
    // first chart show
    let branches = await prisma.branch.findMany({
      select: { createdAt: true, isVarified: true },
    });
    let varifiedBranch = branches.filter((item) => item.isVarified === true);
    let firstBranchDate = findEarliestDate(
      varifiedBranch.map((item) => item.createdAt)
    );

    let dataArr = generateDateArray(firstBranchDate, new Date());

    varifiedBranch.forEach((item) => {
      dataArr.forEach((info, i) => {
        if (
          item.createdAt.toString().slice(0, 14) ===
          info.date.toString().slice(0, 14)
        ) {
          dataArr[i].count += 1;
        }
      });
    });

    // second chart show

    const students = await prisma.student.findMany({
      select: { createdAt: true, isPaid: true },
    });
    const studentCount = students.length;

    let dates = generateWeeklyData(7);
    students.forEach((item) => {
      const createdAtDate = new Date(item.createdAt); // Convert the string to a Date object
      dates.forEach(({ time }, i) => {
        if (createdAtDate >= time.from && createdAtDate <= time.to) {
          dates[i].count += 1;
        }
      });
    });
    let paidStudentsCount = students.filter(
      (item) => item.isPaid === true
    ).length;
    let unpaidStudentCount = students.length - paidStudentsCount;

    // revenue show
    let payments = await prisma.payment.findMany({ select: { amount: true } });
    let revenue = 0;

    payments.forEach((item) => {
      revenue += Number(item.amount);
    });

    return {
      dataArr,
      branchCount: varifiedBranch.length,
      notVarified: branches.length - varifiedBranch.length,
      studentProgressArr: dates,
      studentCount,
      paidStudentsCount,
      unpaidStudentCount,
      revenue,
    };
  } catch (error) {
    return { error: "internal server error" };
  }
};

export const admin_revenue_growth = async () => {
  try {
    // Fetch payments data
    let payments = await prisma.payment.findMany({
      select: { amount: true, createdAt: true },
    });

    // Initialize revenue and find the earliest date
    let revenue = 0;
    let earliestDate = findEarliestDate(
      payments.map((item) => new Date(item.createdAt))
    );
    let currentDate = new Date();

    // Calculate the difference in days and create an array of objects from the earliest date to now
    let daysDifference = differenceInDays(currentDate, earliestDate);
    let Arr = [];

    for (let i = 0; i <= daysDifference; i++) {
      let date = addDays(earliestDate, i);
      let formattedDate = format(date, "yyyy-MM-dd"); // Format date as needed

      Arr.push({
        date: formattedDate,
        revenue: 0, // Initialize revenue for each date
      });
    }

    // Update the revenue in the array based on payments
    payments.forEach((payment) => {
      let paymentDate = new Date(payment.createdAt);

      Arr.forEach((entry) => {
        if (isSameDay(new Date(entry.date), paymentDate)) {
          entry.revenue += Number(payment.amount);
        }
      });

      // Update total revenue
      revenue += Number(payment.amount);
    });

    return {
      revenue,
      Arr, // Return the array with updated revenue
    };
  } catch (error) {
    return { error: "internal server error" };
  }
};
