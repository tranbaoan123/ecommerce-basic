import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Cart from "../components/cart/Cart";
import ConfirmOrder from "../components/cart/ConfirmOrder";
import PaymentMethod from "../components/cart/PaymentMethod";
import ShippingInfo from "../components/cart/ShippingInfo";
import MyOrders from "../components/order/MyOrders";
import OrderDetails from "../components/order/OrderDetails";
import ProductDetail from "../components/product/ProductDetail";
import ProtectedRoute from "../components/protected/ProtectedRoute";
import Profile from "../components/user/Profile";
import UpdatePassword from "../components/user/UpdatePassword";
import UpdateProfile from "../components/user/UpdateProfile";
import UploadAvatar from "../components/user/UploadAvatar";
import Home from "../pages/Home";
const userRoutes = () => {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/me/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/update-profile"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/upload-avatar"
        element={
          <ProtectedRoute>
            <UploadAvatar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/update-password"
        element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/orders/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/shipping-info"
        element={
          <ProtectedRoute>
            <ShippingInfo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirm-order"
        element={
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment-method"
        element={
          <ProtectedRoute>
            <PaymentMethod />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default userRoutes;
