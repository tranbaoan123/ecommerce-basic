import { Link } from "react-router-dom";
import {
  useDeleteProductAdminMutation,
  useGetProductsAdminQuery,
} from "../../api/productApi";
import Loader from "../layouts/Loader";
import AdminLayout from "../layouts/AdminLayout";
const ListProducts = () => {
  const { data, isLoading, error } = useGetProductsAdminQuery();
  const [
    deleteProductAdmin,
    { isLoading: isDeleteLoading, isError: isDeleteError },
  ] = useDeleteProductAdminMutation();
  const products = data?.data;
  const handleDeleteProduct = (id) => {
    deleteProductAdmin(id);
  };
  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <div>
        <h1 className="my-5">{products?.length} Product(s)</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={product?._id}>
                <th scope="row">{index + 1}</th>
                <td>{product?.name}</td>
                <td>{product?.price}</td>
                <td>{product?.stock}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary"
                    to={`/admin/product/${product?._id}`}
                  >
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <Link
                    className="btn btn-outline-success ms-2"
                    to={`/admin/product/${product?._id}/upload-images`}
                  >
                    <i className="fa fa-image"></i>
                  </Link>
                  <button
                    className="btn btn-outline-danger ms-2"
                    onClick={() => handleDeleteProduct(product?._id)}
                    disabled={isDeleteLoading}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ListProducts;
