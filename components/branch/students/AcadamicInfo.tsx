"use client";

import React, { Fragment, useState } from "react";
import { bloodGroups, boardArr } from "@/components/data/array_info";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useStudentStore from "@/hooks/useStudentStore";

const AcadamicInfo = () => {
  const { studentInfo, setStudentInfo } = useStudentStore();
  const [selected, setSelected] = useState<"JSC" | "SSC">(
    studentInfo.passedType
  );

  return (
    <div className="bg-white rounded-sm ">
      <h1 className="branch_heading flex ml-5 items-center justify-start gap-3">
        <span>Academic Information </span>
        <div className="">
          <Button
            variant={selected === "JSC" ? "outline" : "ghost"}
            onClick={() => {
              setSelected("JSC");
              setStudentInfo({ passedType: "JSC" });
              setStudentInfo({ passedResult: "" });
              setStudentInfo({ passedRoll: "" });
              setStudentInfo({ passedYear: "" });
            }}
          >
            JSC
          </Button>{" "}
          <Button
            variant={selected === "JSC" ? "ghost" : "outline"}
            onClick={() => {
              setSelected("SSC");
              setStudentInfo({ passedType: "SSC" });
              setStudentInfo({ passedResult: "" });
              setStudentInfo({ passedRoll: "" });
              setStudentInfo({ passedYear: "" });
            }}
          >
            SSC
          </Button>
        </div>
      </h1>
      {selected === "JSC" ? (
        <section className="bg-white p-4 rounded-sm mb-3">
          <div className="grid  grid-cols-1 md:grid-cols-[1fr_1fr_0.7fr] gap-4 md:gap-16">
            <div className="flex items-center flex-col gap-3">
              <Select
                value={studentInfo.passedBoard || ""}
                onValueChange={(value) =>
                  setStudentInfo({ passedBoard: value })
                }
              >
                <SelectTrigger className="w-full branch_input">
                  <SelectValue placeholder="Select JSC Board" />
                </SelectTrigger>
                <SelectContent>
                  {boardArr.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Input
                type="number"
                placeholder="JSC roll"
                className="branch_input"
                onChange={(e) => setStudentInfo({ passedRoll: e.target.value })}
                value={studentInfo.passedRoll || ""}
              />
              <Input
                type="number"
                placeholder="JSC year"
                className="branch_input"
                onChange={(e) => setStudentInfo({ passedYear: e.target.value })}
                value={studentInfo.passedYear || ""}
              />
            </div>
            <div className="flex items-center flex-col gap-3">
              <Input
                type="text"
                placeholder="JSC result"
                className="p-6 bg-white"
                onChange={(e) =>
                  setStudentInfo({ passedResult: e.target.value })
                }
                value={studentInfo.passedResult || ""}
              />
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-white p-4 rounded-sm mb-3">
          <div className="grid  grid-cols-1 md:grid-cols-[1fr_1fr_0.7fr] gap-4 md:gap-16">
            <div className="flex items-center flex-col gap-3">
              <Select
                value={studentInfo.passedBoard || ""}
                onValueChange={(value) =>
                  setStudentInfo({ passedBoard: value })
                }
              >
                <SelectTrigger className="w-full branch_input">
                  <SelectValue placeholder="Select SSC Board" />
                </SelectTrigger>
                <SelectContent>
                  {boardArr.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Input
                type="number"
                placeholder="SSC roll"
                className="branch_input"
                onChange={(e) => setStudentInfo({ passedRoll: e.target.value })}
                value={studentInfo.passedRoll || ""}
              />
              <Input
                type="number"
                placeholder="SSC year"
                className="branch_input"
                onChange={(e) => setStudentInfo({ passedYear: e.target.value })}
                value={studentInfo.passedYear || ""}
              />
            </div>
            <div className="flex items-center flex-col gap-3">
              <Input
                type="text"
                placeholder="SSC result"
                className="p-6 bg-white"
                onChange={(e) =>
                  setStudentInfo({ passedResult: e.target.value })
                }
                value={studentInfo.passedResult || ""}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AcadamicInfo;
