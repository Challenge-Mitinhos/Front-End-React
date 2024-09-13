import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { LoginContext } from "../context/LoginContext";

interface Values {
  email: string;
  senha: string;
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
    width: 420px;
    color: #fff;

    @media screen and (max-width: 520px){
        width: 400px;
    }

    @media screen and (max-width: 420px){
        width: 350px;
        padding: 15px 25px;
    }

    .wrapperTitle {
        text-align: center;
        font-size: 36px;

        @media screen and (max-width: 520px){
            font-size: 32px;
        }

        @media screen and (max-width: 420px){
            font-size: 28px;
        }
    }

    .input-box {
        position: relative;
        width: 100%;
        height: 50px;
        margin: 30px 0;

        @media screen and (max-width: 520px){
            margin: 18px 0;
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
        padding: 20px 45px 20px 20px;
        transition: all 0.3s ease;

        @media screen and (max-width: 520px){
            font-size: 14px;
        }
    }

    .form-field::placeholder{
        color: #fff;
    }

    i {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;

        @media screen and (max-width: 520px){
            font-size: 18px;
            right: 18px
        }
    }

    .form-error {
        font-size: 12px;
        position: absolute;
        top: 165px;
        color: rgb(255, 58, 58, 0.85);

        @media screen and (max-width: 520px){
            top: 139px;
        }

        @media screen and (max-width: 420px){
            font-size: 11px;
            top: 118px;
        }
    }

    .button {
        width: 100%;
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

        @media screen and (max-width: 520px){
            height: 40px;
            font-size: 16px;
        }
    }

    .button:hover {
        background: transparent;
        box-shadow: inset 0 0 0 2px #01A1FD;
    }

    .remember-forgot {
        width: 100%;
        display: flex;
        justify-content: space-between;
        font-size: 14.5px;
        margin: -15px 0 15px;

        @media screen and (max-width: 520px){
            font-size: 12.5px;
            margin: -5px 0 15px;
        }
    }

    .remember-forgot a {
        text-decoration: none;
        color: #ffffff;
        transition: all .2s ease;
    }

    .remember-forgot a:hover {
        text-decoration: underline;
    }

    .check-box {
        display: flex;
        gap: 4px;
    }

    .linkRegistro {
        font-size: 14.5px;
        margin: 20px 0 15px;
        text-align: center;

        @media screen and (max-width: 520px){
            font-size: 12.5px;
            margin: 10px 0 5px;
        }

        @media screen and (max-width: 420px){
            font-size: 10.5px;
        }
    }

  .linkRegistro a {
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
    color: #ffffff;
    transition: all .2s ease;

    @media screen and (max-width: 520px){
        font-size: 13px;
    }

    @media screen and (max-width: 420px){
        font-size: 11px;
    }
  }

  .linkRegistro a:hover {
    text-decoration: underline;
  }

  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    50% {
      transform: translateX(5px);
    }
    75% {
      transform: translateX(-5px);
    }
    100% {
      transform: translateX(0);
    }
  }
`

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error("LoginComponent LoginProvider")
  } 

  const { toggleLogin } = context;
  const [lockOpen, setLockOpen] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleClick = (values:Values) => {
    Axios.post("https://back-end-autocare.vercel.app/login", {
      email: values.email,
      senha: values.senha
    }).then((response) => {
      if (response.status === 200) {
        toggleLogin();
        navigate(from, {replace: true});
      } 
      console.log(response)
    });
  };  

  const validationLogin = yup.object().shape({
    email: yup
    .string()
    .email("Favor digitar um email válido.")
    .required(""),
    senha: yup
    .string()
    .required(""),
  })

  const handleMouseEnter = () => {
    document.getElementById("lock")!.style.cursor = 'pointer';
  };

  const handleMouseLeave = () => {
    document.getElementById("lock")!.style.cursor = 'default';
  };

  return (
    <div>
      <Header ultimoLink="Início" ultimoLinkDestino="/"/>
      <Main>
        <Wrapper className="container">
            <h1 className="wrapperTitle">Entre</h1>
            <Formik 
              initialValues={{
                email: '',
                senha: ''
              }}
              onSubmit={(values, { resetForm }) => {
                setTimeout(() => {
                  resetForm();
                }, 200)

                handleClick(values)
              }}
              validationSchema={validationLogin}
            >
              <Form className="login-form">
                <div className="login-form-group">
                  <div className="input-box">
                    <Field name="email" className="form-field" placeholder="Email"/>
                    <i className="bx bx-user"></i>
                  </div>

                  <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"/>
                </div>

                <div className="login-form-group">
                  <div className="input-box">
                    <Field name="senha" className="form-field" placeholder="Senha" type={lockOpen?"text":"password"}/>
                    <i 
                      className={`bx ${lockOpen?"bx-lock-open-alt":"bx-lock-alt"}`}
                      id="lock" 
                      onMouseEnter={handleMouseEnter} 
                      onMouseLeave={handleMouseLeave}
                      onClick={() => (setLockOpen(!lockOpen))}
                    ></i>
                  </div>
                </div>

                <div className="remember-forgot">
                    <label className="check-box">
                      <Field name="remember" className="remember" type="checkbox"/>
                      Lembrar de mim
                    </label>
                    <Link to={"#"}>Esqueceu a senha?</Link>
                </div>

                <button className="button" type="submit">Entre</button>
              </Form>
            </Formik>
            <div className="linkRegistro">
              <p>Ainda não tem uma conta? <Link to={'/registro'}>Registre-se</Link></p>
            </div>
        </Wrapper>
      </Main>
    </div>
  )
}