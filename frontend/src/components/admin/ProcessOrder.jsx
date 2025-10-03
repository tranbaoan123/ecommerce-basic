import { Link, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import {
  useOrderDetailQuery,
  useUpdateOrderMutation,
} from "../../api/orderApi";
import default_product from "../../assets/default_product.png";
import React, { useEffect, useState } from "react";
const ProcessOrder = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useOrderDetailQuery(id);
  const orderDetails = data?.data;
  const [updateOrder, { isUpdateLoading, error: updateError }] =
    useUpdateOrderMutation();
  const [orderStatus, setOrderStatus] = useState("");
  console.log(orderDetails);
  useEffect(() => {
    setOrderStatus(orderDetails?.orderStatus);
  }, [data]);
  const handleUpdateOrder = (id) => {
    updateOrder({ id, body: { status: orderStatus } });
  };
  return (
    <AdminLayout>
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-8 order-details">
          <h3 className="mt-5 mb-4">Order Details</h3>

          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{orderDetails?._id}</td>
              </tr>
              <tr>
                <th scope="row">Status</th>
                <td className="greenColor">
                  <b>{orderDetails?.orderStatus}</b>
                </td>
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
                <td className="greenColor">
                  <b>{orderDetails?.paymentInfo?.status}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Method</th>
                <td>{orderDetails?.orderStatus}</td>
              </tr>
              <tr>
                <th scope="row">Stripe ID</th>
                <td>Nill</td>
              </tr>
              <tr>
                <th scope="row">Amount</th>
                <td>${orderDetails?.totalAmount}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 my-4">Order Items:</h3>

          {orderDetails?.orderItems?.map((order) => (
            <React.Fragment key={order?.product}>
              <hr />
              <div className="cart-item my-1">
                <div className="row my-5">
                  <div className="col-4 col-lg-2">
                    <img
                      src={order?.image?.url || default_product}
                      alt="product image"
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
              </div>
              <hr />
              <h5>Tax: ${orderDetails?.taxAmount}</h5>
            </React.Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 mt-5">
          <h4 className="my-4">Status</h4>

          <div className="mb-3">
            <select
              className="form-select"
              name="status"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            className="btn btn-primary w-100"
            onClick={() => handleUpdateOrder(orderDetails?._id)}
            disabled={isUpdateLoading || isLoading}
          >
            {isLoading || isUpdateLoading ? "Updating ..." : "Update Status"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProcessOrder;
