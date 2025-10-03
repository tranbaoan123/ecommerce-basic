import { Link, useParams } from "react-router-dom";
import { useOrderDetailQuery } from "../../api/orderApi";
import default_product from "../../assets/default_product.png";
import Loader from "../layouts/Loader";
const OrderDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useOrderDetailQuery(id);
  const orderDetails = data?.data;
  if (isLoading) return <Loader />;
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-12 col-lg-9 mt-5 order-details">
        <div className="d-flex justify-content-between align-items-center">
          <h3 className="mt-5 mb-4">Your Order Details</h3>
          <a className="btn btn-success" href="/invoice/order/order-id">
            <i className="fa fa-print"></i> Invoice
          </a>
        </div>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">ID</th>
              <td>{id}</td>
            </tr>
            <tr>
              <th scope="row">Status</th>
              <td className="greenColor">
                <b>{orderDetails?.orderStatus}</b>
              </td>
            </tr>
            <tr>
              <th scope="row">Date</th>
              <td>{new Date(orderDetails?.createdAt).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Shipping Info</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{orderDetails?.user?.name}</td>
            </tr>
            <tr>
              <th scope="row">Phone No</th>
              <td>{orderDetails?.shippingInfo?.phoneNo}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{orderDetails?.shippingInfo?.address}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 mb-4">Payment Info</h3>
        <table className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th scope="row">Status</th>
              <td>
                <b
                  className={
                    orderDetails?.paymentInfo?.status === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {orderDetails?.paymentInfo?.status}
                </b>
              </td>
            </tr>
            <tr>
              <th scope="row">Method</th>
              <td>{orderDetails?.paymentMethod}</td>
            </tr>
            <tr>
              <th scope="row">Stripe ID</th>
              <td>stripe-id</td>
            </tr>
            <tr>
              <th scope="row">Amount Paid</th>
              <td>${orderDetails?.totalAmount}</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-5 my-4">Order Items:</h3>

        <hr />
        <div className="cart-item my-1">
          {orderDetails?.orderItems?.map((order) => (
            <div className="row my-5">
              <div className="col-4 col-lg-2">
                <img
                  src={order?.image || default_product}
                  alt="Product Name"
                  height="45"
                  width="65"
                />
              </div>

              <div className="col-5 col-lg-5">
                <Link to={`/product/${order?.product}`}>{order?.name}</Link>
              </div>

              <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                <p>${order?.price}</p>
              </div>

              <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                <p>{order?.quantity} Piece(s)</p>
              </div>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default OrderDetails;
