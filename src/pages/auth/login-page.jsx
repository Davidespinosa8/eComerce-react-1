import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserLogged } from '../../redux/slices/user-slice';
// import { FaEye, FaEyeSlash } from 'react-icons/fa'; //Poner los correspondientes a tailwind
import { message } from 'antd';
import { login } from "./services/index";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            const data = {
                userName: values.email,
                password: values.password
            };
            const response = await login(data);
            console.log(response);
            if (!response.data.success) {
                message.error(response.data.msg);
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
        <div>
            <h1>Iniciar sesión</h1>
            <div>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <label>Correo electrónico</label>
                            <input type={"email"} id={"email"} name={"email"} autoComplete={"email"} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                            {formik.touched.email && formik.errors.email ? (
                                <div className={"text-danger"}>{formik.errors.email}</div>
                            ) : null}
                        </div>

                        <div>
                            <div className="d-flex">
                                <label>Contraseña</label>
                                <input type={!showPassword ? "password" : "text"} id={"password"} name={"password"} autoComplete={"current-password"} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                                <span className="d-flex justify-content-around align-items-center cursor-pointer" onClick={() => setShowPassword((prevStat) => !prevStat)}>
                                    <span className="position-absolute me-5">
                                        {/* Poner los correspondientes a tailwind */}
                                        {/* {!showPassword ? <FaEye /> : <FaEyeSlash />} */}
                                    </span>
                                </span>
                            </div>

                            {formik.touched.password && formik.errors.password ? (
                                <div className={"text-danger"}>{formik.errors.password}</div>
                            ) : null}
                        </div>

                        <div>
                            <button type={"submit"}>Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};