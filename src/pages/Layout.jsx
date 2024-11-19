import { Outlet } from "react-router-dom";
import TopHeader from "../components/TopHeader/TopHeader";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";


const Layout = () => {
  return (
  	<div className="flex flex-col min-h-screen">
      <TopHeader />
      <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
      <Footer />
    </div>
    );
};

export default Layout;
