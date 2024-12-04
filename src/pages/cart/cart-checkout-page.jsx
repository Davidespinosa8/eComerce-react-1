import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa6";
import { checkout } from "./services";
import { checkoutCart } from "../../redux/slices/cart-slice";

export const CartCheckoutPage = () => {
    const cart = useSelector((state) => state.cart);
    const userLogged = useSelector((state) => state.user.userLogged);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shippingCost = 50;
    const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    const formikMessages = {
        required: "Este campo es obligatorio",
        // name: "El formato introducido no es el correcto",
        email: "Debes introducir una dirección correcta",
        // phone: "Debes introducir un número correcto",
    };
    // const [cuponCode, setCuponCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: userLogged ? userLogged.name : '',
            companyName: '',
            streetAddress: '',
            addressOptional: '',
            townCity: '',
            phone: '',
            email: userLogged ? userLogged.email : '',
            infoFastCheckout: false,
            cuponCode: '',
            payMethod: 1
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required(formikMessages.required),
            streetAddress: Yup.string().required(formikMessages.required),
            townCity: Yup.string().required(formikMessages.required),
            phone: Yup.string().required(formikMessages.required),
            email: Yup.string().email(formikMessages.email).required(formikMessages.required)
        }),
        onSubmit: async (values) => {
            // return alert(JSON.stringify(values, null, 2));
            setIsLoading(true);
            // const response = await checkout(values);
            // console.log(response);
            // if (!response.data.success) {
            //     message.error(response.data.msg);
            //     setIsLoading(false);
            // } else {
            //     message.success('Usted inicio sesión correctamente.');
            //     const user = response.data.result;
            //     dispatch(setUserLogged(user));
            //     // dispatch(checkoutCart());
            //     navigate("/");
            // }
            dispatch(checkoutCart());
            navigate("/cart/checkout/finaly");
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <section className="flex max-md:flex-col ms-2 me-2 mb-2">
                {/* Billing Details */}
                <div className="md:h-full max-md:flex-grow md:w-1/2 grid p-3">
                    <h1 className="font-semibold text-5xl">Billing Details</h1>

                    <div className="mt-4">
                        <label>First Name*</label>
                        <input type={"text"} id={"firstName"} name={"firstName"} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div className={"text-red-800"}>{formik.errors.firstName}</div>
                        ) : null}
                    </div>

                    <div className="mt-4">
                        <label>Company Name</label>
                        <input type={"text"} id={"companyName"} name={"companyName"} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.companyName} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {/* {formik.touched.firstName && formik.errors.firstName ? (
                            <div className={"text-red-800"}>{formik.errors.firstName}</div>
                        ) : null} */}
                    </div>

                    <div className="mt-4">
                        <label>Street Address*</label>
                        <input type={"text"} id={"streetAddress"} name={"streetAddress"} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.streetAddress} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.streetAddress && formik.errors.streetAddress ? (
                            <div className={"text-red-800"}>{formik.errors.streetAddress}</div>
                        ) : null}
                    </div>

                    <div className="mt-4">
                        <label>Apartment, floor, etc. (Optional)</label>
                        <input type={"text"} id={"addressOptional"} name={"addressOptional"} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.addressOptional} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {/* {formik.touched.firstName && formik.errors.firstName ? (
                            <div className={"text-red-800"}>{formik.errors.firstName}</div>
                        ) : null} */}
                    </div>

                    <div className="mt-4">
                        <label>Town/City*</label>
                        <input type={"text"} id={"townCity"} name={"townCity"} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.townCity} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.townCity && formik.errors.townCity ? (
                            <div className={"text-red-800"}>{formik.errors.townCity}</div>
                        ) : null}
                    </div>

                    <div className="mt-4">
                        <label>Phone Number*</label>
                        <input type={"text"} id={"phone"} name={"phone"} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className={"text-red-800"}>{formik.errors.phone}</div>
                        ) : null}
                    </div>

                    <div className="mt-4">
                        <label>Email Address*</label>
                        <input type={"email"} id={"email"} name={"email"} autoComplete={"email"} placeholder="Email or Phone Number" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        {formik.touched.email && formik.errors.email ? (
                            <div className={"text-red-800"}>{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem] mt-4">
                        <input type={"checkbox"} id={"infoFastCheckout"} name={"infoFastCheckout"} onChange={formik.handleChange} value={formik.values.infoFastCheckout} className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] rounded-[0.25rem] accent-red-800" />
                        <label className="inline-block ps-[0.15rem] hover:cursor-pointer" htmlFor="infoFastCheckout">Save this information for faster check-out next time</label>
                    </div>
                </div>

                {/* Cart element */}
                <div className="md:h-full max-md:flex-grow md:w-1/2 grid mt-14 p-3">
                    <div className="grid grid-cols-2 gap-2">
                        {cart.map(item =>
                            <>
                                <div>
                                    <img className="h-auto w-16 inline-flex" src={item.images ? item.images[0] : ''} alt="" />
                                    <span>{item.title}</span>
                                </div>

                                <div className="text-end">${item.price * item.quantity}</div>
                            </>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <span>Subtotal</span>
                        </div>
                        <div className="text-end">${subtotal}</div>
                        <div>
                            <span>Shipping</span>
                        </div>
                        <div className="text-end">{formik.values.cuponCode === 'GRUPO2' ? 'Free' : `$${shippingCost}`}</div>
                        <div>
                            <span>Total</span>
                        </div>
                        <div className="text-end">${subtotal + (formik.values.cuponCode === 'GRUPO2' ? 0 : shippingCost)}</div>
                    </div>

                    <div className="mt-5">
                        <input type="radio" id="payMethod1" name="payMethod" defaultChecked={formik.values.payMethod=== "1"} value="1" onChange={formik.handleChange} />
                        <label className="inline-block ps-[0.15rem] hover:cursor-pointer" htmlFor="payMethod1">Bank</label>
                        <span className="float-end"><FaCcVisa size="36" /></span>
                        <span className="float-end me-3"><FaCcMastercard size="36" /></span>
                    </div>
                    <div>
                        <input type="radio" id="payMethod2" name="payMethod" defaultChecked={formik.values.payMethod=== "2"} value="2" onChange={formik.handleChange} />
                        <label className="inline-block ps-[0.15rem] hover:cursor-pointer" htmlFor="payMethod2">Cash on delivery</label>
                    </div>

                    <div>
                        <div className="relative mt-5 mb-4 flex flex-wrap items-stretch">
                            <input type="text" id="cuponCode" name="cuponCode" className="relative m-0 -ms-px block flex-auto rounded-e border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary" placeholder="Cupon Code" value={formik.cuponCode} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                            {/* <button type="button" className="z-[2] inline-block rounded bg-red-800 text-white px-6 pb-[6px] ms-4">Apply Coupon</button> */}
                        </div>
                    </div>

                    <div className="mt-5">
                        <button type="submit" className="z-[2] inline-block rounded bg-red-800 text-white px-6 pb-[6px] pt-2">
                            Place Order
                        </button>
                    </div>
                </div>
            </section>
        </form>
    );
};