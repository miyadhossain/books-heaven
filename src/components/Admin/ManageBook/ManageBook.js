import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        {books.map((book) => (
          <tbody>
            <tr>
              <td>{book.bookName}</td>
              <td>{book.authorName}</td>
              <td>${book.price}</td>
              <td>
                <button>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(book._id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ManageBook;
