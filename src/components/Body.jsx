import "../styles/Body.css";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigateTo = useNavigate();

  return (
    <div className="body">
      <div className="body-title">
        <h3>Unlock your potential with Real Bites</h3>
      </div>
      <div className="body-para">
        <p>
          Simply transform your ideas or memories as bites in Real Bites,
          Captivate the amazing writer and readers of online through Real Bites
        </p>
      </div>
      <div className="buttons">
        <div
          className="button button-sign-in"
          onClick={() => navigateTo("/sign-in")}
        >
          Sign In
        </div>
        <div
          className="button button-get-started"
          onClick={() => navigateTo("/today-bites")}
        >
          Get Started
        </div>
      </div>
    </div>
  );
};

export default Body;
