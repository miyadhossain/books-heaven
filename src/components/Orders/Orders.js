import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  useEffect(() => {
    fetch(
      "https://mysterious-shelf-54096.herokuapp.com/orders?email=" +
        loggedInUser.email
    )
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [loggedInUser.email]);

  // total orders price
  const total = orders.reduce(
    (total, book) => total + Number(book.orders.price),
    0
  );
  return (
    <div className="container mt-3">
      <h3>Orders Detail</h3>
      <p className="fw-bold">
        {loggedInUser.name}, your total orders {orders.length}
      </p>
      <table className="table table-hover table-borderless mt-3">
        <thead>
          <tr className="bookHeading">
            <th>Order Id</th>
            <th>Book Image</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Price</th>
            <th>Order Date</th>
          </tr>
        </thead>

        {orders.map((order) => (
          <tbody key={order._id}>
            <tr>
              <th>{order._id}</th>
              <th>
                <img
                  style={{ width: "30px" }}
                  src={order.orders.imgURL}
                  alt=""
                />
              </th>
              <td>{order.orders.bookName}</td>
              <td>{order.orders.authorName}</td>
              <td>${order.orders.price}</td>
              <td>{new Date(order.orderTime).toDateString("dd/MM/yyyy")}</td>
            </tr>
          </tbody>
        ))}
        <tbody>
          <tr>
            <td className="fw-bold">Total</td>
            <td></td>
            <td></td>
            <td className="fw-bold"></td>
            <td className="fw-bold">${total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
