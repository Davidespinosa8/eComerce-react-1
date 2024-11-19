import './index.css';
import Layout from "./pages/Layout";
import { Routes, Route } from "react-router-dom";
import { LoginPage, ProfilePage, RegisterPage } from "./pages/auth/index";
import HomePage from "./pages/home/HomePage";

const App = () => {

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/my/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </main>
    </>
  )
};

export default App;
