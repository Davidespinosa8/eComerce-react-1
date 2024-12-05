import { useState } from "react";
import { Link } from "react-router-dom"; // Importar el componente Link
import { FaPlane, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

export const FooterBar = () => {
    const [email, setEmail] = useState('');

    return (
        <footer className="bg-black text-white">
            <div className="grid grid-cols-5 gap-4">
                <div className="mt-3">
                    <h2>Exclusive</h2>
                    <h3 className="mt-3">Subscribe</h3>
                    <div>Get 10% off your first order</div>

                    <div className="flex">
                        <input
                            type="email"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(evt) => setEmail(evt.currentTarget.value)}
                        />
                        <span className="flex justify-around items-center cursor-pointer">
                            <span className="absolute me-14 text-black">
                                <FaPlane />
                            </span>
                        </span>
                    </div>
                </div>

                <div className="mt-3">
                    <h3>Support</h3>
                    <div className="mt-3">Segurola y Habana 4310, séptimo piso, CABA, Argentina</div>
                    <div>exclusive@gmail.com</div>
                    <div>+0303456</div>
                </div>

                <div className="mt-3">
                    <Link to="/login">Login / Register</Link>
                    <Link to="/cart" className="block mt-2">Cart</Link>
                    <Link to="/favorites" className="block mt-2">Wishlist</Link>
                    <Link to="/" className="block mt-2">Shop</Link>
                </div>

                <div className="mt-3">
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="mt-3">
                    <h3>Download App</h3>
                        <div className="mt-4 flex">
                            <img
                                src="/asset/qr/qr.svg"
                                alt="Download App QR Code"
                                className="w-24 h-24" // Ajustar tamaño según sea necesario
                            />
                        </div>
                    <span className="inline-flex me-4 mt-3 hover:text-blue-600"><FaFacebook size={24} /></span>
                    <span className="inline-flex me-4 mt-3 hover:text-blue-600"><FaTwitter size={24}/></span>
                    <span className="inline-flex me-4 mt-3 hover:text-blue-600"><FaInstagram size={24}/></span>
                </div>
            </div>

            <div className="text-slate-400 text-center py-10">
                © Copyright LINGUIDO&ESPINOSA 2024. All rights reserved
            </div>
        </footer>
    );
};
