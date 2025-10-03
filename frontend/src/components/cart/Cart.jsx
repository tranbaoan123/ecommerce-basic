import { useDispatch, useSelector } from "react-redux";
import default_product from "../../assets/default_product.png";
import { Link, useNavigate } from "react-router-dom";
import { removeCartItem, setCartItems } from "../../redux/features/cartSlice";
import React from "react";
const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const increaseQuantity = (item, quantity) => {
    const qty = quantity + 1;
    if (qty > item?.stock) return;

    handleItemInCart(item, 1);
  };
  const decreaseQuantity = (item, quantity) => {
    const qty = quantity - 1;
    if (qty <= 0) return;
    handleItemInCart(item, -1);
  };
  const handleItemInCart = (item, newQuantity) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      stock: item?.stock,
      image: item?.image || "",
      quantity: newQuantity,
    };
    dispatch(setCartItems(cartItem));
  };
  const handleRemoveFromCart = (id) => {
    dispatch(removeCartItem(id));
  };
  const navigate = useNavigate();
  const handleCheckOut = () => {
    navigate("/shipping-info");
  };
  return (
    <>
      {cartItems?.length === 0 ? (
        <h2 className="mt-5">Your Cart Is Empty</h2>
      ) : (
        <>
          <h2 className="mt-5">
            Your Cart: <b>{cartItems?.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems?.map((item) => (
                <React.Fragment key={item?.product}>
                  <hr />
                  <div className="cart-item" data-key="product1">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item?.image || default_product}
                          alt="Laptop"
                          height="90"
                          width="115"
                        />
                      </div>
                      <div className="col-5 col-lg-3">
                        <Link to={`/product/${item?.product}`}>
                          {item?.name}
                        </Link>
                      </div>
                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item?.price}</p>
                      </div>
                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() =>
                              decreaseQuantity(item, item?.quantity)
                            }
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item?.quantity}
                            readOnly
                          />
                          <span
                            className="btn btn-primary plus"
                            onClick={() =>
                              increaseQuantity(item, item?.quantity)
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          id="delete_cart_item"
                          className="fa fa-trash btn btn-danger"
                          onClick={() => handleRemoveFromCart(item?.product)}
                        ></i>
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
                  Units:
                  <span className="order-summary-values">
                    {cartItems?.reduce((acc, item) => acc + item?.quantity, 0)}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:
                  <span className="order-summary-values">
                    $
                    {cartItems?.reduce(
                      (acc, item) => acc + item?.quantity * item?.price,
                      0
                    )}
                  </span>
                </p>
                <hr />
                <button
                  id="checkout_btn"
                  className="btn btn-primary w-100"
                  onClick={handleCheckOut}
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
