import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import { CircleCheckBig, CircleX, SquarePen, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
} from "../../../components/ui/dialog";

import {
  useDeleteUserMutation,
  useGetUserByIdQuery,
} from "@/slices/user.api.slice";
import { refetchUser } from "@/slices/fetch.slice";
import EditUser from "./edit/EditUser";
import { useToast } from "@/components/ui/use-toast";

const TableCell = ({ row }) => {
  const dispatch = useDispatch();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const user = row.original;
  const userId = user.id;
  const { toast } = useToast();

  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const {
    data: userDetails,
    isLoading: loadingUser,
    error,
  } = useGetUserByIdQuery(userId);

  const handleDelete = async () => {
    try {
      const res = await deleteUser(userId);
      // console.log(res);
      if (!res.error) {
        setOpenDelete(false);
        dispatch(refetchUser(true));
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
        <DialogContent className="sm:max-w-[525px]">
          {userDetails && (
            <EditUser
              user={userDetails}
              setOpenUpdate={setOpenUpdate}
              openUpdate={openUpdate}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        {isLoading && <DialogOverlay className=" z-50" />}
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
            <DialogTitle className="text-[1.7rem]">Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user ?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="submit" variant="destructive" onClick={handleDelete}>
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
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => {
      const name = row.getValue("name");
      return <div className="text-left">{name}</div>;
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email</div>,
    cell: ({ row }) => {
      const email = row.getValue("email");
      return <div className="text-left">{email}</div>;
    },
  },
  {
    accessorKey: "admin",
    header: () => <div className="text-center">Admin</div>,
    cell: ({ row }) => {
      const admin = row.getValue("admin");
      return (
        <div className="text-center ">
          {admin ? (
            <CircleCheckBig className="text-green-500" />
          ) : (
            <CircleX className="text-red-500" />
          )}
        </div>
      );
    },
  },
  {
    header: "Actions",
    id: "actions",
    cell: TableCell,
  },
];
