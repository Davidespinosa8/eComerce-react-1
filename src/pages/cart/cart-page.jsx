import { useDispatch, useSelector } from "react-redux";
import { decreaseQty, increaseQty, removeFromCart } from "../../redux/slices/cart-slice";
import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [cuponCode, setCuponCode] = useState('');
    const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    const backShop = () => {
        nav('/', { replace: true });
    };

    const goCheckOut = () => {
        nav('/cart/checkout', { replace: true });
    };

    const increase = (item) => {
        dispatch(increaseQty(item.id));
    };

    const decrease = (item) => {
        if (item.quantity <= 1) {
            remove(item);
        } else dispatch(decreaseQty(item.id));
    };

    const remove = (item) => {
        if (!window.confirm(`¿Desea eliminar el producto?\n\nCOD(${item.id}) - ${item.title}`)) {
            return false;
        }
        dispatch(removeFromCart(item.id));
        message.error("Artículo eliminado del carrito.");
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-4 ms-2 me-2">
                <div className="font-bold">Product</div>
                <div className="font-bold">Price</div>
                <div className="font-bold">Quantity</div>
                <div className="font-bold text-end">Subtotal</div>
                {cart.map(item =>
                    <>
                        <div>
                            <img className="h-auto w-16" src={item.images ? item.images[0] : ''} alt="" />
                            <span>{item.title}</span>
                        </div>

                        <div>${item.price}</div>

                        <div>
                            <div className="relative mb-4 flex flex-wrap items-stretch">
                                <button className="z-[2] inline-block rounded-s border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950" onClick={() => decrease(item)}>-</button>
                                <input type="number" id="quantity" className="relative m-0 -ms-px block flex-auto rounded-e border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary" value={item.quantity} disabled={true} readOnly={true} />
                                <button className="z-[2] inline-block rounded-s border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950" onClick={() => increase(item)}>+</button>
                            </div>
                        </div>

                        <div className="text-end">${item.price * item.quantity}</div>
                    </>
                )}
            </div>

            <div className="ms-2 mt-5 me-2">
                <button className="rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950 ms-4" onClick={backShop}>
                    Return To Shop
                </button>
                <button className="float-end rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950 ms-4">
                    Update Cart
                </button>
            </div>

            <div className="grid grid-cols-2 gap-2 ms-2 mt-5 me-2 mb-5">
                <div>
                    <div className="relative mb-4 flex flex-wrap items-stretch">
                        <input type="text" className="relative m-0 -ms-px block flex-auto rounded-e border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary" placeholder="Cupon Code" value={cuponCode} onChange={(evt) => setCuponCode(evt.currentTarget.value)} />
                        <button className="z-[2] inline-block rounded bg-red-800 text-white px-6 pb-[6px] ms-4">Apply Coupon</button>
                    </div>
                </div>

                <div>
                    <div className="border p-4">
                        <div><h2 className="font-bold">Cart Total</h2></div>

                        <div className="mt-3">
                            <span>Subtotal</span>
                            <span className="float-end">$
                                {subtotal}
                            </span>
                        </div>

                        <div className="mt-3"><hr></hr></div>

                        <div className="mt-3">
                            <span>Shipping</span>
                            <span className="float-end">$
                                Free
                            </span>
                        </div>

                        <div className="mt-3"><hr></hr></div>

                        <div className="mt-3">
                            <span>Total</span>
                            <span className="float-end">$
                                {subtotal}
                            </span>
                        </div>

                        <div className="mt-5 text-center">
                            {/* <button className="bg-red-800 text-white rounded px-6 pb-[6px] pt-2 font-medium leading-normal transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950 ms-4" onClick={goCheckOut}>
                                Process to checkout
                            </button> */}
                            <button className="bg-red-800 text-white rounded px-6 pb-[6px] ms-4" onClick={goCheckOut}>
                                Process to checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};