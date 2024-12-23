"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BranchType } from "@/Schema/branchSchema";
import { BranchesTableType } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

import { RxOpenInNewWindow } from "react-icons/rx";
import { FaEdit, FaIdBadge } from "react-icons/fa";
import Link from "next/link";

const columns: TableColumn<BranchesTableType>[] = [
  {
    name: "Picture",
    cell: (row) => (
      <Image
        src={row.picture}
        alt={row.name}
        height={100}
        width={100}
        className="w-12 my-1 h-12 rounded-sm"
      />
    ),
    sortable: false,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Mobile",
    selector: (row) => row.mobile,
    sortable: true,
  },
  {
    name: "District",
    selector: (row) => row.district,
    sortable: true,
  },
  {
    name: "Number of Computers",
    selector: (row) => row.noOfCom,
    sortable: true,
  },
  {
    name: "Institution Age",
    selector: (row) => row.insAge,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.varified,
    cell: (row) =>
      row.varified === true ? (
        <span>verified</span>
      ) : (
        <span className="text-red-500">not verified</span>
      ),
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <div className="flex space-x-2">
        <Link href={`/admin/branches/${row.id}`}>
          {" "}
          <Button className="bg-green-500 hover:bg-green-600">
            <RxOpenInNewWindow className="text-lg font-bold" />
          </Button>
        </Link>
      </div>
    ),
  },
];

const BranchTable = ({ data }: { data: BranchesTableType[] }) => {
  const [filterText, setFilterText] = useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="tableContainer">
      <div className="p-4 min-w-[600px] bg-white rounded-sm">
        <DataTable
          title={
            <div className="w-full flex items-center justify-between">
              <div>
                <span>Students Lists</span>
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
                  className="ml-2 bg-amber-500 hover:bg-amber-600  text-white p-2 px-4 rounded"
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

export default BranchTable;
