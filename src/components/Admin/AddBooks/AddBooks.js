import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
    const url = `http://localhost:8080/addBook`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booksData),
    }).then((res) => console.log("server side response, ", res));
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
        console.log(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <h3>Add Books</h3>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="">Book Name</label>
              <input
                name="bookName"
                className="form-control"
                type="text"
                placeholder="Enter Name"
                ref={register}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Author Name</label>
              <input
                name="authorName"
                className="form-control"
                type="text"
                placeholder="Enter Name"
                ref={register}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="">Price</label>
              <input
                name="price"
                className="form-control"
                type="text"
                placeholder="Enter Price"
                ref={register}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="">Add Book Cover Photo</label>
              <input
                className="form-control"
                type="file"
                name=""
                id=""
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <input
            className="btn btn-outline-primary mt-3"
            type="submit"
            value="Save"
          />
        </form>
      </div>
    </div>
  );
};

export default AddBooks;
