import './index.css';
import { Routes, Route } from "react-router-dom";
import { LoginPage, ProfilePage, RegisterPage } from "./pages/auth/index";
import HomePage from "./pages/home/home-page";
import { FooterBar, NavBar } from "./components";
// import TopHeader from './components/TopHeader/TopHeader';


const App = () => {

  return (
    <>
      {/* <TopHeader /> */}
      <NavBar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      <FooterBar />
    </>
  )
};

export default App;
