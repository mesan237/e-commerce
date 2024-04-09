import { useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Rating from "@/components/Rating";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "@/slices/product.api.slice";
import { AlertCircle } from "lucide-react";
import { addToCart } from "@/slices/cart.slice";
import { useToast } from "@/components/ui/use-toast";
import { BreadcrumbDemo } from "@/components/Breadcrumb";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { setPath } from "@/slices/urlPath.slice";
import { useEffect } from "react";

const ProductScreen = () => {
  const { productId } = useParams();
  const [qty, setQty] = useState(1);
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    error,
    isLoading,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { toast } = useToast();
  const [createReview, { isLoading: loadingReview }] =
    useCreateReviewMutation();

  const handleCart = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  useEffect(() => {
    dispatch(setPath(location.pathname));
  }, [dispatch, location]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast({
        variant: "success",
        description: "Review created successfully",
      });
    } catch (err) {
      toast({
        variant: "error",
        description: err?.data?.message || err.error,
      });
    }
  };

  return (
    <>
      <BreadcrumbDemo />
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

      {product && (
        <>
          <div className="flex gap-8 justify-center items-start relative mt-8">
            <div className="w-1/2 flex-1">
              <img className="min-w-72 max-w-md mx-auto" src={product.image} />
              <div className="mt-10 px-10">
                <p className="h2 py-6">Overview</p>
                <div className="flex-1">{product.description}</div>
              </div>
            </div>

            <div className=" flex-1">
              <Card className="h-fit w-[calc(50vw-9rem)] block  fixed top-30">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="mx-auto">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row items-center justify-between">
                  <p className="">Price: </p>
                  <p className="">{product.price} FCFA</p>
                </CardContent>
                <Separator className="my-2" />
                <CardContent className="flex flex-row items-center justify-between">
                  <p className="">Reviews: </p>
                  <div className="flex gap-1">
                    <Rating rating={product.rating} />({product.numReviews})
                  </div>
                </CardContent>
                <Separator className="my-2" />
                <CardContent className="flex justify-between">
                  <p>Status :</p>
                  {product.countInStock > 0 ? (
                    <Badge variant="succes">In stock</Badge>
                  ) : (
                    <Badge variant="wrong">out of stock</Badge>
                  )}
                </CardContent>

                <Separator className="my-2" />

                <CardContent className="flex justify-between items-baseline">
                  <p>Quantity :</p>
                  <Select value={qty} onValueChange={setQty}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(product.countInStock).keys()].map((index) => (
                        <SelectItem value={index + 1} key={index}>
                          {index + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>

                <Separator className="my-2" />
                <CardFooter className="flex gap-4">
                  <Button
                    disabled={!product.countInStock}
                    onClick={handleCart}
                    className="rounded-full gap-2"
                  >
                    <ShoppingCart className="text-white size-4" />
                    Add To Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {}}
                    className="gap-2 text-primary rounded-full border-primary"
                  >
                    <Heart className="size-4 " />
                    Add To Wishlist
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div className="mt-10 px-10 w-1/2 space-y-5">
            <h2 className="h2 mb-6">Reviews</h2>
            {product?.reviews?.length === 0 && (
              <Alert>
                <AlertDescription>No Reviews</AlertDescription>
              </Alert>
            )}

            {product?.reviews?.map((review) => (
              <>
                <div key={review._id} className="space-y-2">
                  <div>
                    <strong>{review.name}</strong>
                    <p className="text-accent-foreground text-sm">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <Rating rating={review.rating} />
                  <p>{review.comment}</p>
                </div>
                <Separator />
              </>
            ))}

            <p>Write a review</p>

            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <p>Rating</p>
                  <Select value={rating} onValueChange={setRating}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Poor</SelectItem>
                      <SelectItem value="2">2 - Fair</SelectItem>
                      <SelectItem value="3">3 - Good</SelectItem>
                      <SelectItem value="4">4 - Very Good</SelectItem>
                      <SelectItem value="5">5 - Excellent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label htmlFor="comment" className="text-right">
                    Comment
                  </Label>

                  <Textarea
                    placeholder="Type your comment."
                    id="comment"
                    className=""
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <Button disabled={loadingReview} type="submit">
                  Submit
                </Button>
              </form>
            ) : (
              <Alert>
                <AlertDescription>
                  Please
                  <Button variant="link" className="px-1">
                    <Link to="/login">sign in</Link>
                  </Button>
                  to write a review
                </AlertDescription>
              </Alert>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
