// import React from 'react'
import "../styles/MyProfile.css";
import { FaUser } from "react-icons/fa";
import { FaUserTag } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const MyProfile = () => {
  const { loggedInUser, isLoggedIn, isloading } = useSelector(
    (state) => state.users
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in", { replace: true });
    }
  }, []);

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="my-profile">
      <div className="wrapper">
        <h3>My Profile</h3>
        <div className="profile-container">
          <div className="fullname">
            <span>
              <FaUser />
            </span>
            <h4>{loggedInUser.fullname}</h4>
          </div>
          <div className="username">
            <span>
              <FaUserTag />
            </span>
            <p>@{loggedInUser.username}</p>
          </div>
          <div className="email">
            <span>
              <MdEmail />
            </span>
            <p>{loggedInUser.email} </p>
          </div>
          <div className="buttons">
            <button
              className="update-profile"
              onClick={() => navigate("/update-profile")}
            >
              <span>
                <FaUserEdit />
              </span>
              Update Profile
            </button>
            <button
              className="create-bites"
              onClick={() => navigate("/my-bites")}
            >
              <span>
                <IoIosCreate />
              </span>
              Create Bites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
