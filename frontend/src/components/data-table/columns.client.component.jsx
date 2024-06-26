import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Loader2 } from "lucide-react";
import { EditProduct } from "../admin/EditProduct.component";
import { formatMoney } from "@/utils/formatMoney";
import { ArrowUpDown } from "lucide-react";

import { useDispatch } from "react-redux";

import { useDeleteProductMutation } from "@/slices/product.api.slice";
import { useToast } from "../ui/use-toast";

import { setRefetch } from "@/slices/fetch.slice";

const TableCell = ({ row, table }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const order = row.original;
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const handleDelete = async () => {
    // table.options.onOpenDialogChange(true);
    // console.log(order.id, row.getVisibleCells());
    try {
      const res = await deleteProduct(order.id);
      // console.log(res);
      if (!res.error) {
        setOpenDelete(false);
        dispatch(setRefetch(true));
        toast({
          variant: "success",
          description: "Product has been deleted",
        });
      } else {
        toast({
          variant: "destructive",
          description: res.error.data.message || res.error,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: error?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="flex justify-between">
      <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
        <DialogTrigger asChild>
          <Button
            variant="outline-icon"
            size="icon"
            onClick={() => setOpenUpdate(true)}
          >
            <SquarePen
              className="h-4 w-4 text-blue-500"
              // onClick={handleEdit}
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[32rem] sm:max-h-[80%] overflow-hidden overflow-y-scroll">
          <EditProduct
            productId={order.id}
            setOpenUpdate={setOpenUpdate}
            openUpdate={openUpdate}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            // onClick={handleDelete}
            size="icon"
            className="hover:bg-red-50 border-red-500"
            onClick={() => setOpenDelete(true)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle className="text-[1.7rem]">Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product ?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="submit"
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="size-10 animate-spin z-50" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const columns = [
  {
    accessorKey: "name",
    header: ({ column, table }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            // const page = table.getState().pagination.pageIndex;
            // table.setPageIndex(page + 1);
            column.toggleSorting(column.getIsSorted() === "asc");

            // console.log(table);
          }}
        >
          <div className="text-left">NAME</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // cell: ({ row }) => {
    // const name = row.getValue("nam")
    //   return <div className="text-right font-medium">{row}</div>
    // },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">PRICE</div>,
    cell: ({ row }) => {
      const price = row.getValue("price");
      return (
        <div className="text-center font-medium">{formatMoney(price)} FCFA</div>
      );
    },
  },
  // {
  //   accessorKey: "brand",
  //   header: () => <div className="text-left">Brand</div>,
  //   cell: ({ row }) => {
  //     const brand = row.getValue("brand");
  //     return <div className="text-left ">{brand}</div>;
  //   },
  // },
  {
    accessorKey: "category",
    header: () => <div className="text-left">CATEGORY</div>,
    cell: ({ row }) => {
      const category = row.getValue("category");
      return <div className="text-left">{category}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-center">STOCK</div>,
    cell: ({ row }) => {
      const stock = row.getValue("stock");
      return <div className="text-center ">{stock}</div>;
    },
  },
  {
    header: "ACTIONS",
    id: "actions",
    cell: TableCell,
    // ({ row, table }) => {
    //   const order = row.original;

    //   const handleDelete = async () => {
    //     // table.options.onOpenDialogChange(true);
    //     console.log(order.id, table.options);
    //   };

    //   return (
    //     <div className="flex justify-between">
    //       <Dialog>
    //         <DialogTrigger asChild>
    //           <Button variant="outline-icon" size="icon" className="">
    //             <SquarePen
    //               className="h-4 w-4 text-blue-500"
    //               // onClick={handleEdit}
    //             />
    //           </Button>
    //         </DialogTrigger>
    //         <DialogContent className="sm:max-w-[525px]">
    //           <EditProduct productId={order.id} />
    //         </DialogContent>
    //       </Dialog>

    //       <Dialog>
    //         <DialogTrigger asChild>
    //           <Button
    //             variant="outline"
    //             onClick={handleDelete}
    //             size="icon"
    //             className="hover:bg-red-50 border-red-500"
    //           >
    //             <Trash2 className="h-4 w-4 text-red-500" />
    //           </Button>
    //         </DialogTrigger>
    //         <DialogContent className="sm:max-w-[425px] ">
    //           <DialogHeader>
    //             <DialogTitle className="text-[1.7rem]">
    //               Delete Product
    //             </DialogTitle>
    //             <DialogDescription>
    //               Are you sure you want to delete this product ?
    //             </DialogDescription>
    //           </DialogHeader>

    //           <DialogFooter>
    //             <Button
    //               type="submit"
    //               variant="destructive"
    //               onClick={handleDelete}
    //             >
    //               Delete
    //             </Button>
    //           </DialogFooter>
    //         </DialogContent>
    //       </Dialog>
    //     </div>
    //   );
    // },
  },
];
