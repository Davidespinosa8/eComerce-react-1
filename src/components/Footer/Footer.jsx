import { useState } from "react";

export const FooterBar = () => {
    const [email, setEmail] = useState('');

    return (
        <footer>
            <div>
                Exclusive
                <span>Subscribe</span>
                <span>Get 10% off your first order</span>
                <input type="email" value={email} onChange={(evt) => { setEmail(evt.currentTarget.value) }} />
                Agregar flecha de boton de subscripcion
            </div>
            <div>
                Support
                <span>111 Bijoy sarani Dhaka, Dh 1515, Bangladesh</span>
                <span>exclusive@gmail.com</span>
                <span>+88015-88888-9999</span>
            </div>
            <div>
                Account
                <span>My Account</span>
                <span>Login / Register</span>
                <span>Cart</span>
                <span>Wishlist</span>
                <span>Shop</span>
            </div>
            <div>
                Quick Link
                <span>Privacy Policy</span>
                <span>Terms of Use</span>
                <span>FAQ</span>
                <span>Contact</span>
            </div>
            <div>
                Download App
                Agregar iconos de redes sociales
            </div>

            <div>
                © Copyright Rimel 2022. All right reserved
            </div>
        </footer>
    );
};