import { useDispatch, useSelector } from "react-redux";
import { decreaseQty, increaseQty, removeFromCart } from "../../redux/slices/cart-slice";

export const CartPage = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const remove = (item) => {
        if (!window.confirm(`¿Desea eliminar el producto?\n\nCOD(${item.id}) - ${item.title}`)) {
            return false;
        }
        dispatch(removeFromCart(item.id));
        toast.error("Artículo eliminado del carrito.");
    };

    const increase = (item) => {
        dispatch(increaseQty(item.id));
    };

    const decrease = (item) => {
        if (item.qty === 1) {
            remove(item);
        } else dispatch(decreaseQty(item.id));
    };

    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="font-bold">Product</div>
            <div className="font-bold">Price</div>
            <div className="font-bold">Quantity</div>
            <div className="font-bold text-end">Subtotal</div>
            {cart.map(item => <>
                <div>
                    <img className="h-auto w-16" src={item.images ? item.images[0] : ''} alt="" />
                    <span>{item.title}</span>
                </div>
                <div>${item.price}</div>
                <div>
                    <button variant={"dark"} onClick={() => decrease(item)}>-</button>
                    <input type="number" id="quantity" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." value={item.quantity} disabled={true} readOnly={true} />
                    <button variant={"dark"} onClick={() => increase(item)}>+</button>
                </div>
                <div className="text-end">${item.price * item.quantity}</div>
            </>)}
        </div>
    );
};