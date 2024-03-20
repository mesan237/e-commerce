import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "@/constants";

export const productsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: ({ productId }) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsSlice;
