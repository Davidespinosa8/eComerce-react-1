import { useState } from "react";
import { FaPlane } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";

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
                        <input type="email" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter your email" value={email} onChange={(evt) => { setEmail(evt.currentTarget.value) }} />
                        <span className="flex justify-around items-center cursor-pointer" onClick={() => setShowPassword((prevStat) => !prevStat)}>
                            <span className="absolute me-14 text-black">
                                <FaPlane />
                            </span>
                        </span>
                    </div>
                </div>

                <div className="mt-3">
                    <h3>Support</h3>
                    <div className="mt-3">111 Bijoy sarani Dhaka, Dh 1515, Bangladesh</div>
                    <div>exclusive@gmail.com</div>
                    <div>+88015-88888-9999</div>
                </div>

                <div className="mt-3">
                    <h3>Account</h3>
                    <div className="mt-3">My Account</div>
                    <div>Login / Register</div>
                    <div>Cart</div>
                    <div>Wishlist</div>
                    <div>Shop</div>
                </div>

                <div className="mt-3">
                    <h3>Quick Link</h3>
                    <div className="mt-3">Privacy Policy</div>
                    <div>Terms of Use</div>
                    <div>FAQ</div>
                    <div>Contact</div>
                </div>

                <div className="mt-3">
                    <h3>Download App</h3>
                    <span className="inline-flex me-4 mt-3"><FaFacebook/></span>
                    <span className="inline-flex me-4 mt-3"><FaTwitter/></span>
                    <span className="inline-flex me-4 mt-3"><FaInstagram/></span>
                    <span className="inline-flex mt-3"><FaLinkedin/></span>
                </div>
            </div>

            <div className="text-slate-400 text-center">
                © Copyright Rimel 2022. All right reserved
            </div>
        </footer>
    );
};