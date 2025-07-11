import "../styles/SideBar.css";
import Menu from "./Menu";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { MdToday } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { FaSignOutAlt } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { isLoggedIn } = useSelector((state) => state.users);
  return (
    <>
      <div className="sidebar">
        <div className="menus">
          <div className="main-menu">
            <Menu
              extraclass="menubar"
              icon={<IoMdHome />}
              title="home"
              to="/"
            />
          </div>
          <div className="menus-list">
            <Menu
              extraclass="Testimonials"
              icon={<BsFillGrid1X2Fill />}
              title="testimonials"
              to="/testimonials"
            />
            <Menu
              extraclass="Today-Bites"
              icon={<MdToday />}
              title="today-bites"
              to="/today-bites"
            />

            <Menu
              extraclass="Taglines"
              icon={<FaHashtag />}
              title="taglines"
              to="/taglines"
            />
            {isLoggedIn && (
              <Menu
                extraclass="MyProfile"
                icon={<FaUser />}
                title="my profile"
                to="/my-profile"
              />
            )}
            {isLoggedIn && (
              <Menu
                extraclass="MyBites"
                icon={<SiBookstack />}
                title="my bites"
                to="/my-bites"
              />
            )}
            {isLoggedIn && (
              <Menu
                extraclass="Logout"
                icon={<FaSignOutAlt />}
                title="logout"
                to="/logout"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
