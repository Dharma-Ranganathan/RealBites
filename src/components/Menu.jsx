import { NavLink } from "react-router-dom";

const Menu = ({ extraclass, icon, title, to }) => {
  return (
    <div className={`menu ${extraclass}`} title={title}>
      <NavLink to={to}>
        <span className="icon">{icon}</span>
      </NavLink>
    </div>
  );
};

export default Menu;
