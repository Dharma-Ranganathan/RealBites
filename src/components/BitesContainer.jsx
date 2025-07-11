import BitesItem from "./BitesItem";
import "../styles/BitesContainer.css";
import { Link } from "react-router-dom";

const BitesContainer = ({ bites }) => {
  return (
    <div className="bites-container">
      {bites && bites.map((bite) => <BitesItem bite={bite} key={bite.id} />)}
    </div>
  );
};

export default BitesContainer;
