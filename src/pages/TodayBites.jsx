import "../styles/TodayBites.css";
import Header from "../components/Header";
import BitesContainer from "../components/BitesContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getBitesFromServer,
  getSearchBitesFromServer,
} from "../store/bitesSlice";
import { useNavigate } from "react-router-dom";

const TodayBites = () => {
  const { bitesList } = useSelector((state) => state.bites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBitesFromServer());
  }, [dispatch]);

  function getSearchQuery(query) {
    dispatch(getSearchBitesFromServer(query));
  }

  return (
    <div className="container">
      <Header getSearchQuery={getSearchQuery} />
      <div className="today-bites">
        <div className="bites-title">
          <h3>Today Bites</h3>
        </div>
        {bitesList.length ? (
          <BitesContainer bites={bitesList} />
        ) : (
          <div className="wrapper">
            <p
              className="NoBites"
              onClick={() => navigate("/my-bites", { replace: true })}
            >
              No Such Bites Created, You can create one
            </p>
            <img
              src="/placeholder/realbite.png"
              alt="no-bites"
              className="no-bites-img"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayBites;
