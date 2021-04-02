import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";

const AdminHeader = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const { success } = loggedInUser;
  const [logout, setLogOut] = useContext(userContext);
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
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
              <li
                onClick={() => setLogOut({})}
                className="nav-item books-hover"
              >
                <Link to="/login" className="nav-link books-nav-link">
                  {success ? <>Log out</> : <>Log in</>}
                </Link>
              </li>
              <li className="nav-item books-hover">
                {success && (
                  <span className="nav-link books-nav-link">
                    {loggedInUser.name}
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminHeader;
