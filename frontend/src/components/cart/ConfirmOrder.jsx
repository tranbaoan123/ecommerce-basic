import { Link, useNavigate } from "react-router-dom";
import default_product from "../../assets/default_product.png";
import { useSelector } from "react-redux";
import { calculateCost } from "../../helpers/helpers";
import React from "react";
import CheckoutSteps from "./CheckoutSteps";
const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calculateCost(cartItems);
  const navigate = useNavigate();
  const handleProcessPayment = () => {
    navigate("/payment-method");
  };
  return (
    <>
      <CheckoutSteps shipping confirmOrder />
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user?.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo?.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo?.address}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>
          {cartItems?.map((item) => (
            <React.Fragment key={item?.product}>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={default_product}
                      alt="Laptop"
                      height="45"
                      width="65"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/$${item?.product}`}>{item?.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item?.quantity} x ${item?.price} =
                      <b>${item?.quantity * item?.price}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </React.Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">${itemsPrice}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">${shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">${taxPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">${totalPrice}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary w-100"
              onClick={handleProcessPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
