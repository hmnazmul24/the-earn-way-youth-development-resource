// MoreInfoForm.tsx
import React from "react";
import useBranchStore from "@/hooks/useBranchStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BDDistrics,
  BDDivition,
  BDUpozila,
} from "@/components/data/array_info";

const MoreInfoForm: React.FC = () => {
  const { moreInfo, setMoreInfo } = useBranchStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setMoreInfo({ [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-slate-50 p-6 rounded-none shadow-md">
      <h2 className="text-2xl font-bold mb-4">More Information</h2>
      <div className="space-y-4">
        <input
          className="w-full p-3 border rounded-md"
          type="text"
          name="additionalMobile"
          value={moreInfo.additionalMobile}
          onChange={handleChange}
          placeholder="Additional Mobile (optional)"
        />

        <Select onValueChange={(value) => setMoreInfo({ division: value })}>
          <SelectTrigger className="w-full bg-white py-6">
            <SelectValue placeholder="Select your Divition" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {BDDivition.map((item) => (
              <SelectItem value={item.name} key={item.id}>
                {item.name} -{" "}
                <span className="font-bangla">{item.bn_name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          disabled={moreInfo.division ? false : true}
          onValueChange={(value) => setMoreInfo({ district: value })}
        >
          <SelectTrigger className="w-full bg-white py-6">
            <SelectValue placeholder="Select your District" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {moreInfo.division &&
              BDDistrics.filter(
                (info) =>
                  info.division_id ===
                  BDDivition.filter(
                    (item) => item.name === moreInfo.division
                  )[0].id
              ).map((dInfo) => (
                <SelectItem value={dInfo.name} key={dInfo.id}>
                  {dInfo.name} -{" "}
                  <span className="font-bangla">{dInfo.bn_name}</span>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select
          disabled={moreInfo.district ? false : true}
          onValueChange={(value) => setMoreInfo({ upazila: value })}
        >
          <SelectTrigger className="w-full bg-white py-6">
            <SelectValue placeholder="Select your Upazila" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {moreInfo.district &&
              BDUpozila.filter(
                (info) =>
                  info.district_id ===
                  BDDistrics.filter(
                    (item) => item.name === moreInfo.district
                  )[0].id
              ).map((uInfo) => (
                <SelectItem value={uInfo.name} key={uInfo.id}>
                  {uInfo.name} -{" "}
                  <span className="font-bangla">{uInfo.bn_name}</span>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <input
          className="w-full p-3 border rounded-md"
          type="text"
          name="address"
          value={moreInfo.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          className="w-full p-3 border rounded-md"
          type="text"
          name="postcode"
          value={moreInfo.postcode}
          onChange={handleChange}
          placeholder="Postcode (optional)"
        />
      </div>
    </div>
  );
};

export default MoreInfoForm;
