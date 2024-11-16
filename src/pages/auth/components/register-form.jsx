import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserLogged } from '../../../redux/slices/user-slice';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { message } from 'antd';
import { register } from "../services/index";

export const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const formikMessages = {
        required: "Este campo es obligatorio",
        // name: "El formato introducido no es el correcto",
        email: "Debes introducir una dirección correcta",
        // phone: "Debes introducir un número correcto",
        password: "Debes introducir una contraseña",
        passwordConfirmation: 'Debe coincidir con el valor del campo "contraseña".'
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(formikMessages.required),
            email: Yup.string().email(formikMessages.email).required(formikMessages.required),
            password: Yup.string().required(formikMessages.required),
            passwordConfirmation: Yup.string().required(formikMessages.required).oneOf([Yup.ref('password'), null], formikMessages.passwordConfirmation)
        }),
        onSubmit: async (values) => {
            const data = {
                name: values.name,
                email: values.email,
                password: values.password
            };
            const response = await register(data);
            console.log(response);
            if (!response.data.success) {
                message.error(response.data.msg);
            } else {
                message.success('Usted ha sido registrado correctamente.');
                const user = response.data.result;
                dispatch(setUserLogged(user));
                navigate("/");
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                {/* <label>Name</label> */}
                <input type={"text"} id={"name"} name={"name"} autoComplete={"name"} placeholder="Name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                {formik.touched.name && formik.errors.name ? (
                    <div className={"text-danger"}>{formik.errors.name}</div>
                ) : null}
            </div>

            <div className="mt-2">
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
                    {isLoading ? "Cargando.." : "Create Account"}
                </button>
                <p className="text-red-700">
                    You have account?{" "}
                    <Link to={"/login"} className="underline font-semibold">
                        Log in
                    </Link>
                </p>
            </div>
        </form>
    );
};