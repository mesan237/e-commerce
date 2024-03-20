import { apiSlice } from "./apiSlice";
import { USERS_URL } from "@/constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getUserById: builder.query({
      query: ({ userId }) => ({
        url: `${USERS_URL}/${userId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserProfileMutation,
} = usersApiSlice;
