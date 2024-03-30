import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { columns } from "./Columns.user";
import { DataTable } from "./Data.user";
import { AlertCircle } from "lucide-react";

import { useGetAllUsersQuery } from "@/slices/user.api.slice";
import { refetchUser } from "@/slices/fetch.slice";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

export default function UserListScreen() {
  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery();

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { userRender } = useSelector((state) => state.fetch);

  useEffect(() => {
    let items = [];
    if (users) {
      users.forEach((user) =>
        items.push({
          id: user._id,
          name: user.name,
          email: user.email,
          admin: user.isAdmin,
        })
      );
      setData(items);
    }
    if (userRender === true) {
      refetch();
      dispatch(refetchUser(false));
    }
  }, [users, userRender, dispatch, refetch]);

  return (
    <>
      <p className="mb-4 font-bold h3">List of Users</p>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.data.message || error.error}
          </AlertDescription>
        </Alert>
      )}
      {isLoading && <Spinner> Loading...</Spinner>}

      {users && data && (
        <>
          <div className=" mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </>
      )}
    </>
  );
}
