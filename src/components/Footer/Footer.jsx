import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-black text-white py-8 mt-24 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Exclusive Section */}
          <div>
            <h3 className="font-bold mb-2">Exclusive</h3>
            <p>Subscribe</p>
            <p>Offer</p>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-bold mb-2">Support</h3>
            <p>Address</p>
            <p>exclusive@gmail.com</p>
            <p>+0303 456</p>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="font-bold mb-2">Account</h3>
            <ul className="space-y-2">
              <li>
                <RouterLink to="/register" onClick={scrollToTop} className="text-white hover:underline">
                  Registe
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/login" onClick={scrollToTop} className="text-white hover:underline">
                  Sign Up
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/cart" onClick={scrollToTop} className="text-white hover:underline">
                  Cart
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/wishlist" onClick={scrollToTop} className="text-white hover:underline">
                  Wishlist
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/category" onClick={scrollToTop} className="text-white hover:underline">
                  Shop
                </RouterLink>
              </li>
            </ul>
          </div>

          {/* Social and App Icons */}
          <div className="space-y-4">
            <h3 className="font-bold mb-2">Get Our App</h3>
            <div className="flex items-center gap-4">
              <RouterLink to="/appstore" onClick={scrollToTop} className="text-white">
                <img src="./AppStore.png" alt="App Store" className="w-8 h-8" />
              </RouterLink>
              <RouterLink to="/googleplay" onClick={scrollToTop} className="text-white">
                <img src="./GooglePlay.png" alt="Google Play" className="w-8 h-8" />
              </RouterLink>
              <RouterLink to="/qrcode" onClick={scrollToTop} className="text-white">
                <img src="./QrCode.png" alt="QR Code" className="w-8 h-8" />
              </RouterLink>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <RouterLink to="/" onClick={scrollToTop} className="text-white hover:text-gray-400">
                {/* Facebook icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Your SVG path */}
                </svg>
              </RouterLink>
              <RouterLink to="/" onClick={scrollToTop} className="text-white hover:text-gray-400">
                {/* Instagram icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Your SVG path */}
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
