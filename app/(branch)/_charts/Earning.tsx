import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { BranchMaleFemaleType } from "@/types/payment";

const BranchEarning = ({ data }: { data: BranchMaleFemaleType }) => {
  const { count, gender, total, text } = data;

  return (
    <div>
      <Card x-chunk="dashboard-05-chunk-1" className="bg-transparent">
        <CardHeader className="pb-2">
          <CardDescription>{gender}</CardDescription>
          <CardTitle className="text-4xl font-salsa">{count}</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div className="text-xs text-muted-foreground">out of {total}</div>
        </CardContent>
        <CardFooter>{text}</CardFooter>
      </Card>
    </div>
  );
};

export default BranchEarning;
