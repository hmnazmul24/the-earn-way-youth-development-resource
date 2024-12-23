"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BranchStudentType } from "@/types/students";
import Image from "next/image";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

import {
  consizeDataPaid,
  StudentPaidType,
} from "@/components/data/tableHelper";
import DownloadListForExcel from "./_docs/DownloadListForExcel";
import RegistrationCardModal from "./RegistrationCardModal";
import StudentActionLists from "./studentEditOptions/StudentActionLists";
import { BsThreeDotsVertical } from "react-icons/bs";
import StudentFilteredBox from "./StudentFilteredBox";
import useStudentFilter from "@/hooks/useStudentFilterStore";

const PaidStudentTable = ({
  info,
  branchName,
}: {
  info: BranchStudentType[] | null;
  branchName: string;
}) => {
  const { courseDuration, courseRange, courseTrade, courseYear } =
    useStudentFilter();
  // search filter and consize data
  const [filterText, setFilterText] = useState("");
  let data = info === null ? [] : consizeDataPaid(info, branchName);

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // advanced filter for the student result
  const advancedFilterdData = () => {
    let info = filteredItems;

    if (courseDuration?.trim()) {
      info = info.filter((item) => item.duration === courseDuration);
    }
    if (courseRange?.trim()) {
      info = info.filter((item) => item.range === courseRange);
    }
    if (courseTrade?.trim()) {
      info = info.filter((item) => item.trade === courseTrade);
    }
    if (courseYear?.trim()) {
      info = info.filter(
        (item) =>
          new Date(item.createdAt).getFullYear().toString() === courseYear
      );
    }

    return info;
  };

  // create table

  const columns: TableColumn<StudentPaidType>[] = [
    {
      name: "Picture",
      cell: (row) => (
        <Image
          height={100}
          width={100}
          src={row.picture!}
          alt={row.name}
          className="w-10 my-2 h-10 rounded-sm"
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
      name: "Roll",
      selector: (row) => row.genRoll!,
      sortable: true,
    },
    {
      name: "Registration No",
      selector: (row) => row.genReg!,
      sortable: true,
    },

    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Trade",
      selector: (row) => row.trade,
      sortable: true,
    },

    {
      name: "Result",
      cell: (row) =>
        row.result === "" ? (
          <div className="text-red-600">not provided</div>
        ) : (
          row.result
        ),
      sortable: true,
    },
    {
      name: "Reg. Card",
      cell: (row) => (
        <div className="flex space-x-2">
          <RegistrationCardModal
            info={row.studentInfo}
            branchName={row.branchName}
            id={row.id}
          >
            <div className="bg-green-500 text-white p-2 rounded">Reg. Card</div>
          </RegistrationCardModal>
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <StudentActionLists
            studentId={row.id}
            imgUrl={row.picture!}
            students={info}
          >
            <div className=" p-2 ">
              <BsThreeDotsVertical className="text-xl" />
            </div>
          </StudentActionLists>
        );
      },
    },
  ];

  return (
    <div className="tableContainer overflow-y-auto">
      {filteredItems.length !== 0 && (
        <div className="bg-white border-2 border-gray-300/50 shadow-sm rounded-md mb-4 p-2 md:p-4">
          <StudentFilteredBox
            filteredInfo={advancedFilterdData()}
            info={filteredItems}
          />
        </div>
      )}
      <div className="p-4 min-w-[600px] bg-white rounded-sm">
        <DataTable
          title={
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-center gap-3">
                <span>Students Lists</span>{" "}
                <DownloadListForExcel studentInfo={data}>
                  <Button>Excel</Button>
                </DownloadListForExcel>
              </div>{" "}
              <div className="flex items-center mr-2 my-2 justify-end gap-2">
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
          data={advancedFilterdData()}
          pagination
          highlightOnHover
          paginationResetDefaultPage={resetPaginationToggle}
          responsive
        />
      </div>
    </div>
  );
};

export default PaidStudentTable;
