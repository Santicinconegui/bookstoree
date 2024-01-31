import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state);
  console.log(cart);
  const dispatch = useDispatch();

  const total = cart.reduce(
    (acc, book) => (acc += Number(parseInt(book.price.slice(1))) * book.qty),
    0
  );

  return (
    <>
      {total && (
        <div className="container d-flex justify-content-end">
          <h5 className=" text-black-50 mt-3">Total price: ${total}</h5>
        </div>
      )}
      {cart.map((book) => {
        const tempPrice = book.price.slice(1);
        const convertedPrice = Number(parseInt(tempPrice));

        return (
          <div className="px-4 my-5 bg-light rounded-3 py-5" key={book.isbn13}>
            <div className="container py-4">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <button
                    className="btn btn-outline-dark"
                    onClick={() =>
                      dispatch({ type: "REMOVE_BOOK", payload: book })
                    }>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </button>
                  <img
                    src={book.image}
                    alt={book.title}
                    height="200px"
                    width="180px"
                  />
                </div>
                <div className="col-md-4">
                  <h3>{book.title}</h3>
                  <p className="lead fw-bold">
                    ${convertedPrice} x {book.qty} = $
                    {convertedPrice * book.qty}
                  </p>
                  <button
                    className="btn btn-outline-dark me-4"
                    onClick={() => {
                      if (book.qty > 1) {
                        dispatch({ type: "DECREASE", payload: book });
                      } else {
                        dispatch({ type: "REMOVE_BOOK", payload: book });
                      }
                    }}>
                    <i className="fa fa-minus"></i>
                  </button>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() =>
                      dispatch({ type: "INCREASE", payload: book })
                    }>
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>{" "}
          </div>
        );
      })}
      {cart.length === 0 && (
        <div>
          <div className="px-4 my-5 bg-light rounded-3 py-5">
            <div className="container py-4">
              <div className="row">
                <h3>Your Cart is Empty</h3>
              </div>
            </div>
          </div>
        </div>
      )}
      {cart.length !== 0 && (
        <div className="container">
          <div className="row">
            <Link
              to="/checkout"
              className="btn btn-outline-dark mb-5 w-25 mx-auto">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
