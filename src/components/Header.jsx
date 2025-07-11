import "../styles/Header.css";

const Header = ({ getSearchQuery }) => {
  return (
    <div className="header">
      <div className="logo">
        <h3>REAL BITES</h3>
      </div>
      <div className="search-bar">
        <input
          type="text"
          name="search"
          placeholder="search bites here...
          "
          onChange={(e) => getSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Header;
