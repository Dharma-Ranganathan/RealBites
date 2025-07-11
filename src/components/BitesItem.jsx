import "../styles/BitesItem.css";
import { Link, useNavigate } from "react-router-dom";

const BitesItem = ({ bite }) => {
  const navigateTo = useNavigate();

  return (
    <div className="bites-item">
      <Link to={`/today-bites/${bite.id}`}>
        <div className="top-flex">
          <div className="names">
            <div className="fullname">
              <h5>{bite.user.fullname}</h5>
            </div>
            <div className="username">
              <p>@{bite.user.username}</p>
            </div>
          </div>
          <div className="follow-btn">
            <p>Follow</p>
          </div>
        </div>
      </Link>
      <div className="mid-flex">
        <h3>"{bite.title}"</h3>
      </div>
      <div className="bottom-flex">
        <p>{bite.content}</p>
      </div>
      <div className="hashtags">
        {bite.hashtags.map((tag, index) => (
          <span onClick={() => navigateTo("/taglines")} key={index}>
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BitesItem;
