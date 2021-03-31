import React, { useEffect, useState } from "react";
import Book from "../Book/Book";

const Home = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("https://mysterious-shelf-54096.herokuapp.com/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-md-12 justify-content-center">
          <div className="row justify-content-center">
            {books.length === 0 && (
              <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            )}
            {books.map((book) => (
              <Book key={book._id} book={book}></Book>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
