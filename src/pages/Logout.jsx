// import React from "react";
import { useEffect } from "react";
import "../styles/Logout.css";
import Loader from "../components/Loader.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserInServer } from "../store/usersSlice";

const Logout = () => {
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in");
    }
  }, []);
  const { isLoggedIn, loggedInUser, isloading } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(deleteUserInServer(loggedInUser.id));
    return navigate("/");
  }

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="logout-profile">
      <div className="logout-container">
        <img src="/placeholder/realbite.png" alt="realbite" />
        <p>
          We will miss you{" "}
          <span onClick={() => navigate("/my-profile", { replace: true })}>
            {loggedInUser.username}
          </span>{" "}
          try to get back soon.
        </p>
        <button disabled={isloading} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
