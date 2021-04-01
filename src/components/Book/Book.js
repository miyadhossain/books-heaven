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
      <div
        className="justify-content-center align-items-center bookCard"
        style={{ backgroundColor: "#F1F1F1", borderRadius: "10px" }}
      >
        <img className="icon mx-auto d-block" src={imgURL} alt="" />
      </div>
      <div className="card-body text-center">
        <h5 className="fw-bold">{bookName}</h5>
        <p>{authorName}</p>
        <div className="d-flex justify-content-between align-items-center ">
          <span>
            <h4 className="priceTag">${price}</h4>
          </span>
          <span>
            <button onClick={hanldeBuy} className="btn button">
              Buy Now
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Book;
