import React from "react";
import { useHistory } from "react-router";
import "./Book.css";

const Book = ({ book }) => {
  const { _id, imgURL, bookName, authorName, price } = book;
  const history = useHistory();
  const hanldeBuy = () => {
    history.push(`/checkOut/${_id}`);
  };
  return (
    <div className="card" style={{ width: "18rem", margin: "30px" }}>
      <img className="icon mx-auto d-block" src={imgURL} alt="" />
      <div className="card-body text-center">
        <h6>{bookName}</h6>
        <p>{authorName}</p>
        <h4>${price}</h4>
        <button onClick={hanldeBuy} className="btn btn-primary">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Book;
