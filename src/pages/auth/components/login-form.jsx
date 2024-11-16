import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserLogged } from '../../../redux/slices/user-slice';
import { message } from 'antd';
import { login } from "../services/index";
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const formikMessages = {
        required: "Este campo es obligatorio",
        // name: "El formato introducido no es el correcto",
        email: "Debes introducir una dirección correcta",
        // phone: "Debes introducir un número correcto",
        password: "Debes introducir una contraseña"
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email(formikMessages.email).required(formikMessages.required),
            password: Yup.string().required(formikMessages.required),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const data = {
                userName: values.email,
                password: values.password
            };
            const response = await login(data);
            console.log(response);
            if (!response.data.success) {
                message.error(response.data.msg);
                setIsLoading(false);
            } else {
                message.success('Usted inicio sesión correctamente.');
                const user = response.data.result;
                dispatch(setUserLogged(user));
                // dispatch(checkoutCart());
                navigate("/");
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                {/* <label>Correo electrónico</label> */}
                <input type={"email"} id={"email"} name={"email"} autoComplete={"email"} placeholder="Email or Phone Number" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.email && formik.errors.email ? (
                    <div className={"text-danger"}>{formik.errors.email}</div>
                ) : null}
            </div>

            <div className="mt-2">
                <div className="flex">
                    {/* <label>Contraseña</label> */}
                    <input type={!showPassword ? "password" : "text"} id={"password"} name={"password"} autoComplete={"current-password"} placeholder="Password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <span className="flex justify-around items-center cursor-pointer" onClick={() => setShowPassword((prevStat) => !prevStat)}>
                        <span className="absolute me-14">
                            {/* Poner los correspondientes a tailwind */}
                            {!showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </span>
                </div>

                {formik.touched.password && formik.errors.password ? (
                    <div className={"clear-both text-danger"}>{formik.errors.password}</div>
                ) : null}
            </div>

            {/* <div>
                <button type={"submit"}>Iniciar Sesión</button>
            </div> */}
            <div className="flex flex-col gap-4 items-center mt-2">
                <button
                    className={`bg-red-700 px-4 py-1 rounded-md font-semibold text-white ${isLoading ? "opacity-40" : ""
                        }`}
                    disabled={isLoading}
                >
                    {isLoading ? "Cargando.." : "Log in"}
                </button>
                <p className="text-red-700">
                    You dont have account?{" "}
                    <Link to={"/register"} className="underline font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </form>
    );
};