import { format } from "date-fns";
import React from "react";

const FormatDate = ({ date }: { date: Date }) => {
  return <>{format(date, "PPPP")}</>;
};

export default FormatDate;
