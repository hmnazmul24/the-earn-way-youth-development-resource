import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { BsArrowUpRight } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TransInfoType } from "@/types/payment";

const LastTransections = ({ data }: { data: TransInfoType[] }) => {
  return (
    <div>
      <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Recent transactions from your branch.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/branch/billings/payment-history">
              View All
              <BsArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Students</TableHead>

                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="font-medium"> name : {item.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      trade: {item.trade}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    {item.amount} taka
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LastTransections;
