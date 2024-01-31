import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom";
import formbackground from "../assets/form.jpg";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //auth context
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  //function para actualizar estado y ver contenido//
  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/user-not-found") {
        setError("User not found");
      } else if (error.code === "auth/wrong-password") {
        setError("Wrong Password");
      }
    }
  };
  //login with google
  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  //reset password
  const handleResetPassword = async () => {
    if (!user.email) return setError("please enter your email");
    try {
      await resetPassword(user.email);
      setError("we sent you an email with a link to reset your password");
    } catch (error) {
      setError(error.message);
    }
  };

  //funcion para actualizar estado y ver contenido//
  return (
    <div className="container-formulario">
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <span className="login--tittle">LOGIN</span>
          <span className="login--subtittle">to continue please log in!</span>
          <div className="wrap2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
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
          <button className="btn--form" type="submit">
            Login
          </button>
        </form>

        <span className="login--info">
          Forgot password?
          <Link onClick={handleResetPassword}> Click Here!</Link>
        </span>
        <span className="login--info">
          You do not have an account? sign up <Link to="/signup">here</Link>
        </span>
        <span className="login--info">Or Sing in with google!</span>
        <button className="btn--google" onClick={handleGoogleSignIn}>
          Login with Google
        </button>
      </div>
      <div className="image-form">
        <img src={formbackground} alt="formbackground" className="img-form" />
      </div>
    </div>
  );
};

export default Login;
