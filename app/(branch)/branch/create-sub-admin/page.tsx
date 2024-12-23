"use client";

import { subBranchAdminAccess } from "@/components/branch/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { BsCopy } from "react-icons/bs";

const CreateSubAdmin = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Function to copy text and show "Copied!" message
  const handleCopy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };
  return (
    <div className="lg:grid grid-cols-[1fr_1.4fr]  gap-5">
      <div className="p-6 bg-gray-50 rounded-lg shadow-md self-start">
        {/* Form Section */}
        <h1 className="text-base mb-1 text-emerald-700">
          Update sub-branch-admin cradentials
        </h1>
        <div className="p-4 border border-emerald-500 bg-emerald-100 rounded-lg shadow-md space-y-4">
          <Input
            type="text"
            className="bg-white border border-gray-300 rounded-md focus:ring-emerald-500"
            placeholder="Enter username"
          />
          <Input
            type="password"
            className="bg-white border border-gray-300 rounded-md focus:ring-emerald-500"
            placeholder="Enter password"
          />
          <div className="flex justify-end">
            <Button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600">
              Update
            </Button>
          </div>
        </div>

        {/* Credentials Section */}
        <div className="mt-8">
          <h1 className="text-lg font-semibold text-blue-600 drop-shadow-sm mb-4">
            Sub-Branch Admin Credentials
          </h1>
          <ul className="p-4 bg-blue-100 rounded-lg shadow-md space-y-4">
            {/* Username Field */}
            <li className="flex items-center justify-between gap-4">
              <span className="font-medium text-gray-700">Username:</span>
              <div className="p-2 flex-grow flex items-center justify-between bg-white rounded-md shadow-sm">
                <span className="text-gray-600">username123</span>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleCopy("username", "username123")}
                >
                  {copiedField === "username" ? (
                    <CheckCircle className="text-green-500" size={18} />
                  ) : (
                    <BsCopy className="text-gray-500 hover:text-blue-600" />
                  )}
                  {copiedField === "username" && (
                    <span className="text-green-500 text-xs">Copied!</span>
                  )}
                </div>
              </div>
            </li>
            {/* Password Field */}
            <li className="flex items-center justify-between gap-4">
              <span className="font-medium text-gray-700">Password:</span>
              <div className="p-2 flex-grow flex items-center justify-between bg-white rounded-md shadow-sm">
                <span className="text-gray-600">4379817487147</span>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleCopy("password", "4379817487147")}
                >
                  {copiedField === "password" ? (
                    <CheckCircle className="text-green-500" size={18} />
                  ) : (
                    <BsCopy className="text-gray-500 hover:text-blue-600" />
                  )}
                  {copiedField === "password" && (
                    <span className="text-green-500 text-xs">Copied!</span>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-6 bg-gray-50 rounded-lg shadow-md  mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Sub-Branch Admin Access
        </h2>
        <ul className="space-y-6">
          {subBranchAdminAccess.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex-none">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateSubAdmin;
