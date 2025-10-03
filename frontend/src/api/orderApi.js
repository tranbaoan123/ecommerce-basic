import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["Order", "OrdersAdmin"],
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: "/orders/new",
          method: "POST",
          body,
        };
      },
    }),
    myOrders: builder.query({
      query: () => ({
        url: "/me/orders",
      }),
    }),
    orderDetail: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
      providesTags: ["Order"],
    }),
    getDashboardSales: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/admin/get-sales?startDate=${startDate}&endDate=${endDate}`,
      }),
    }),
    getAdminOrders: builder.query({
      query: () => ({
        url: `/admin/orders`,
      }),
      providesTags: ["OrdersAdmin"],
    }),
    updateOrder: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/orders/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query(id) {
        return {
          url: `/admin/orders/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["OrdersAdmin"],
    }),
  }),
});
export const {
  useCreateNewOrderMutation,
  useMyOrdersQuery,
  useOrderDetailQuery,
  useLazyGetDashboardSalesQuery,
  useGetAdminOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
