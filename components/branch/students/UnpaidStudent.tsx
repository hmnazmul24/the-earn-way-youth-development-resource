"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BranchStudentType } from "@/types/students";
import Link from "next/link";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaDownload, FaEdit, FaIdBadge } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import DeleteStudent from "./DeleteStudent";
import { processAmerpayPayment } from "@/actions/amerpay";
import { CourseFeesType, Student } from "@/types";
import { consizeData, PriceSettingHelper } from "@/components/data/priceHelper";
import Image from "next/image";
import { AdminStudentPayment } from "@/actions/payments";
import { useQueryClient } from "@tanstack/react-query";
import { customToast } from "@/components/shared/ToastContainer";
import StudentActionLists from "./studentEditOptions/StudentActionLists";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";

type PaymentType = {
  id: string;
  amount: string;
  phone: string;
  name: string;
};

const UnPaidStudentTable = ({
  info,
  feesData,
  isAdminStudent,
}: {
  info: BranchStudentType[] | null;
  feesData: CourseFeesType[];
  isAdminStudent: boolean;
}) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const hanleClickFunc = async (info: PaymentType) => {
    setLoading(info.id);
    try {
      let data = await processAmerpayPayment(info);
      if (data.data?.payment_url) {
        window.open(data.data.payment_url, "_self");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const hanleAdminStudentPayment = async (id: string) => {
    setLoading(id);
    try {
      let data = await AdminStudentPayment(id);
      if (data?.success) {
        customToast("success", "Student Accepted");
        queryClient.invalidateQueries({ queryKey: ["allStudentsOfBranch"] });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const columns: TableColumn<Student>[] = [
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
      name: "Session",
      selector: (row) => row.session,
      sortable: true,
    },
    {
      name: "Fees",
      cell: (row) =>
        row.isAdminStudent ? (
          <Button
            className="bg-amber-500 hover:bg-amber-700"
            onClick={() => hanleAdminStudentPayment(row.id)}
            disabled={loading === row.id} // Disable button if request is in progress
          >
            {loading === row.id ? "Processing..." : "Accept"}
          </Button>
        ) : (
          <div>
            {typeof row.fees === "boolean" || row.fees === "" ? (
              <div className="p-2 rounded text-white bg-amber-500">
                Contact with admin
              </div>
            ) : (
              <div className="">
                <Button
                  className="bg-amber-500 font-sans text-sm hover:bg-amber-600"
                  onClick={async () =>
                    await hanleClickFunc({
                      id: row.id,
                      amount: row.fees as string,
                      name: row.name,
                      phone: row.mobile,
                    })
                  }
                  disabled={loading === row.id} // Disable button if request is in progress
                >
                  {loading === row.id ? "Processing..." : `Pay ${row.fees} BDT`}
                </Button>
              </div>
            )}
          </div>
        ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <StudentActionLists
          studentId={row.id}
          imgUrl={row.picture!}
          publicId={row.publicId}
          students={info}
        >
          <div className=" p-2 ">
            <BsThreeDotsVertical className="text-xl" />
          </div>
        </StudentActionLists>
      ),
    },
  ];

  let data =
    info === null
      ? []
      : consizeData({ data: info, feesInfo: feesData, isAdminStudent });

  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  //single student info for showing student details

  return (
    <div className="tableContainer">
      <div className="p-4 min-w-[600px] bg-white rounded-sm">
        <DataTable
          title={
            <div className="w-full  flex items-center justify-between">
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

export default UnPaidStudentTable;
