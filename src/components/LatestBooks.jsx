import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";

const LatestBooks = () => {
  const URL_API = "https://api.itbook.store/1.0/new";
  const [newBooks, setNewBooks] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const response = await axios.get(URL_API);
        setNewBooks(response.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    sendGetRequest();
  }, []);
  if (!newBooks) {
    return null;
  }

  if (error) {
    return `Lo siento hay un error: ${error.message}`;
  }
  const Loading = () => {
    return (
      <>
        <span className="spinner-detail">
          <Spinner animation="border" />
        </span>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        {newBooks.books.map((book, index) => {
          const tempPrice = book.price.slice(1);
          const convertedPrice = Number(parseInt(tempPrice));
          return (
            <>
              <div className="col-md-3 mb-4" key={index}>
                <div className="card h-100 text-center p-4">
                  <img
                    src={book.image}
                    className="card-img-top"
                    alt={book.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">{book.title}</h5>
                    <p className="card-text fw-bold">${convertedPrice}</p>
                    <Link
                      to={`/books/${book.isbn13}`}
                      className="btn btn-outline-dark">
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-4 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Books</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
};

export default LatestBooks;
