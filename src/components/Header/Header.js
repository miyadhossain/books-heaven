import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link to="/home" className="navbar-brand">
            Book's Heaven
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav px-5">
              <li className="nav-item books-hover">
                <Link
                  to="/home"
                  className="nav-link books-nav-link"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item books-hover">
                <Link to="/orders" className="nav-link books-nav-link">
                  Orders
                </Link>
              </li>
              <li className="nav-item books-hover">
                <Link to="/admin" className="nav-link books-nav-link">
                  Admin
                </Link>
              </li>
              <li className="nav-item books-hover">
                <Link to="/login" className="nav-link books-nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
