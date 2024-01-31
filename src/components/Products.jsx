import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SomeBooks from "./SomeBooks";

const Books = () => {
  const [error, setError] = useState(null);
  const [findCategory, setFindText] = useState("");
  const [findBooks, setFindBooks] = useState("");
  const urlForSearch = `https://api.itbook.store/1.0/search/${findCategory}`;

  const getSearchBooks = async (e) => {
    e.preventDefault();
    setFindText(e.target.value);
    try {
      const response = await axios.get(urlForSearch);
      setFindBooks(response.data);
      setFindText(e.target.value);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <h5 className=" display-7 text-center py-5">
        Enter the category of the book you want!
      </h5>
      <div className="row mb-0 justify-content-center w-100">
        <form className="d-flex col-12 col-md-6" role="search">
          <input
            className="form-control me-2"
            type="text"
            placeholder="Javascript, Java, React, etc"
            aria-label="Search"
            id="findCategory"
            name="findCategory"
            onChange={getSearchBooks}
            value={findCategory}
          />
          <button className="btn btn-dark" type="submit">
            Buscar
          </button>
        </form>
      </div>

      {findCategory === "" ? (
        <SomeBooks />
      ) : findBooks.books ? (
        <div className="container my-4 py-5">
          <div className="row">
            <div className="col-12 mb-5">
              <div className="row justify-content-center">
                <hr />
                {findBooks.books.map((book, index) => {
                  return (
                    <div className="col-md-3 mb-4" key={index}>
                      <div className="card h-100 text-center p-4">
                        <img
                          src={book.image}
                          className="card-img-top"
                          alt={book.title}
                        />
                        <div className="card-body">
                          <h5 className="card-title mb-0">{book.title}</h5>
                          <p className="card-text fw-bold">{book.price}</p>
                          <Link
                            to={`/books/${book.isbn13}`}
                            className="btn btn-outline-dark">
                            More Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Books;
