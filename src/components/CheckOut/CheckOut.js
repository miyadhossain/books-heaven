import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { userContext } from "../../App";

const CheckOut = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const { id } = useParams();
  const [book, setBook] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/book/" + id)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  // handle checkout
  const handleCheckOut = () => {
    const orderDetails = {
      ...loggedInUser,
      orders: book,
      orderTime: new Date(),
    };
    fetch("http://localhost:8080/addOrder", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Order placed successfully");
      });
  };
  return (
    <div>
      <h2>Check Out</h2>
      <h5>{book.bookName}</h5>
      <p>Quantity : 1</p>
      <p>{book.price}</p>
      <button onClick={handleCheckOut} className="btn btn-primary">
        CheckOut
      </button>
    </div>
  );
};

export default CheckOut;
