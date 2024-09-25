"use client";
import { Appointment } from "@/lib/types";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import Arrow from "@/components/icons/arrow";
import { Checkbox } from "@/components/ui/checkbox"
import { getYesterdayTodayTomorrow } from "@/lib/get-yesterday-today-tomorrow";
import { formatRFC7231 } from "date-fns";
import { ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { deleteAppointment } from "../../../general-actions/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    accessorKey: "bloodBank",
    header: ({ column }) => {
      return (
        <div className="font-semibold text-n-900 cursor-pointer flex items-center gap-1"> 
          <p>Blood Bank</p>
        </div>
      )
    },
  },
  {
    accessorKey: "donationDate",
    header: ({ column }) => {
      return (
        <div className="font-semibold text-n-900 cursor-pointer flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p>Date</p>
          <ChevronsUpDown  className="mt-[2px]" width={15} height={15}/>
        </div>
      )
    },
    cell: ({row})=>{
      const date = row.original;
      return formatRFC7231(new Date(date.donationDate)).slice(0, 16);
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.getValue("donationDate"));
      const dateB = new Date(rowB.getValue("donationDate"));
      return dateA.getTime() - dateB.getTime();
    },
  },
  {
    accessorKey: "donationTime",
    header: ({ column }) => {
      return (
        <div className="font-semibold text-n-900 cursor-pointer flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        > 
          <p>Time</p>
          <ChevronsUpDown  className="mt-[2px]" width={15} height={15}/>
        </div>
      )
    },
  },
  {
    header: () => <div className="font-semibold text-n-900">Actions</div>,
    id: "actions",
    cell: ({row})=>{
      const appointment = row.original;
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
              onClick={() => {
                navigator.clipboard.writeText(appointment.id);
                toast.success("Copied");
              }}
            >
              Copy Donor Id
            </DropdownMenuItem>
            <AlertDialog>
            <DropdownMenuItem onClick={(e) => {
                e.preventDefault();
              }}>
              <AlertDialogTrigger>Delete appointment</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete this appointment?</AlertDialogTitle>
                  <AlertDialogDescription>
                  This action is irreversible. Your appointment will be permanently deleted, and your credits will be deducted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel >Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500 hover:bg-red-600" 
                  onClick={()=>
                    {deleteAppointment(appointment.id) 
                    toast.success("Appointment has been deleted successfully");}}>
                      Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </DropdownMenuItem>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
]