"use client";

import { Donors } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ArrowDown } from "lucide-react";
import Arrow from "@/components/icons/arrow";

export const columns: ColumnDef<Donors>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => <div className="font-semibold text-n-900">Full Name</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="font-semibold text-n-900">Email</div>,
  },
  {
    accessorKey: "gender",
    header: () => <div className="font-semibold text-n-900">Gender</div>,
  },
  {
    accessorKey: "bloodType",
    header: () => <div className="font-semibold text-n-900">Blood Type</div>,
  },
  {
    accessorKey: "donationTime",
    header: ({ column }) => {
      return (
        <div className="font-semibold text-n-900 cursor-pointer flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className={`${column.getIsSorted() === "asc" ? "rotate-90" : "-rotate-90"} duration-200`}>
            <Arrow direction="right" stroke="2"  width="10" height="10"/>
          </div>
          <p>Time</p>
        </div>
      )
    },
  },
  {
    header: () => <div className="font-semibold text-n-900">Actions</div>,
    id: "actions",
    cell: ({row})=>{
      const donor = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="focus:ring-0 outline-0 focus:ring-offset-0 ">
            <Button  variant="ghost" className="h-8  w-8 p-0 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(donor.id)}
            >
              Copy Donor Id
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=>{}}>View Donor Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },

]