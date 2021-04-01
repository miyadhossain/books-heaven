import React, { useEffect, useState } from "react";
import DeleteIcon from "../../../icons/delete.png";
import "./ManageBook.css";

const ManageBook = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("https://mysterious-shelf-54096.herokuapp.com/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  // handle delete
  const handleDelete = (id) => {
    fetch(`https://mysterious-shelf-54096.herokuapp.com/deleteBook/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };
  return (
    <div className="container">
      <h3 className="mt-5">Mangae Books</h3>
      <table className="table table-hover table-borderless mt-3">
        <thead>
          <tr className="bookHeading">
            <th scope="col"></th>
            <th scope="">Description</th>
            <th scope="">Quantity</th>
            <th scope="">Price</th>
            <th scope="">Action</th>
          </tr>
        </thead>
        {books.map((book) => (
          <tbody key={book._id}>
            <tr>
              <th scope="row"></th>
              <td>{book.bookName}</td>
              <td>{book.authorName}</td>
              <td>${book.price}</td>
              <td>
                <img
                  onClick={() => handleDelete(book._id)}
                  className="deleteIcon"
                  src={DeleteIcon}
                  alt=""
                />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ManageBook;
