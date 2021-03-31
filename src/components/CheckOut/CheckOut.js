import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { userContext } from "../../App";
import "./CheckOut.css";

const CheckOut = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const { id } = useParams();
  const [book, setBook] = useState({});
  useEffect(() => {
    fetch("https://mysterious-shelf-54096.herokuapp.com/book/" + id)
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
    fetch("https://mysterious-shelf-54096.herokuapp.com/addOrder", {
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
    <div className="container">
      <h2>Check Out</h2>
      <div className="checkoutContainer">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{book.bookName}</td>
              <td>Quantity : 1</td>
              <td>${book.price}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="fw-bold">Total</td>
              <td></td>
              <td className="fw-bold">${book.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        onClick={handleCheckOut}
        className="btn btn-primary mt-4 float-end"
      >
        CheckOut
      </button>
    </div>
  );
};

export default CheckOut;
