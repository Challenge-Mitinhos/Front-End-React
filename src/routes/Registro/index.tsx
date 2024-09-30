import { Formik, Form, Field, FieldProps, ErrorMessage, useFormikContext } from "formik";
import * as yup from "yup";
import Axios from "axios";
import InputMask from "react-input-mask";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
// import { validarCpf } from "../util/validarCPF";
import styled from "styled-components";


interface RegisterValues {
    nome: string,
    sobrenome: string,
    email: string,
    cpf: string,
    telefone: string,
    senha: string,
    confirmSenha: string;
}

interface CustomFieldProps {
    className: string
}

const CpfField = ({ className }:CustomFieldProps) => {
    const { setFieldValue } = useFormikContext<RegisterValues>();

    return (
        <Field name="cpf">
            {({field}:FieldProps) => (
                <InputMask
                    {...field}
                    mask="999.999.999-99"
                    maskChar=""
                    placeholder="CPF"
                    className={className}
                    onChange={(e) => {
                        setFieldValue("cpf", e.target.value.replace(/\D/g,''));
                    }}
                />
            )}
        </Field>
    )
}

const TelField = ({ className }:CustomFieldProps) => {
    const { setFieldValue } = useFormikContext<RegisterValues>();

    return (
        <Field name="telefone">
            {({field}:FieldProps) => (
                <InputMask
                    {...field}
                    mask="(99) 99999-9999"
                    maskChar=""
                    placeholder="Telefone (Opcional)"
                    className={className}
                    onChange={(e) => {
                        setFieldValue("telefone", e.target.value.replace(/\D/g,''))
                    }}
                />
            )}
        </Field>
    )
}

const Main = styled.div`
    background: url("/img/4076.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
`

const Wrapper = styled.div`
    background: linear-gradient(135deg, rgba(83, 83, 83, 0.2), rgba(255,255,255,0));
    backdrop-filter: blur(1em);
    -webkit-backdrop-filter: blur(1em);
    border: 2px solid rgba(255,255,255,0.18);
    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
    backdrop-filter: blur(16px);
    border-radius: 2em;
    padding: 30px 40px;
    width: 840px;

    @media screen and (max-width: 980px){
        width: 85%;
    }

    @media screen and (max-width: 670px){
        padding: 25px 35px;
    }

    @media screen and (max-width: 375px){
        padding: 10px 30px;
    }

    .register-title {
        color: #fff;
        text-align: center;
        margin-bottom: 30px;

        @media screen and (max-width: 950px){
            margin-bottom: 25px;
        }

        @media screen and (max-width: 740px){
            margin-bottom: 20px;
        }

        @media screen and (max-width: 550px){
            margin-bottom: 15px;
        }

        @media screen and (max-width: 375px){
            margin-bottom: 0px;
        }
    }

    .register-form {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;

        @media screen and (max-width: 985px){
            gap: 4%;
        }
    }

    .register-form-group {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 48%;
        height: 50px;

        @media screen and (max-width: 985px){
            margin: 10px 0;
            gap: 4%;
        }

        @media screen and (max-width: 701px){
            width: 35%;
        }

        @media screen and (max-width: 520px){
            width: 100%;
            height: 45px;
        }
    }

    .form-field {
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
        outline: none;
        border: 2px solid rgba(255,255,255,0.18);
        border-radius: 40px;
        font-size: 16px;
        color: #fff;
        padding: 20px 20px 20px 20px;
        transition: all 0.3s ease;

        @media screen and (max-width: 740px){
            font-size: 14px;
        }

        @media screen and (max-width: 550px){
            font-size: 12px;
        }

        @media screen and (max-width: 520px){
            font-size: 14px;
        }
    }

    .form-field::placeholder {
        color: #fff
    }

    .big-field {
        width: 100%;

        @media screen and (max-width: 985px){
            width: 100%;
        }
    }

    .register-submit {
        display: flex;
        justify-content: center;
        width: 100%;

        @media screen and (max-width: 981px){
            margin-top: 20px;
        }
    }

    .form-error {
        font-size: 12px;
        position: absolute;
        top: 50px;
        color: rgb(255, 58, 58, 0.85);

        @media screen and (max-width: 740px){
            font-size: 10px;
        }

        @media screen and (max-width: 500px){
            top: 45px;
        }
    }

    .button {
        width: 33%;
        height: 45px;
        background: #01A1FD;
        border: none;
        outline: none;
        border-radius: 40px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        transition: background 0.5s ease, color 0.5s ease;

        @media screen and (max-width: 710px){
            font-size: 16px;
        }

        @media screen and (max-width: 640px) {
            width: 45%;
        }

        @media screen and (max-width: 520px){
            height: 40px;
            font-size: 14px;
        }
    }

    .button:hover {
        background: transparent;
        box-shadow: inset 0 0 0 2px #01A1FD;
    }

    .linkLogin {
        font-size: 14.5px;
        margin: 20px 0 15px;
        text-align: center;
        color: #fff;

        @media screen and (max-width: 520px){
        font-size: 12.5px;
        margin: 10px 0 5px;
        }

        @media screen and (max-width: 420px){
            font-size: 11px;
        }
    }

    .linkLogin a {
        text-decoration: none;
        font-weight: bold;
        font-size: 15px;
        color: #ffffff;
        transition: all .2s ease;

        @media screen and (max-width: 520px){
            font-size: 13px;
        }

        @media screen and (max-width: 420px){
            font-size: 12px;
        }
    }

    .linkLogin a:hover {
        text-decoration: underline;
    } 
`

export default function Registro() {
    const navigate = useNavigate();

    const handleClickRegister = (values:RegisterValues) => {
        // if (validarCpf(values.cpf)) {
            
            Axios.post("https://back-end-autocare.vercel.app/register", {
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
        // } else {
        //     alert("CPF inválido")            
        // }
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
            <Header ultimoLink="Início" ultimoLinkDestino="/"/>
            <Main>
                <Wrapper>
                    <h1 className="register-title">Cadastro</h1>
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

                                <div className="register-form-group big-field">
                                    <Field name="email" className="form-field" placeholder="Email" maxLength={60}/>

                                    <ErrorMessage
                                    component="span"
                                    name="email"
                                    className="form-error"/>
                                </div>

                                <div className="register-form-group">
                                    <CpfField className="form-field"/>

                                    <ErrorMessage
                                    name="cpf"
                                    component="span"
                                    className="form-error"
                                    />
                                </div>

                                <div className="register-form-group">
                                    <TelField className="form-field"/>
                                    <ErrorMessage
                                    name="telefone"
                                    component="span"
                                    className="form-error"/>
                                </div>

                                <div className="register-form-group">
                                    <Field name="senha" className="form-field" placeholder="Senha" type="password"/>

                                    <ErrorMessage
                                    component="span"
                                    name="senha"
                                    className="form-error"/>
                                </div>

                                <div className="register-form-group">
                                    <Field name="confirmSenha" className="form-field" placeholder="Confirme a Senha" type="password"/>

                                    <ErrorMessage
                                    component="span"
                                    name="confirmSenha"
                                    className="form-error"/>
                                </div>
                                <div className="register-submit">
                                    <button className="button" type="submit">Registrar</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="linkLogin">
                        <p>Já tem uma conta? <Link to='/login'>Entrar</Link></p>
                    </div>
                </Wrapper>
            </Main>
        </div>
    )
}