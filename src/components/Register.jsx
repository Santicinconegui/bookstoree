import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import formbackground from "../assets/form.jpg";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  //funcion para actualizar estado y ver contenido//
  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setError("The password must contain more than 6 characters");
      }
    }
  };

  //funcion para actualizar estado y ver contenido//
  return (
    <div className="container-formulario">
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <span className="login--tittle">Sign up here!</span>
          <div className="wrap">
            <div className="f1">
              <label>Name</label>
              <input
                type="name"
                name="name"
                placeholder="Your name"
                onChange={handleChange}
              />
              <span className="focus-input"></span>
            </div>
            <div className="f2">
              <label>LastName</label>
              <input
                type="name"
                name="lastname"
                placeholder="Your lastname"
                onChange={handleChange}
              />
              <span className="focus-input"></span>
            </div>
          </div>
          <div className="wrap2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="youremail@gmail.com"
              onChange={handleChange}
            />
            <span className="focus-input2"></span>
          </div>
          <div className="wrap2">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              id="password"
              placeholder="******"
            />
            <span className="focus-input2"></span>
          </div>
          {error && <span className="error-form">{error}</span>}
          <button className="btn--form_register" type="submit">
            Register
          </button>
        </form>
      </div>
      <div className="image-form">
        <img src={formbackground} alt="formbackground" className="img-form" />
      </div>
    </div>
  );
};

export default Register;
