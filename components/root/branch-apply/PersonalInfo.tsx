// PersonalInfoForm.tsx
import React from "react";
import useBranchStore from "@/hooks/useBranchStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PersonalInfoForm: React.FC = () => {
  const { personalInfo, setPersonalInfo } = useBranchStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPersonalInfo({ [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-50 p-6 rounded-none shadow-md">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
      <div className="space-y-4">
        <input
          className="w-full p-3 border rounded-md"
          type="text"
          name="fullName"
          value={personalInfo.fullName}
          onChange={handleChange}
          placeholder="your full Name"
        />
        <input
          className="w-full p-3 border rounded-md"
          type="text"
          name="fathersName"
          value={personalInfo.fathersName}
          onChange={handleChange}
          placeholder="Father's Name"
        />
        <input
          className="w-full p-3 border rounded-md"
          type="text"
          name="mothersName"
          value={personalInfo.mothersName}
          onChange={handleChange}
          placeholder="Mother's Name"
        />

        <Select onValueChange={(value) => setPersonalInfo({ gender: value })}>
          <SelectTrigger className="w-full py-6 bg-white">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => setPersonalInfo({ bloodGroup: value })}
        >
          <SelectTrigger className="w-full py-6 bg-white">
            <SelectValue placeholder="Select Blood Group" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((blood) => (
              <SelectItem value={blood} key={blood}>
                {blood}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
