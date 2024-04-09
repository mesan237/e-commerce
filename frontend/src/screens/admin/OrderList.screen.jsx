import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle, CircleX } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { useGetOrdersQuery } from "@/slices/order.api.slice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <p className="mb-4 font-bold h3">Orders </p>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Status</AlertTitle>
          <AlertDescription>
            {error?.data?.message || error.error}
          </AlertDescription>
        </Alert>
      )}
      {isLoading && <Spinner> Loading...</Spinner>}
      {orders && (
        <Table>
          <TableCaption>
            {orders?.length === 0
              ? `You have no orders.`
              : `A list of all orders made on the platform.`}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="w-[100px]">User</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total (FCFA)</TableHead>
              <TableHead className="text-center">Paid</TableHead>
              <TableHead className="text-center">Delivered</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error?.data?.message || error.message}
                </AlertDescription>
              </Alert>
            )}
            {isLoading && <Spinner> Loading...</Spinner>}

            {orders?.length > 0 &&
              orders.map((order, index) => (
                <TableRow key={order._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    {order.createdAt.toString().substring(0, 10)}
                  </TableCell>
                  <TableCell>{order.totalPrice}</TableCell>
                  <TableCell className="text-center ">
                    {order.isPaid ? (
                      order.paidAt?.toString().substring(0, 10)
                    ) : (
                      <CircleX className="text-red-400 block mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.isDelivered ? (
                      order.deliveredAt?.toString().substring(0, 10)
                    ) : (
                      <CircleX className="text-red-400 block mx-auto" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link to={`/order/${order._id}`}>
                      <Button variant="link">Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
