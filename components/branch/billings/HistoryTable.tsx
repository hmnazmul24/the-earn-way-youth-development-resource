"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentHistoryType } from "@/types/payment";
import { BranchStudentType } from "@/types/students";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

const columns: TableColumn<PaymentHistoryType>[] = [
  {
    name: "Name",
    cell: (row) => <div className="font-bold">{row.name}</div>,
    sortable: true,
  },
  {
    name: "Roll",
    selector: (row) => row.roll,
    sortable: true,
  },
  {
    name: "Course Trade",
    selector: (row) => row.courseTrade,
    sortable: true,
  },

  {
    name: "Mobile",
    selector: (row) => row.phoneNo,
    sortable: true,
  },
  {
    name: "Course Duration",
    selector: (row) => row.courseDuration,
    sortable: true,
  },
  {
    name: "Status",
    cell: (row) => {
      return <div className="text-green-500">{row.status}</div>;
    },
    sortable: true,
  },
];

const PaymentHistoryTable = ({ info }: { info: PaymentHistoryType[] }) => {
  const [filterText, setFilterText] = useState("");
  let data = info;

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <div className="tableContainer">
      <div className="p-4 min-w-[600px]  bg-white rounded-sm">
        <DataTable
          title={
            <div className="w-full flex items-center justify-between">
              <div>
                <span>Students Lists</span> <Button>Excel</Button>
              </div>{" "}
              <div className="flex items-center my-2 justify-end gap-2">
                <Input
                  type="text"
                  placeholder="Search by name"
                  className="p-2 border w-52 border-gray-300 rounded"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <Button
                  className="ml-2  text-white p-2 px-4 rounded"
                  onClick={() => {
                    setResetPaginationToggle(!resetPaginationToggle);
                    setFilterText("");
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          }
          theme="tomato"
          columns={columns}
          data={filteredItems}
          pagination
          highlightOnHover
          paginationResetDefaultPage={resetPaginationToggle}
          responsive
        />
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
