import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["AdminProducts", "Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        params: {
          keyword: params.keyword,
          category: params.category,
          page: params.page,
          "ratings[gte]": params.ratings,
          "price[gte]": params.min,
          "price[lte]": params.max,
        },
      }),
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: ["Product"],
    }),
    getProductsAdmin: builder.query({
      query: () => ({
        url: `/admin/products`,
      }),
      providesTags: ["AdminProducts"],
    }),
    createNewProduct: builder.mutation({
      query(body) {
        return {
          url: "/admin/products",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AdminProducts"],
    }),
    updateProductAdmin: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["AdminProducts"],
    }),
    uploadProductImagesAdmin: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/upload-images`,
          method: "PUT",
          body,
        };
      },
    }),
    deleteProductImageAdmin: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/products/${id}/delete-image`,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProductAdmin: builder.mutation({
      query(id) {
        return {
          url: `/admin/products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminProducts"],
    }),
    submitReview: builder.mutation({
      query(body) {
        return {
          url: "/products/review",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),
    canReview: builder.query({
      query: (id) => ({
        url: `/products/reviews/can-review?productId=${id}`,
      }),
      providesTags: ["Product"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetProductsAdminQuery,
  useCreateNewProductMutation,
  useUpdateProductAdminMutation,
  useUploadProductImagesAdminMutation,
  useDeleteProductImageAdminMutation,
  useDeleteProductAdminMutation,
  useSubmitReviewMutation,
  useCanReviewQuery,
} = productApi;
