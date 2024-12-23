import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BranchStudentType } from "@/types/students";
import { cn } from "@/lib/utils"; // Utility for conditional class names
import Image from "next/image";

const DetailStudentInfo = ({
  children,
  student,
  imgUrl,
}: {
  children: React.ReactNode;
  student: BranchStudentType;
  imgUrl: string;
}) => {
  return (
    student && (
      <div>
        <Dialog>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Student Information</DialogTitle>
              <DialogDescription>
                Detailed information about the selected student is provided
                below.
              </DialogDescription>
            </DialogHeader>
            <Card className="border rounded-lg shadow-md mt-4">
              <CardHeader className="flex items-center gap-4">
                <Image
                  src={imgUrl || "/default-avatar.png"}
                  alt={student.name}
                  height={100}
                  width={100}
                  className="w-20 h-20 rounded-full object-cover border"
                />
                <div>
                  <CardTitle className="text-xl font-bold">
                    {student.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className={cn(
                      student.isPaid
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    )}
                  >
                    {student.isPaid ? "Fees Paid" : "Fees Not Paid"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Personal Information</h3>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>
                        <strong>Father&lsquo;s Name:</strong>{" "}
                        {student.fatherName}
                      </li>
                      <li>
                        <strong>Mother&lsquo;s Name:</strong>{" "}
                        {student.motherName}
                      </li>
                      <li>
                        <strong>Date of Birth:</strong> {student.dateOfBirth}
                      </li>
                      <li>
                        <strong>Gender:</strong> {student.gender}
                      </li>
                      <li>
                        <strong>Blood Group:</strong> {student.bloodGroup}
                      </li>
                      <li>
                        <strong>Nationality:</strong> {student.nationality}
                      </li>
                      <li>
                        <strong>Religion:</strong> {student.religion}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Academic Details</h3>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      <li>
                        <strong>Course:</strong> {student.courseTrade}
                      </li>
                      <li>
                        <strong>Duration:</strong> {student.courseDuration}
                      </li>
                      <li>
                        <strong>Year Range:</strong> {student.courseRange}
                      </li>
                      <li>
                        <strong>Session Roll:</strong>{" "}
                        {student.genRoll || "N/A"}
                      </li>
                      <li>
                        <strong>Registration:</strong> {student.genReg || "N/A"}
                      </li>
                      <li>
                        <strong>Result:</strong> {student.genResult || "N/A"}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold">Previous Education</h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>
                      <strong>Passed Type:</strong> {student.passedType}
                    </li>
                    <li>
                      <strong>Passed Board:</strong> {student.passedBoard}
                    </li>
                    <li>
                      <strong>Passed Roll:</strong> {student.passedRoll}
                    </li>
                    <li>
                      <strong>Passed Year:</strong> {student.passedYear}
                    </li>
                    <li>
                      <strong>Result:</strong> {student.passedResult}
                    </li>
                  </ul>
                </div>

                <div className="mt-4 text-xs text-gray-400 text-right">
                  Created at: {new Date(student.createdAt).toDateString()}
                </div>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </div>
    )
  );
};

export default DetailStudentInfo;
