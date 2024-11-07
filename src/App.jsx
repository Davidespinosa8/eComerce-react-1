import { Routes, Route } from "react-router-dom";
import { LoginPage, ProfilePage, RegisterPage } from "./pages/auth/index";

const App = () => {

  return (
    <>
      <nav></nav>

      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      <footer></footer>
    </>
  )
};

export default App;
