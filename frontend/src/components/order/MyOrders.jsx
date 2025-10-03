import { useEffect } from "react";
import { useMyOrdersQuery } from "../../api/orderApi";
import Loader from "../layouts/Loader";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";
const MyOrders = () => {
  const { data, isLoading, error } = useMyOrdersQuery();
  const [searchParams] = useSearchParams();
  const orders = data?.data;
  const orderSuccess = searchParams.get("order_success");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) alert(error.data.message);
    if (orderSuccess) {
      dispatch(clearCart());
      navigate("/me/orders");
    }
  }, [error, orderSuccess]);

  if (isLoading) return <Loader />;
  return (
    <div>
      <h1 className="my-5">{orders?.length} Order(s)</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Amount</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Order Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={order?._id}>
              <th scope="row">{index + 1}</th>
              <td>${order?.totalAmount}</td>
              <td>{order?.paymentInfo?.status}</td>
              <td>{order?.orderStatus}</td>
              <td>
                <Link
                  className="btn btn-primary"
                  to={`/me/orders/${order?._id}`}
                >
                  <i className="fa fa-eye"></i>
                </Link>
                <Link
                  className="btn btn-success ms-2"
                  to={`/invoice/orders/${order?._id}`}
                >
                  <i className="fa fa-print"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
