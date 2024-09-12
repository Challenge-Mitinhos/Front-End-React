import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as yup from "yup";
import Axios from "axios";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { validarCpf } from "../util/validarCPF";


interface RegisterValues {
    nome: string,
    sobrenome: string,
    email: string,
    cpf: string,
    telefone: string,
    senha: string,
    confirmSenha: string;
}

const CpfField = () => {
    const { setFieldValue } = useFormikContext<RegisterValues>();

    return (
        <Field name="cpf">
            {({field}: any) => (
                <InputMask
                    {...field}
                    mask="999.999.999-99"
                    maskChar=""
                    placeholder="CPF"
                    onChange={(e) => {
                        setFieldValue("cpf", e.target.value.replace(/\D/g,''));
                    }}
                />
            )}
        </Field>
    )
}

const TelField = () => {
    const { setFieldValue } = useFormikContext<RegisterValues>();

    return (
        <Field name="telefone">
            {({field} :any) => (
                <InputMask
                    {...field}
                    mask="(99) 99999-9999"
                    maskChar=""
                    placeholder="Telefone (Opcional)"
                    onChange={(e) => {
                        setFieldValue("telefone", e.target.value.replace(/\D/g,''))
                    }}
                />
            )}
        </Field>
    )
}

export default function Registro() {
    const navigate = useNavigate();

    const handleClickRegister = (values:RegisterValues) => {
        if (validarCpf(values.cpf)) {
            
            Axios.post("http://localhost:3001/register", {
                nome: values.nome,
                sobrenome: values.sobrenome,
                email: values.email,
                cpf: values.cpf,
                telefone: values.telefone,
                senha: values.senha
            }).then((response) => {
                if (response.status === 200) {
                    navigate('/login')
                }
                console.log(response)
            });
        } else {
            alert("CPF inválido")            
        }
    };

    const validationRegister = yup.object().shape({
        nome: yup
        .string()
        .min(2,"Mínimo 2 letras")
        .max(30)
        .required("Campo obrigatório")
        .matches(/^[A-Za-zÀ-ÖØ-ÿ\s]+$/, "Deve conter apenas letras"),
        sobrenome: yup
        .string()
        .min(2,"Mínimo 2 letras")
        .max(50)
        .required("Campo obrigatório")
        .matches(/^[A-Za-zÀ-ÖØ-ÿ\s]+$/, "Deve conter apenas letras"),
        email: yup
        .string()
        .email("Favor digitar um email válido")
        .required("Campo obrigatório")
        .max(60)
        .matches(/\./,"Favor digitar um email válido"),
        cpf: yup
        .string()
        .required("Campo obrigatório"),
        senha: yup
        .string()
        .min(8, "A senha deve conter ao menos 8 caracteres")
        .required("Campo obrigatório"),
        confirmSenha: yup
        .string()
        .oneOf([yup.ref("senha")], "As senhas não são iguais")
        .required("Campo obrigatório")
      })
    
    return(
        <div>
            <Header/>
            <div className="cadastro">
                <h1>Cadastro</h1>
                <Formik 
                    initialValues={{
                        nome: '',
                        sobrenome: '',
                        email: '',
                        cpf: '',
                        telefone: '',
                        senha: '',
                        confirmSenha: ''
                    }}
                    onSubmit={handleClickRegister}
                    validationSchema={validationRegister}
                >
                    {() => (
                        <Form className="register-form">
                        <div className="register-form-group">
                            <Field name="nome" className="form-field" placeholder="Nome" maxLength={30}/>

                            <ErrorMessage
                            component="span"
                            name="nome"
                            className="form-error"/>
                        </div>

                        <div className="register-form-group">
                            <Field name="sobrenome" className="form-field" placeholder="Sobrenome" maxLength={50}/>

                            <ErrorMessage
                            component="span"
                            name="sobrenome"
                            className="form-error"/>
                        </div>

                        <div className="register-form-group">
                            <Field name="email" className="form-field" placeholder="Email" maxLength={60}/>

                            <ErrorMessage
                            component="span"
                            name="email"
                            className="form-error"/>
                        </div>

                        <div className="register-form-group">
                            <CpfField/>

                            <ErrorMessage
                            name="cpf"
                            component="span"
                            className="form-error"
                            />
                        </div>

                        <div className="register-form-group">
                            <TelField/>
                            <ErrorMessage
                            name="telefone"
                            component="span"
                            className="form-error"/>
                        </div>

                        <div className="register-form-group">
                            <Field name="senha" className="form-field" placeholder="Senha"/>

                            <ErrorMessage
                            component="span"
                            name="senha"
                            className="form-error"/>
                        </div>

                        <div className="register-form-group">
                            <Field name="confirmSenha" className="form-field" placeholder="Confirme a Senha"/>

                            <ErrorMessage
                            component="span"
                            name="confirmSenha"
                            className="form-error"/>
                        </div>
                        <button className="button" type="submit">Registrar</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}