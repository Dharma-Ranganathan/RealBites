// import React from "react";
import { useEffect, useState } from "react";
import BitesContainer from "../components/BitesContainer";
import "../styles/MyBites.css";
import { useDispatch, useSelector } from "react-redux";
import { addBiteToServer } from "../store/bitesSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const MyBites = () => {
  const { loggedInUser, isLoggedIn } = useSelector((state) => state.users);
  const { isloading, myBites } = useSelector((state) => state.bites);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in");
    }
  }, []);

  const [bites, setBites] = useState({
    title: "",
    content: "",
    hashtags: [],
    userId: loggedInUser.id,
  });

  const [message, setMessage] = useState(null);

  function handleBites(e) {
    setBites({ ...bites, [e.target.name]: e.target.value });
  }
  function handleHashtags(e) {
    const hashtags = e.target.value.split(",");
    setBites({ ...bites, hashtags });
  }

  function handleForm(e) {
    e.preventDefault();
    // console.log(bites);

    if (
      !bites.title.trim() ||
      !bites.content.trim() ||
      !bites.hashtags.length
    ) {
      return setMessage("Bite Details should not be empty");
    }

    // console.log(bites);
    dispatch(addBiteToServer(bites));
    // resetting the bites
    setBites({
      title: "",
      content: "",
      hashtags: [],
      userId: loggedInUser.id,
    });
    setMessage(null);

    return navigate("/today-bites");
  }

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="my-bite-page">
      <div className="my-bites">
        <div className="my-bite-title">
          <h3>My Bites</h3>
        </div>
        {/* form section */}
        <form className="form-container" onSubmit={handleForm}>
          <div className="form-title">
            <h4>Create Bites</h4>
          </div>
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
          <button className="add-bite" disabled={isloading}>
            Add Bite
          </button>
        </form>
      </div>
      <div className="my-bites-container">
        {myBites.length ? (
          <BitesContainer bites={myBites} />
        ) : (
          <div className="no-posts-wrapper">
            <p className="no-posts">No Posts Yet</p>
            <img src="/placeholder/realbite.png" alt="no-posts" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBites;
