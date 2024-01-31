import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Products from "./components/Products";
import Cart from "./components/Cart";
import DetailProduct from "./components/DetailProduct";
import Checkout from "./components/checkoutForm/Checkout";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route path="/books/:isbn13" element={<DetailProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
