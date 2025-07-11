// import React from "react";
import "../styles/Taglines.css";
import { useDispatch, useSelector } from "react-redux";
import BitesContainer from "../components/BitesContainer";
import HashBites from "../components/HashBites";
import { getBitesFromServer, getQueryHashtag } from "../store/bitesSlice";
import Loader from "../components/Loader";
import { useEffect } from "react";

const Taglines = () => {
  let { bitesList, hashBites, isloading } = useSelector((state) => state.bites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBitesFromServer());
  }, [dispatch]);

  const hashtags = [];
  bitesList.map((bite) => {
    if (!hashtags.includes(bite.hashtags[0])) {
      hashtags.push(bite.hashtags[0]);
    }
  });

  function getHashtag(hashtag) {
    // console.log(hashtag);
    dispatch(getQueryHashtag(hashtag));
  }

  function getAllHashBites() {
    getHashtag("all");
  }

  if (isloading) {
    return <Loader />;
  }

  return (
    <div className="taglines">
      <h3>Taglines</h3>
      <div className="tagline-query-hashtag">
        <span className="hash-bite" onClick={getAllHashBites}>
          #All
        </span>
        {hashtags.map((tag, index) => (
          <HashBites hashtag={tag} key={index} getHashtag={getHashtag} />
        ))}
      </div>
      <div className="tagline-bites">
        {hashBites.length ? (
          <BitesContainer bites={hashBites} />
        ) : (
          <BitesContainer bites={bitesList} />
        )}
      </div>
    </div>
  );
};

export default Taglines;
