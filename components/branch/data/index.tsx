import { ShieldCheck, Lock, FileText, Edit, Trash2 } from "lucide-react";

export const subBranchAdminAccess = [
  {
    icon: <ShieldCheck />,
    title: "Operational Management",
    description:
      "Full access to manage operational data, including creation, updates, and deletions.",
  },
  {
    icon: <FileText />,
    title: "Report Management",
    description: "Can view and manage branch performance reports and logs.",
  },
  {
    icon: <Edit />,
    title: "Branch Information",
    description:
      "Allowed to update branch information, excluding sensitive data like passwords.",
  },
  {
    icon: <Lock />,
    title: "Restricted Password Access",
    description: "Cannot manage passwords or access security credentials.",
  },
  {
    icon: <Trash2 />,
    title: "Employee & Salary Management",
    description:
      "Restricted from managing employee profiles and salary-related settings.",
  },
];
