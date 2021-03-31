import React, { useEffect, useState } from "react";

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
    <div>
      {books.map((book) => (
        <div>
          <li>{book.bookName}</li>
          <p>{book.authorName}</p>
          <p>${book.price}</p>
          <button
            onClick={() => handleDelete(book._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageBook;
