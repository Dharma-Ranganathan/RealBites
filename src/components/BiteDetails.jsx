import { useDispatch, useSelector } from "react-redux";
import "../styles/BiteDetail.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteBiteInServer } from "../store/bitesSlice";
import Loader from "../components/Loader.jsx";

const BiteDetails = () => {
  const { singleBite, isloading } = useSelector((state) => state.bites);
  const { isLoggedIn, loggedInUser } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in", { replace: true });
    }
  }, []);

  function deleteBite() {
    dispatch(deleteBiteInServer(singleBite.id));
    return navigate("/today-bites", { replace: true });
  }

  if (isloading) {
    return <Loader />;
  }

  return (
    singleBite && (
      <div className="container" key={singleBite.id}>
        <h2 className="title">Real Bite : "{singleBite.title}"</h2>
        <div className="single-bite">
          <div className="bite-detail">
            <div className="bite-title">
              <span>Title</span>
              <h4>"{singleBite.title}"</h4>
            </div>
            <div className="bite-content">
              <span>Content</span>
              <p>{singleBite.content}</p>
            </div>
            <div className="bite-hashtags">
              {singleBite &&
                singleBite.hashtags.map((tag, index) => (
                  <span key={index} onClick={() => navigate("/taglines")}>
                    #{tag}
                  </span>
                ))}
            </div>
            {singleBite.userId == loggedInUser.id && (
              <div className="bite-buttons">
                <button
                  className="edit-bite"
                  onClick={() => navigate("/update-bite")}
                >
                  <span>
                    <FaRegEdit />
                  </span>
                </button>
                <button className="delete-bite" onClick={deleteBite}>
                  <span>
                    <FaRegTrashAlt />
                  </span>
                </button>
              </div>
            )}
          </div>
          <div className="user-detail">
            <div className="fullname">
              <span>Fullname</span>
              <h3>"{singleBite.user.fullname}"</h3>
            </div>
            <div className="username">
              <span>username</span>
              <p>@{singleBite.user.username}</p>
            </div>
            <div className="follow-btn">
              <p>follow</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default BiteDetails;
