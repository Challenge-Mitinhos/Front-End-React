import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

interface Values {
  email: string;
  password: string;
  confirmPassword: string;
}

const Wrapper = styled.div`
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
  backdrop-filter: blur(1em);
  -webkit-backdrop-filter: blur(1em);
  border: 2px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(20px);
  border-radius: 2em;
  padding: 60px 80px;
  width: 520px;
  color: #fff;

  .wrapperTitle {}

  .input-box {
    position: relative;
    width: 100%;
    height: 50px;
    margin: 30px 0;
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
  }

  .form-field::placeholder{
    color: #fff;
  }

  .input-error {
    border: 2px solid rgba(255, 0, 0, 0.2);
  }

  .shake {
    animation: shake 0.5s;
    animation-timing-function: ease-in-out;
  }

  i {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
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
    font-size: 1.5vw;
    font-weight: 600;
    color: #fff;
    
    transition: background 0.5s ease, color 0.5s ease;
  }

  .remember-forgot {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

function App() {

  const handleClick = (values:Values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password
    }).then((response) => {
      if (response.status === 200) {
        window.location.href = '/';
      }

      console.log(response)
    });
  };  

  const validationLogin = yup.object().shape({
    email: yup
    .string()
    .email("Favor digitar um email válido.")
    .required(""),
    password: yup
    .string()
    .required(""),
  })

  const handleMouseEnter = () => {
    document.getElementById("lock")!.style.cursor = 'pointer';
  };

  const handleMouseLeave = () => {
    document.getElementById("lock")!.style.cursor = 'default';
  };

  const [lockOpen, setLockOpen] = useState(false);

  return (
    <div style={{background:"#000"}}>
      <Wrapper className="container">
        <h1 className="wrapperTitle">Bem vindo de volta!</h1>
        <Formik 
          initialValues={{
            email: '',
            password: '',
            confirmPassword: ''
          }}
          onSubmit={handleClick}
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
                <Field name="password" className="form-field" placeholder="Senha" type={lockOpen?"text":"password"}/>
                <i 
                  className={`bx ${lockOpen?"bx-lock-open-alt":"bx-lock-alt"}`}
                  id="lock" 
                  onMouseEnter={handleMouseEnter} 
                  onMouseLeave={handleMouseLeave}
                  onClick={() => (setLockOpen(!lockOpen))}
                ></i>
              </div>

              <ErrorMessage
              component="span"
              name="password"
              className="form-error"/>
            </div>

            <div className="remember-forgot">
                <label>
                  <Field name="remember" className="remember" type="checkbox"/>
                  Lembrar de mim
                </label>
                <Link to={"#"}>Esqueci minha senha</Link>
            </div>

            <button className="button" type="submit">Login</button>
          </Form>
        </Formik>
        <div className="linkRegistro">
          <p>Ainda não tem uma conta? <Link to={'/registro'}>Registre-se</Link></p>
        </div>
      </Wrapper>
    </div>
  )
}

export default App
