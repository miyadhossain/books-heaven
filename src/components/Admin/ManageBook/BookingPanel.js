import React from "react";

const BookingPanel = ({ book }) => {
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
        <tbody>
          <tr>
            <td>{book.bookName}</td>
            <td>{book.authorName}</td>
            <td>${book.price}</td>
            <td>Delete</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BookingPanel;
