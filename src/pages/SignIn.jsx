import "../styles/SignIn.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserDataToServer } from "../store/usersSlice.js";
import Loader from "../components/Loader.jsx";

const SignIn = () => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const { isloading, error, isLoggedIn } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigateTo("/today-bites");
    }
  }, []);

  function handleForm(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();
    const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

    if (
      !user.fullname.trim() ||
      !user.username.trim() ||
      !user.email.trim() ||
      !user.password.trim()
    ) {
      setMessage("Form Details should not be empty");
      return;
    }

    if (user.password.length < 6) {
      setMessage("Password length atleast 6 characters");
      return;
    }
    if (checkEmail.test(user.email)) {
      setMessage("Invalid Email Format");
      return;
    }
    setMessage(null);

    dispatch(addUserDataToServer(user));

    if (error) {
      return setMessage(error);
    }

    //reset user details
    setUser({
      fullname: "",
      username: "",
      email: "",
      password: "",
    });
    return navigateTo("/today-bites");
  }

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="sign-in">
      <div className="form-container">
        <h3>Login Here</h3>
        <form className="form" onSubmit={handleLogin}>
          <div className="form-label fullname-form">
            <label htmlFor="fullname" className="fullname">
              FullName
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              onChange={handleForm}
              value={user.fullname}
            />
          </div>
          <div className="form-label username-form">
            <label htmlFor="username" className="username">
              UserName
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleForm}
              value={user.username}
            />
          </div>
          <div className="form-label email-form">
            <label htmlFor="email" className="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleForm}
              value={user.email}
            />
          </div>
          <div className="form-label password-form">
            <label htmlFor="password" className="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleForm}
              value={user.password}
            />
            <div className="note">
              save password - it can't be updated later
            </div>
          </div>
          <button className="submit-btn" disabled={isloading}>
            Register
          </button>

          <Link to={"/today-bites"} className="backToHome">
            Back to Home
          </Link>
          {message && <div className="message">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
