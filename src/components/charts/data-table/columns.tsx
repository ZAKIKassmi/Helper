"use client";

import { Donors } from "@/lib/types";
import { ColumnDef, FilterFn } from "@tanstack/react-table";

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
import Arrow from "@/components/icons/arrow";
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";
import { getYesterdayTodayTomorrow } from "@/lib/get-yesterday-today-tomorrow";

//define custom filtring function for filtring table
const exactTextFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const cellValue = row.getValue(columnId) as string;
  if(filterValue == 'All') return true;
  return (cellValue === filterValue)
};


export const columns: ColumnDef<Donors>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
      className="data-[state=checked]:bg-c-red-500 data-[state=checked]:text-primary-foreground data-[state=checked]:border-c-red-500" 
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
      
    ),
    cell: ({ row }) => (
      <Checkbox
      className="data-[state=checked]:bg-c-red-500 data-[state=checked]:text-primary-foreground data-[state=checked]:border-c-red-500" 
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => <div className="font-semibold text-n-900">Full Name</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="font-semibold text-n-900">Email</div>,
  },
  {
    accessorKey: "bloodType",
    header: () => <div className="font-semibold text-n-900">Blood Type</div>,
    filterFn: exactTextFilter
  },
  {
    accessorKey: "gender",
    header: () => <div className="font-semibold text-n-900">Gender</div>,
    filterFn: exactTextFilter
  },
  {
    accessorKey: "date",
    header: () => <div className="font-semibold text-n-900">Date</div>,
    filterFn: exactTextFilter,
    cell: ({ row }) => {
      const { date } = row.original; // Extract the date value from the row data
      const dates = getYesterdayTodayTomorrow();

      if (date === dates.todayStr) return "Today";
      if (date === dates.yesterdayStr) return "Yesterday";
      if (date === dates.tomorrowStr) return "Tomorrow";

      return date; 
    },
    
  },
  {
    accessorKey: "donationTime",
    header: ({ column }) => {
      return (
        <div className="font-semibold text-n-900 cursor-pointer flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className={`${column.getIsSorted() === "asc" ? "rotate-90" : "-rotate-90"} duration-300`}>
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
              <Dialog>
            <DropdownMenuItem onClick={(e) => {
                e.preventDefault();
              }}>
              <DialogTrigger>View Donor Details</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <Avatar >
                      <AvatarImage  width={100} height={100} className="rounded-full w-[6.25rem] h-[6.25rem] object-cover"  src="/images/de.jpg" alt="user profile image"/>
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    

                      <div className="flex w-full flex-col pb-4 gap-1">
                        <DialogTitle className="font-bold text-n-900 text-h6-d">
                          {donor.fullName}
                        </DialogTitle>
                          <DialogDescription className="font-normal text-n-90 ">
                            {donor.email}
                          </DialogDescription>
                      </div>


                    
                      <div className="flex w-full py-2">
                        <p className="flex-1 text-p-n font-medium">Blood Type</p>
                        <p className="flex-1 text-p-n">{donor.bloodType}</p>
                      </div>


                      <div className="flex w-full py-2">
                        <p className="flex-1 text-p-n font-medium">Gender</p>
                        <p className="flex-1 text-p-n">{donor.gender}</p>
                      </div>


                      <div className="flex w-full py-2">
                        <p className="flex-1 text-p-n font-medium">Phone number</p>
                        <p className="flex-1 text-p-n">{donor.phone}</p>
                      </div>

                      <div className="flex w-full py-2">
                        <p className="flex-1 text-p-n font-medium">Birthday</p>
                        <p className="flex-1 text-p-n">{donor.dateOfBirth}</p>
                      </div>

                      <div className="flex w-full py-2">
                        <p className="flex-1 text-p-n font-medium">Address</p>
                        <p className="flex-1 text-p-n">{donor.address}</p>
                      </div>

                  </DialogHeader>
                </DialogContent>
            </DropdownMenuItem>
              </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },

]