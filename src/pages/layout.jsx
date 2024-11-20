import { Outlet } from "react-router-dom";
import { NavBar } from "../components/nav-bar";
import { FooterBar } from "../components/footer-bar";



const Layout = () => {
  return (
  	<div className="flex flex-col min-h-screen">
      <NavBar />
        <div className="flex-grow">
          <Outlet />
        </div>
      <FooterBar />
    </div>
    );
};

export default Layout;