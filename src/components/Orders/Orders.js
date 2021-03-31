import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../App";

const Orders = () => {
  const [bookings, setBookings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  useEffect(() => {
    fetch("http://localhost:8080/bookings?email=" + loggedInUser.email, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, [loggedInUser.email]);
  return (
    <div>
      <h3>Orders Detail</h3>
    </div>
  );
};

export default Orders;
