import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AddBook.css";

const AddBooks = () => {
  const [imgURL, setImgURL] = useState(null);
  const { register, handleSubmit, watch, errors } = useForm();

  // submit form
  const onSubmit = (data) => {
    const booksData = {
      bookName: data.bookName,
      authorName: data.authorName,
      price: data.price,
      imgURL: imgURL,
    };
    const url = `https://mysterious-shelf-54096.herokuapp.com/addBook`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booksData),
    }).then((res) => {
      alert("Book added successfully.");
    });
  };

  // upload images
  const handleImageUpload = (e) => {
    const imgData = new FormData();
    imgData.set("key", "681354ee434466a79bb386e524a1ce29");
    imgData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imgData)
      .then(function (response) {
        setImgURL(response.data.data.display_url);
        alert("Image upload successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <h3 className="mt-5">Add Books</h3>
      <div className="mt-3 addBookContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="">Book Name</label>
              <input
                name="bookName"
                className="form-control mt-3"
                type="text"
                placeholder="Enter Name"
                ref={register}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Author Name</label>
              <input
                name="authorName"
                className="form-control mt-3"
                type="text"
                placeholder="Enter Name"
                ref={register}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="mt-3" htmlFor="">
                Add Price
              </label>
              <input
                name="price"
                className="form-control mt-3"
                type="text"
                placeholder="Enter Price"
                ref={register}
              />
            </div>
            <div className="col-md-6">
              <label className="mt-3" htmlFor="">
                Add Book Cover Photo
              </label>
              <input
                className="form-control mt-3"
                type="file"
                name=""
                id=""
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <input
            className="btn saveButton mt-5 float-end"
            type="submit"
            value="Save"
          />
        </form>
      </div>
    </div>
  );
};

export default AddBooks;
