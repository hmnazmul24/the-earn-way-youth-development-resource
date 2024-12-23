"use client";

import { employeeAccessSwitch } from "@/actions/employee/employee";
import { customToast } from "@/components/shared/ToastContainer";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { BsCopy } from "react-icons/bs";

const EmployeeCredentials = ({
  userName,
  password,
  id,
  isActive,
}: {
  userName: string;
  password: string;
  id: string;
  isActive: boolean;
}) => {
  const queryClient = useQueryClient();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  // update status

  const { mutate, isPending } = useMutation({
    mutationFn: employeeAccessSwitch,
    onSuccess: async ({ message }) => {
      if (message) {
        customToast("success", message);
        await queryClient.invalidateQueries({ queryKey: ["employees"] });
      }
    },
  });

  // Function to copy text and show "Copied!" message
  const handleCopy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };
  return (
    <div>
      <div className="mt-8">
        <h1 className="text-lg font-semibold text-blue-600 drop-shadow-sm mb-4">
          Employee Sub-Branch-Admin Credentials
        </h1>

        <ul className="p-4 bg-blue-100 rounded-lg shadow-md space-y-4">
          <li className="flex items-center justify-end gap-3 my-4">
            {isActive ? (
              <span className="text-xs text-green-700">
                Accessing Branch Dashboard is enabled, click to disable
              </span>
            ) : (
              <span className="text-xs text-gray-500">
                Accessing Branch Dashboard is disabled, click to enable
              </span>
            )}
            <Switch
              disabled={isPending}
              checked={isActive}
              onCheckedChange={() => mutate(id)}
              className="drop-shadow-sm data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-400/90"
            />
          </li>
          {/* Username Field */}
          <li className="flex items-center justify-between gap-4">
            <span className="font-medium text-gray-700">Username:</span>
            <div className="p-2 flex-grow flex items-center justify-between bg-white rounded-md shadow-sm">
              <span className="text-gray-600">{userName}</span>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleCopy("username", userName)}
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
              <span className="text-gray-600">{password}</span>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleCopy("password", password)}
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
  );
};

export default EmployeeCredentials;
