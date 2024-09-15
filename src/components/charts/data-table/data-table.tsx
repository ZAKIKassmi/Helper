"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress";
import { Donors } from "@/lib/types";

interface DataTableProps<TData, TValue>{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}




export function DonorsTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>){

  const [sorting, setSorting] = useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({})



  const table = useReactTable({
    data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onSortingChange: setSorting,
  getSortedRowModel: getSortedRowModel(),
  onColumnFiltersChange: setColumnFilters,
  getFilteredRowModel: getFilteredRowModel(),
  onRowSelectionChange: setRowSelection,
  onColumnVisibilityChange: setColumnVisibility,

  state: {
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
  },
  });
  const capacity = Number((data[0] as Donors).capacity);
  return (
    <>
    <div>
      <p className="text-h6-d font-bold text-n-900 mb-[.1rem]">{table.getFilteredRowModel().rows.length} Donors out of {capacity}</p>
      <p className="text-label-n text-n-200 mb-4">Great! You have reached {(table.getFilteredRowModel().rows.length/100)*(capacity || 1)}% of yout capacity today.</p>
      <Progress value={(table.getFilteredRowModel().rows.length/100)*100}/>
    </div>
  <div className="w-full">
    

    <div className="flex justify-between items-center gap-2">

    <div className="flex gap-2 items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-md w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border text-n-900"
          />

          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto focus-visible:ring-0 focus-visible:ring-offset-0">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

    
    </div>
    <div className="flex-1 text-sm text-muted-foreground">
      {table.getFilteredSelectedRowModel().rows.length} of{" "}
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>

    <div className="flex gap-2">
      <Select 
    value={(table.getColumn("bloodType")?.getFilterValue() as string) ?? ""}
    onValueChange={(value) => table.getColumn("bloodType")?.setFilterValue(value)}
    >
      <SelectTrigger className="w-[120px]  focus:ring-0 focus:ring-offset-0">
        <SelectValue placeholder="Blood Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        <SelectItem value="A+">A+</SelectItem>
        <SelectItem value="A-">A-</SelectItem>
        <SelectItem value="B+">B+</SelectItem>
        <SelectItem value="B-">B-</SelectItem>
        <SelectItem value="AB+">AB+</SelectItem>
        <SelectItem value="AB-">AB-</SelectItem>
        <SelectItem value="O+">O+</SelectItem>
        <SelectItem value="O-">O-</SelectItem>
        
      </SelectContent>
      </Select>

      <Select 
  value={(table.getColumn("gender")?.getFilterValue() as string) ?? ""}
  onValueChange={(value) => table.getColumn("gender")?.setFilterValue(value)}
  >
    <SelectTrigger className="w-[120px] focus:ring-0 focus:ring-offset-0">
      <SelectValue placeholder="Gender"/>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="All">All</SelectItem>
      <SelectItem value="Female">Female</SelectItem>
      <SelectItem value="Male">Male</SelectItem>
    </SelectContent>
      </Select>
    </div>
      
  </div>



    
    <div className="rounded-md border text-n-900">
      <Table className="bg-white">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow  key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>


    <div className="flex items-center justify-end space-x-2 py-4 text-white">
    <Button
      variant="outline"
      className="bg-c-red-500 hover:bg-c-red-600 hover:text-white"
      size="sm"
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
    >
      Previous
    </Button>
    <Button
      variant="outline"
      className="bg-c-red-500 hover:bg-c-red-600 hover:text-white"
      size="sm"
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
    >
      Next
    </Button>
  </div>
  </div>
  </>


  )
}