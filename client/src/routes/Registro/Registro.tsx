import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { Navigate } from "react-router-dom";

interface RegisterValues {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Registro() {
    const handleClickRegister = (values:RegisterValues) => {
        Axios.post("http://localhost:3001/register", {
          email: values.email,
          password: values.password
        }).then((response) => {
            <Navigate to={'/login'}/>
            console.log(response)
        });
    };

    const validationRegister = yup.object().shape({
        email: yup
        .string()
        .email("Favor digitar um email válido.")
        .required("Campo obrigatório"),
        password: yup
        .string()
        .min(8, "A senha deve conter ao menos 8 caracteres")
        .required("Campo obrigatório"),
        confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "As senhas não são iguais")
        .required("Campo obrigatório")
      })

    return(
        <div>
            <div className="cadastro">
                <h1>Cadastro</h1>
                <Formik 
                    initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: ''
                    }}
                    onSubmit={handleClickRegister}
                    validationSchema={validationRegister}
                >
                    <Form className="login-form">
                    <div className="login-form-group">
                        <Field name="email" className="form-field" placeholder="Email"/>

                        <ErrorMessage
                        component="span"
                        name="email"
                        className="form-error"/>
                    </div>

                    <div className="login-form-group">
                        <Field name="password" className="form-field" placeholder="Senha"/>

                        <ErrorMessage
                        component="span"
                        name="password"
                        className="form-error"/>
                    </div>

                    <div className="login-form-group">
                        <Field name="confirmPassword" className="form-field" placeholder="Confirme a Senha"/>

                        <ErrorMessage
                        component="span"
                        name="confirmPassword"
                        className="form-error"/>
                    </div>

                    <button className="button" type="submit">Registrar</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}