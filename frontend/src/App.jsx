import "./App.css";

import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Cart from "./components/cart/Cart";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import PaymentMethod from "./components/cart/PaymentMethod";
import ShippingInfo from "./components/cart/ShippingInfo";
import MyOrders from "./components/order/MyOrders";
import OrderDetails from "./components/order/OrderDetails";
import ProductDetail from "./components/product/ProductDetail";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import Profile from "./components/user/Profile";
import UpdatePassword from "./components/user/UpdatePassword";
import UpdateProfile from "./components/user/UpdateProfile";
import UploadAvatar from "./components/user/UploadAvatar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import ListProducts from "./components/admin/ListProducts";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import UploadImages from "./components/admin/UploadImages";
import ListOrders from "./components/admin/ListOrders";
import ProcessOrder from "./components/admin/ProcessOrder";
import ListUsers from "./components/admin/ListUsers";
import UpdateUser from "./components/admin/UpdateUser";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
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
          {/* ADMIN ROUTES */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute admin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute admin={true}>
                <ListProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product/new"
            element={
              <ProtectedRoute admin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path={`/admin/product/:id`}
            element={
              <ProtectedRoute admin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path={`/admin/product/:id/upload-images`}
            element={
              <ProtectedRoute admin={true}>
                <UploadImages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute admin={true}>
                <ListOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              <ProtectedRoute admin={true}>
                <ProcessOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute admin={true}>
                <ListUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoute admin={true}>
                <UpdateUser />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
