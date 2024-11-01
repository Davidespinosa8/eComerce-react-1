import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setUserLogged } from "../../redux/slices/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { profileUpdate } from "./services/index";
import { message } from "antd";

export const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const formikMessages = {
        required: "Este campo es obligatorio",
        // name: "El formato introducido no es el correcto",
        email: "Debes introducir un correo electronico correcto",
        // phone: "Debes introducir un número correcto",
        password: "Debes introducir una contraseña"
    };

    const formik = useFormik({
        initialValues: {
            surName: user.surName,
            name: user.name,
            documentType: user.documentType ? user.documentType : '',
            documentNumber: user.documentNumber ? user.documentNumber : '',
            email: user.email,
            // password: '',
        },
        validationSchema: Yup.object({
            surName: Yup.string().required(formikMessages.required),
            name: Yup.string().required(formikMessages.required),
            // email: Yup.string().email(formikMessages.email).required(formikMessages.required),
            documentType: Yup.string().required(formikMessages.required),
            documentNumber: Yup.string().required(formikMessages.required),
            // password: Yup.string().required(formikMessages.required),
        }),
        onSubmit: async (values) => {
            console.log('ProfilePage - Formik onSubmit', values);
            let data = {
                surName: values.surName,
                name: values.name,
                documentType: values.documentType ? values.documentType : null,
                documentNumber: values.documentNumber ? values.documentNumber : null
                // email: values.email
            };

            const response = await profileUpdate(user.id, data);
            console.log('ProfilePage - Formik onSubmit', response);
            if (response.data.success) {
                dispatch(setUserLogged({ ...user, surName: data.surName, name: data.name, documentType: data.documentType, documentNumber: data.documentNumber }));
                message.success("Datos actualizados.");
            } else {
                message.error(response.data.msg);
            }
        },
    });

    return (
        <div>
            {/*Titulo*/}
            <h1>Mi perfil</h1>

            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div>
                        <label>Apellido</label>
                        <input type={"text"} id={"surName"} name={"surName"} value={formik.values.surName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.surName && formik.errors.surName ? (
                            <div className={"text-danger"}>{formik.errors.surName}</div>
                        ) : null}
                    </div>

                    <div>
                        <label>Nombre</label>
                        <input type={"text"} id={"name"} name={"name"} value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.touched.name && formik.errors.name ? (
                            <div className={"text-danger"}>{formik.errors.name}</div>
                        ) : null}
                    </div>

                    <div>
                        <label>Documento</label>
                        <div>
                            <select id={"documentType"} name={"documentType"} value={formik.values.documentType}
                                onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                {
                                    lstDocumentos.map((doc, idxDoc) => (
                                        <option key={idxDoc} value={doc.value}>{doc.label}</option>
                                    ))
                                }
                            </select>
                            <input type={"text"} id={"documentNumber"} name={"documentNumber"} value={formik.values.documentNumber}
                                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </div>
                        {formik.touched.documentType && formik.errors.documentType
                            ? <div className={"text-danger"}>{formik.errors.documentType}</div>
                            : (formik.touched.documentNumber && formik.errors.documentNumber
                                ? <div className={"text-danger"}>{formik.errors.documentNumber}</div>
                                : null)}
                    </div>

                    <div>
                        <label>Email</label>
                        <input type={"email"} id={"email"} name={"email"}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={true}
                            readOnly={true} />
                        {/*{formik.touched.email && formik.errors.email ? (
                            <div className={"text-danger"}>{formik.errors.email}</div>
                        ) : null}*/}
                    </div>
                </div>

                {/* <div>
                    <div>
                        <label>Permisos</label>
                        <ol>
                            {
                                user.permissions.map((permission, idx) =>
                                    <li key={idx}>{permission.name}</li>
                                )
                            }
                        </ol>
                    </div>
                </div> */}

                {/*Botón guardar*/}
                <div>
                    <div>
                        <button type={"submit"}>Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    );
};