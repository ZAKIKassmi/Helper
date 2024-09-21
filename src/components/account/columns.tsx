"use client";
import { Appointment } from "@/lib/types";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import Arrow from "@/components/icons/arrow";
import { Checkbox } from "@/components/ui/checkbox"
import { getYesterdayTodayTomorrow } from "@/lib/get-yesterday-today-tomorrow";
import { formatRFC7231 } from "date-fns";

//define custom filtring function for filtring table
const exactTextFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const cellValue = row.getValue(columnId) as string;
  if(filterValue == 'All') return true;
  return (cellValue === filterValue)
};


export const columns: ColumnDef<Appointment>[] = [
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
    accessorKey: "donationDate",
    header: ({ column }) => {
      return (
        <div className="font-semibold text-n-900 cursor-pointer flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p>Date</p>
          <div className={`${column.getIsSorted() === "asc" ? "rotate-90" : "-rotate-90"} duration-300`}>
            <Arrow direction="right" stroke="2"  width="10" height="10"/>
          </div>
        </div>
      )
    },
    cell: ({row})=>{
      const date = row.original;
      return formatRFC7231(new Date(date.donationDate)).slice(0, 16);
    }
  },
  {
    accessorKey: "donationTime",
    header: ({ column }) => {
      return (
        <div className="font-semibold text-n-900 cursor-pointer flex items-center gap-2"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p>Time</p>
          <div className={`${column.getIsSorted() === "asc" ? "rotate-90" : "-rotate-90"} duration-300`}>
            <Arrow direction="right" stroke="2"  width="10" height="10"/>
          </div>
        </div>
      )
    },
  },
]