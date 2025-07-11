// import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/UpdateProfile.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInServer } from "../store/usersSlice";
import Loader from "../components/Loader";

const UpdateProfile = () => {
  const { isLoggedIn, loggedInUser } = useSelector((state) => state.users);
  const { isloading, error } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    fullname: loggedInUser.fullname,
    username: loggedInUser.username,
    email: loggedInUser.email,
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in", { replace: true });
    }
  }, []);

  function handleForm(e) {
    // console.log(user);
    setUser({ ...user, [e.target.name]: e.target.value });
    // console.log(user);
  }

  function handleUpdate(e) {
    e.preventDefault();
    const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

    if (!user.fullname.trim() || !user.username.trim() || !user.email.trim()) {
      setMessage("Form Details should not be empty");
      return;
    }

    if (checkEmail.test(user.email)) {
      setMessage("Invalid Email Format");
      return;
    }
    setMessage(null);

    dispatch(updateUserInServer({ user, id: loggedInUser.id }));
    // console.log({ user, id: loggedInUser.id });

    if (error) {
      return setMessage(error);
    }

    //reset user details
    setUser({
      fullname: "",
      username: "",
      email: "",
    });
    return navigate("/my-profile");
  }

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="update-profile">
      <div className="form-container">
        <h3>Update Profile</h3>
        <form className="form" onSubmit={handleUpdate}>
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
          <button className="submit-btn" disabled={isloading}>
            Update
          </button>
          <Link to={"/my-profile"} className="backToProfile">
            Back to Profile
          </Link>
          {message && <div className="message">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
