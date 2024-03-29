import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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

export function DataTable({ columns, data }) {
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();

  const dispatch = useDispatch();

  const table = useReactTable({
    data,
    columns,
    state: {
      openDialog,
    },
    onOpenDialogChange: setOpenDialog,
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
      <div className="rounded-md border flex-1 px-4">
        <p className="mb-4 font-bold h3 text-center">List of Products</p>
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

      <Card className="w-[380px] max-h-screen sticky top-0  overflow-scroll">
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardTitle>{detailsData?.name}</CardTitle>
          <CardImage src={detailsData?.image} alt={detailsData?.name} />
        </CardHeader>

        <CardContent className="grid gap-4">
          <div>
            <CardItem title="Description" data={detailsData?.description} />
            <CardItem title="Category" data={detailsData?.category} />
            <CardItem title="Brand" data={detailsData?.brand} />
            <CardItem title="Price" data={detailsData?.price} />
            <CardItem title="Rating" data={detailsData?.rating} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
