import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "react-bootstrap";

const DetailProduct = () => {
  const { isbn13 } = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProduct = () => {
      fetch(`https://api.itbook.store/1.0/books/${isbn13}`)
        .then((res) => res.json())
        .then((res) => {
          setBook(res);
          setLoading(false);
        });
    };
    getProduct();
  }, [isbn13]);

  return (
    <div>
      <div className="my-5">
        <div>{loading ? <Loading /> : <ShowProduct book={book} />}</div>
      </div>
    </div>
  );
};
const Loading = () => {
  return (
    <>
      <span className="spinner-detail">
        <Spinner animation="border" />
      </span>
    </>
  );
};

const ShowProduct = ({ book }) => {
  const cart = useSelector((state) => state);
  // console.log(cart);
  const dispatch = useDispatch();
  const tempPrice = book.price.slice(1);
  const convertedPrice = Number(parseInt(tempPrice));
  const [showToast, setShowToast] = useState(false);
  {
    book.qty = 1;
  }
  const handleAddToCart = () => {
    dispatch({ type: "ADD_BOOK", payload: book });
    setShowToast(true); // Actualiza el estado para mostrar la notificación
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  return (
    <div className="container">
      {book && (
        <div className="container-book" key={book.isbn13}>
          <div className="col-md-7">
            <img src={book.image} alt={book.title} className="img-detail" />
          </div>
          <div className="col-md-6">
            <h1 className="display-5">{book.title}</h1>
            <h5 className="text-uppercase text-black-50">{book.subtitle}</h5>
            <h3 className="dislpay-5">{book.authors}</h3>
            <p className="lead fw-bolder">
              {book.rating}
              <i className="fa fa-star"></i>
            </p>
            <div className="container-detail">
              <h3 className="display-6 fw-bold my-4"> $ {convertedPrice}</h3>
              <h5 className="  my-4">ISBN : "{book.isbn13}"</h5>
              {convertedPrice === 0.0 && (
                <p style={{ color: "red" }}>¡Product without stock !</p>
              )}
              <p className="lead">{book.desc}</p>
              {book.price > "$0.00" && (
                <>
                  <button
                    className="btn btn-outline-dark px-4 py-2"
                    onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </>
              )}
              <Link to="/cart" className="btn btn-dark ms-2 px-3 py-2">
                Go to Cart!
              </Link>
            </div>
          </div>
        </div>
      )}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "absolute",
          right: 20,
          top: 90,
          backgroundColor: "black", // Color de fondo negro
          color: "white", // Texto en color blanco para mayor contraste
        }}>
        <Toast.Body>¡Producto agregado al carrito con éxito!</Toast.Body>
      </Toast>
    </div>
  );
};

export default DetailProduct;
