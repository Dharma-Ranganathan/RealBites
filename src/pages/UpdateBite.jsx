// import React from 'react'
import { useState, useEffect } from "react";
import "../styles/UpdateBite.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBiteInServer } from "../store/bitesSlice";
import Loader from "../components/Loader";

const UpdateBite = () => {
  const { isLoggedIn } = useSelector((state) => state.users);
  const { isloading, singleBite } = useSelector((state) => state.bites);

  const dispatch = useDispatch();

  const [bites, setBites] = useState({
    title: singleBite.title,
    content: singleBite.content,
    hashtags: singleBite.hashtags,
  });

  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in", { replace: true });
    }
  }, []);

  function handleBites(e) {
    setBites({ ...bites, [e.target.name]: e.target.value });
  }

  function handleHashtags(e) {
    const hashtags = e.target.value.split(",");
    setBites({ ...bites, hashtags });
  }

  function handleForm(e) {
    e.preventDefault();
    if (!bites.title.trim() || !bites.content.trim() || bites.hashtags == "") {
      return setMessage("Updating a bite form should not empty");
    }

    // console.log({ ...bites, id: singleBite.id });
    dispatch(updateBiteInServer({ ...bites, id: singleBite.id }));
    setMessage(null);
    return navigate(`/today-bites/${singleBite.id}`);
  }

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="update-bite-page">
      <div className="update-bite-title">
        <h3>Update Your Bite Here</h3>
      </div>
      <div className="update-bite-container">
        {/* form section */}
        <form className="form-container" onSubmit={handleForm}>
          <div className="form-label">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={handleBites}
              value={bites.title}
            />
          </div>
          <div className="form-label">
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              name="content"
              id="content"
              value={bites.content}
              onChange={handleBites}
              autoComplete="on"
              autoCorrect="on"
            />
          </div>
          <div className="form-label">
            <label htmlFor="hashtags">Hashtags</label>
            <textarea
              type="text"
              name="hashtags"
              id="hashtags"
              value={bites.hashtags}
              onChange={handleHashtags}
              autoComplete="on"
              autoCorrect="on"
            />
            <p className="message">kindly enter "," seperated hashtags</p>
            {message && <p className="message1">{message}</p>}
          </div>
          <button className="update-bite" disabled={isloading}>
            Update Bite
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBite;
