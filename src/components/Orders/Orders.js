import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  useEffect(() => {
    fetch("http://localhost:8080/orders?email=" + loggedInUser.email)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [loggedInUser.email]);
  return (
    <div>
      <h3>Orders Detail</h3>
      {orders.length}
      {orders.map((order) => (
        <div>
          <li>{order.orders.bookName}</li>
          <li>{order.orders.price}</li>
          <li>
            Order Time: {new Date(order.orderTime).toDateString("dd/MM/yyyy")}
          </li>
        </div>
      ))}
    </div>
  );
};

export default Orders;
