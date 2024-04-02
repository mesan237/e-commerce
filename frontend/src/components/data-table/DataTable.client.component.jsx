import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import post from "/src/assets/images/details.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardImage,
  CardTitle,
} from "@/components/ui/card";
import CardItem from "../CardItem";
import { useCreateProductMutation } from "@/slices/product.api.slice";
import { useToast } from "../ui/use-toast";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { setRefetch } from "@/slices/fetch.slice";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DataTable({ columns, data }) {
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const { toast } = useToast();

  const dispatch = useDispatch();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  const [detailsData, setDetailsData] = useState([]);
  const handleDetails = (row) => {
    setDetailsData(row.original);
  };

  const addHandler = async () => {
    try {
      await createProduct();
      dispatch(setRefetch(true));
      toast({
        variant: "success",
        description: "Product has been added",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: error?.data?.message || error.message,
      });
    }
  };
  // console.log(tab.getState());
  return (
    <div className="flex gap-6 items-start">
      <div>
        <p className="mb-4 font-bold h3 ">List of Products</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center mb-2">
            <Input
              placeholder="Filter products' name..."
              value={table.getColumn("name")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
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
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="flex ml-auto"
            onClick={addHandler}
            disabled={loadingCreate}
          >
            {!loadingCreate && <Plus />}
            {/* {loadingCreate && (
              <Loader2 size="icon" className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            Add new product
          </Button>
        </div>
        <div className="rounded-md border flex-1">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
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
                    );
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
                    onClick={() => handleDetails(row)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="relative">
        <Card
          className={`w-[380px] h-[calc(100vh_-_7rem)] fixed bottom-0 ${
            detailsData?.length != 0 ? "overflow-y-scroll" : null
          } `}
        >
          <CardTitle className="py-3 text-center">Details</CardTitle>
          {detailsData?.length === 0 && (
            <img
              src={post}
              alt="product details"
              className=" block h-[16rem] mb-auto"
            />
          )}
          {detailsData?.length === 0 && (
            <div className="text-center">
              Select an item to see the details here
            </div>
          )}

          {detailsData?.length !== 0 && (
            <>
              <CardHeader>
                <CardTitle>{detailsData?.name}</CardTitle>
                <CardImage src={detailsData?.image} alt={detailsData?.name} />
              </CardHeader>

              <CardContent className="grid gap-4">
                <div>
                  <CardItem
                    title="Description"
                    data={detailsData?.description}
                  />
                  <CardItem title="Category" data={detailsData?.category} />
                  <CardItem title="Brand" data={detailsData?.brand} />
                  <CardItem title="Price" data={detailsData?.price} />
                  <CardItem title="Rating" data={detailsData?.rating} />
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
