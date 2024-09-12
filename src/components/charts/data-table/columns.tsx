"use client";

import { Donors } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Donors>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name"
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "gender",
    header: "Gender"
  },
  {
    accessorKey: "bloodType",
    header: "Blood Type"
  },
]