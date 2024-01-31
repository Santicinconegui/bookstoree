import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";

const SomeBooks = () => {
  //   const URL_API = "https://api.itbook.store/1.0/search/javascript";
  const [someBooks, setSomeBooks] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Estado para el número de página actual
  const fetchBooks = async (page) => {
    const URL_API = `https://api.itbook.store/1.0/search/javascript/${page}`; // Incluir el número de página en la URL
    try {
      setLoading(true);
      const response = await axios.get(URL_API);
      setSomeBooks(response.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchBooks(currentPage); // Cargar los libros de la página actual al montar el componente
  }, [currentPage]);
  if (!someBooks) {
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
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const ShowSomeProducts = () => {
    return (
      <>
        {someBooks.books.map((book, index) => {
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
            <h1 className="display-6 fw-bolder text-center">Some Books</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowSomeProducts />}
        </div>
        <button
          className="btn btn-outline-dark px-3 py-1  mx-2"
          onClick={goToPreviousPage}>
          {" <"}
        </button>
        <button className="btn btn-outline-dark px-3 py-1">
          {currentPage}
        </button>
        <button
          className="btn btn-outline-dark px-3 py-1 mx-2"
          onClick={goToNextPage}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default SomeBooks;
