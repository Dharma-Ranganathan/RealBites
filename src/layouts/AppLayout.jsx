import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default AppLayout;
