import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../api/productApi";
import default_product from "../../assets/default_product.png";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Loader from "../layouts/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../../redux/features/cartSlice";
import NewReview from "../reviews/NewReview";
import ListReview from "../reviews/ListReview";
const ProductDetail = () => {
  const params = useParams();
  const { data, isLoading } = useGetProductDetailsQuery(params?.id);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState("");
  const product = data?.data;
  const dispatch = useDispatch();
  useEffect(() => {
    setActiveImg(product?.images[0] ? product?.images[0].url : default_product);
  }, [product]);
  const increaseQuantity = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product?.stock) return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };
  const handleAddToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      stock: product?.stock,
      image: product?.images[0]?.url || "",
      quantity,
    };
    dispatch(setCartItems(cartItem));
  };
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isLoading) <Loader />;
  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={activeImg}
            alt={product?.name}
            width="340"
            height="390"
          />
        </div>
        <div className="row justify-content-start mt-5">
          {product?.images?.map((img) => (
            <div className="col-2 ms-4 mt-2">
              <a role="button">
                <img
                  className="d-block border rounded p-3 cursor-pointer"
                  height="100"
                  width="100"
                  src={img?.url}
                  alt={img?.url}
                  onClick={() => setActiveImg(img?.url)}
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">Product # {product?._id}</p>

        <hr />

        <div className="d-flex">
          <div className="star-ratings">
            <Rating
              readOnly
              value={product?.ratings}
              key={product?.ratings}
              style={{ maxWidth: 180 }}
            />
          </div>
          <span id="no-of-reviews" className="pt-1 ps-2">
            ({product?.numOfReviews} Reviews)
          </span>
        </div>
        <hr />

        <p id="product_price">${product?.price}</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus" onClick={decreaseQuantity}>
            -
          </span>
          <input
            type="number"
            className="form-control count d-inline"
            value={quantity}
            readOnly
          />
          <span className="btn btn-primary plus" onClick={increaseQuantity}>
            +
          </span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled={product?.stock <= 0}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        <hr />

        <p>
          Status:
          <span
            id="stock_status"
            className={product?.stock > 0 ? "greenColor" : "redColor"}
          >
            {product?.stock > 0 ? "In Stock" : "Out Of Stock"}
          </span>
        </p>

        <hr />

        <h4 className="mt-2">Description:</h4>
        <p>{product?.description}</p>
        <hr />
        <p id="product_seller mb-3">
          Sold by: <strong>{product?.seller}</strong>
        </p>
        {isAuthenticated ? (
          <NewReview productId={product?._id} />
        ) : (
          <div className="alert alert-danger my-5" type="alert">
            Login to post your review.
          </div>
        )}
      </div>
      {product?.reviews.length > 0 && <ListReview reviews={product?.reviews} />}
    </div>
  );
};

export default ProductDetail;
