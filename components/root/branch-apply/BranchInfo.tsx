// BranchInfoForm.tsx
import React from "react";
import useBranchStore from "@/hooks/useBranchStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BranchInfoForm: React.FC = () => {
  const { branchInfo, setBranchInfo } = useBranchStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setBranchInfo({ [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-50 p-6 rounded-none shadow-md">
      <h2 className="text-2xl font-bold mb-4">Branch Information</h2>
      <div className="space-y-4">
        <input
          className="w-full p-3 border rounded-md"
          type="text"
          name="branchName"
          value={branchInfo.branchName}
          onChange={handleChange}
          placeholder="Branch Name"
        />
        <input
          className="w-full p-3 border rounded-md"
          type="text"
          name="branchMobile"
          value={branchInfo.branchMobile}
          onChange={handleChange}
          placeholder="Branch Mobile"
        />
        <input
          className="w-full p-3 border rounded-md"
          type="email"
          name="branchEmail"
          value={branchInfo.branchEmail}
          onChange={handleChange}
          placeholder="Branch Email"
        />

        <Select
          onValueChange={(value) => setBranchInfo({ instituteAge: value })}
        >
          <SelectTrigger className="w-full bg-white py-6">
            <SelectValue
              className="bg-white"
              placeholder="age of your institution"
            />
          </SelectTrigger>
          <SelectContent className="w-full bg-white">
            <SelectItem value="0 to 1 years">form 0 to 1 years</SelectItem>
            <SelectItem value="1 to 3 years">from 1 to 3 years</SelectItem>
            <SelectItem value="3 to 5 years">from 3 to 5 years</SelectItem>
            <SelectItem value="5 to 10 years">from 5 to 10 years</SelectItem>
            <SelectItem value="10+  years">above 10 years</SelectItem>
          </SelectContent>
        </Select>

        <input
          className="w-full p-3 border rounded-md"
          type="text"
          name="noOfComputers"
          value={branchInfo.noOfComputers}
          onChange={handleChange}
          placeholder="No of Computers"
        />
      </div>
    </div>
  );
};

export default BranchInfoForm;
