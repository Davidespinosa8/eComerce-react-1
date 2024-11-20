import { Routes, Route } from "react-router-dom";
import { About, LoginPage, ProfilePage, RegisterPage } from "./pages/auth/index";
import HomePage from "./pages/home/home-page";
import { CartPage, CartCheckoutPage } from "./pages/cart";
import Layout from "./pages/layout";
import Contact from "./pages/auth/contact-page";

const App = () => {

  return (
    <>

      <main>
        <Routes>
          <Route path="/" element={<Layout />}> 
            <Route index element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart/checkout" element={<CartCheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/my/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </main>

    </>
  )
};

export default App;
