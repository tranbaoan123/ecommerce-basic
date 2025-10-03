import { Link } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useGetAdminOrdersQuery,
} from "../../api/orderApi";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../layouts/Loader";
const ListOrders = () => {
  const { data, isLoading, error } = useGetAdminOrdersQuery();
  const [deleteOrder, { isLoading: isDeleteLoading }] =
    useDeleteOrderMutation();
  const orders = data?.data;
  const handleDeleteOrder = (id) => {
    deleteOrder(id);
  };
  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <div>
        <h1 className="my-5">{orders?.length} Order(s)</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Order Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr key={order?._id}>
                <th scope="row">{index + 1}</th>
                <td>{order?.paymentInfo?.status}</td>
                <td>{order?.orderStatus}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary"
                    to={`/admin/order/${order?._id}`}
                  >
                    <i className="fa fa-pencil"></i>
                  </Link>
                  <button
                    className="btn btn-outline-danger ms-2"
                    disabled={isLoading || isDeleteLoading}
                    onClick={() => handleDeleteOrder(order?._id)}
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

export default ListOrders;
