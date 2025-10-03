import { useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { calculateCost } from "../../helpers/helpers";
import { useCreateNewOrderMutation } from "../../api/orderApi";
import { useNavigate } from "react-router-dom";

const PaymentMethod = () => {
  const [method, setMethod] = useState("");
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    calculateCost(cartItems);
  const [createNewOrder, { isLoading, error, isSuccess }] =
    useCreateNewOrderMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) alert(error.data.message);
    if (isSuccess) {
      navigate("/me/orders?order_success=true");
    }
  }, [error, isSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (method === "COD") {
      const orderData = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      };
      createNewOrder(orderData);
    } else if (method === "Card") {
      alert("Card");
    }
  };
  return (
    <>
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Select Payment Method</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={(e) => setMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="codradio">
                Cash on Delivery
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={(e) => setMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="cardradio">
                Card - VISA, MasterCard
              </label>
            </div>

            <button
              id="shipping_btn"
              type="submit"
              className="btn py-2 w-100"
              disabled={isLoading}
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
