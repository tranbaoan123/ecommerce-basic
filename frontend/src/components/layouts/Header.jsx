import logo from "../../assets/shopit_logo.png";
import default_avatar from "../../assets/default_avatar.jpg";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { useGetMeQuery, useLazyLogoutQuery } from "../../api/userApi";
import { useSelector } from "react-redux";
const Header = () => {
  const { isLoading } = useGetMeQuery();
  const navigate = useNavigate();
  const [logout] = useLazyLogoutQuery();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const handleLogout = () => {
    logout();
    navigate(0);
  };
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <Link to="/">
            <img src={logo} alt="ShopIT Logo" />
          </Link>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <span id="cart" className="ms-3">
            Cart
          </span>
          <span className="ms-1" id="cart_count">
            {cartItems?.length}
          </span>
        </Link>

        {user ? (
          <div className="ms-4 dropdown">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={user?.avatar?.url || default_avatar}
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user.name}</span>
            </button>
            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropDownMenuButton"
            >
              {user?.role === "admin" && (
                <Link className="dropdown-item" to="/admin/dashboard">
                  Dashboard
                </Link>
              )}

              <Link className="dropdown-item" to="/me/orders">
                Orders
              </Link>

              <Link className="dropdown-item" to="/me/profile">
                Profile
              </Link>

              <Link
                className="dropdown-item text-danger"
                onClick={() => handleLogout()}
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link to="/login" className="btn ms-4" id="login_btn">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;
