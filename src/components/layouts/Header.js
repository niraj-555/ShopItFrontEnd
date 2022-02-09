import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { logout } from "../../actions/userActions";

import Search from "./Search";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("Logged out Successfully");
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/">
              <img src="./images/shopit_logo.png" />
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="me-1">
              Cart
            </span>
            <span className="ms-1 me-1" id="cart_count">
              {cartItems.length}
            </span>
          </Link>
          {user ? (
            <div class="dropdown d-inline">
              <button
                class="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle me-4"
                  />
                  <span style={{ color: "white" }}>{user && user.name}</span>
                </figure>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {user && user.role === "admin" && (
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                )}
                <Link className="dropdown-item " to="/orders/me">
                  Orders
                </Link>
                <Link className="dropdown-item" to="/me">
                  Profile
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  to="/"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </ul>
            </div>
          ) : (
            !loading && (
              <Link
                to="/login"
                className="btn ml-4"
                style={{ marginLeft: 8 }}
                id="login_btn"
              >
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
