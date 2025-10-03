import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  setAuthenticated,
  setLoading,
  setUser,
} from "../redux/features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["User", "UserAdmin"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/me",
      transformResponse: (result) => result.data,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setAuthenticated(true));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
          console.log(error);
        }
      },
      providesTags: ["User"],
    }),
    logout: builder.query({
      query: () => "/logout",
    }),
    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/profile/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    uploadAvatar: builder.mutation({
      query(body) {
        return {
          url: "/avatar-upload",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query(body) {
        return {
          url: "/password/update",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    getUsersAdmin: builder.query({
      query: () => ({
        url: `/admin/users`,
      }),
      providesTags: ["UserAdmin"],
    }),
    getUserDetail: builder.query({
      query: (id) => ({
        url: `/admin/users/${id}`,
      }),
    }),
    updateUserAdmin: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/users/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteUserAdmin: builder.mutation({
      query(id) {
        return {
          url: `/admin/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["UserAdmin"],
    }),
  }),
});
export const {
  useGetMeQuery,
  useLazyLogoutQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
  useGetUsersAdminQuery,
  useGetUserDetailQuery,
  useUpdateUserAdminMutation,
  useDeleteUserAdminMutation,
} = userApi;
