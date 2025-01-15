"use client";

import { Investor } from "@/types/investor";
import { Badge } from "@/components/ui/badge";

export type Column = {
  key: keyof Investor;
  header: string;
  cell: (investor: Investor) => React.ReactNode;
};

export const columns: Column[] = [
  // ... other columns ...
  {
    key: "status",
    header: "Status",
    cell: (investor: Investor) => {
      const status = investor.status;
      if (typeof status !== 'string') return null;
      return (
        <Badge 
          variant={status === "Dead" ? "destructive" : "secondary"}
          className={status === "Active" ? "bg-green-500 hover:bg-green-600" : ""}
        >
          {status}
        </Badge>
      );
    },
  },
  // ... other columns ...
];