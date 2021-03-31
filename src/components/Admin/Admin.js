import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import AddBooks from "./AddBooks/AddBooks";
import "./Admin.css";
import ManageBook from "./ManageBook/ManageBook";

const routes = [
  {
    path: "/manageBook",
    exact: true,
    main: () => <ManageBook></ManageBook>,
  },
  {
    path: "/",
    main: () => <AddBooks></AddBooks>,
  },
  {
    path: "/editBook",
    main: () => <h2>Edit Books</h2>,
  },
];

const Admin = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div className="sideBar">
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/manageBook">Manage Books</Link>
            </li>
            <li>
              <Link to="/">Add Book</Link>
            </li>
            <li>
              <Link to="/editBook">Edit Book</Link>
            </li>
          </ul>

          <Switch>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact} />
            ))}
          </Switch>
        </div>

        <div style={{ flex: 1, padding: "10px" }}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Admin;
