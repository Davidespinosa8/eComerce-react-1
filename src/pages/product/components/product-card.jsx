import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/slices/cart-slice";
import { message } from "antd";
import { FaCartPlus, FaTrash } from "react-icons/fa6";
import { cartAdapter } from "../../cart/adapter/cart-adapter";

export const ProductCard = ({ item, favorite, handleFavorite, user }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addProductToCart = (product) => {
        const cartProduct = cartAdapter(product);
        dispatch(addToCart(cartProduct));
        message.success("Artículo agregado al carrito.");
    };

    const removeProductToCart = (productId) => {
        dispatch(removeFromCart(productId));
        message.error("Artículo eliminado del carrito.");
    };

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-black">
            <img className="rounded-t-lg" src={item.images ? item.images[0] : ''} alt="" />
            {user && <span className={`float-right${favorite ? ' text-red-700' : ''} me-2`} role="button" onClick={() => handleFavorite(item, !favorite)}><FaStar /></span>}
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
                {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                </a> */}
                {cart.some(itmCart => itmCart.id === item.id)
                    ? <button onClick={() => {removeProductToCart(item.id)}}><FaTrash/></button>
                    : <button className="bg-black text-white font-bold py-2 px-4 rounded" onClick={() => {addProductToCart(item)}}><FaCartPlus/> Add To Cart</button>
                }
                <p className="mb-3 font-normal text-red-800">${item.price}</p>
            </div>
        </div>
    );
};