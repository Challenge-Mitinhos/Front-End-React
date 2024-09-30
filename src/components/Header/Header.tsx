import styled from "styled-components";
import Logo from "../../svg/Logo";
import HeaderComponent from "./HeaderComponent";
import MenuButton from "../../svg/MenuButton";
import { useContext, useState } from "react";
import CloseButton from "../../svg/CloseButton";
import { Link } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

const HeaderComp = styled.div`
    background: #fff;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
    padding-left: 4.5em;
    padding-right: 8em;
    box-shadow: 0 0 0.5em 0.2em rgba(0, 0, 0, 0.5);
    @media screen and (max-width: 756px) {
        padding-left: 1em;
        padding-right: 1.5em;
    }
    
    a{
        text-decoration: none;
    }
    
    .link {
        height: 6vh;
    }`

const Buttons = styled.nav`
    display: flex;
    
    @media screen and (max-width: 756px) {
        display: none;
    }
    
    .list {
        list-style: none;
        display: flex;
        gap: 3.5em;
        align-items: center;
    }`

const ButtonCellphone = styled.div`
    display: none;
    @media screen and (max-width: 756px) {
        display: block;
    }`

const MenuMobile = styled.div<{ modalOpen: boolean }>`
    z-index: 100;
    position: fixed;
    right: ${(props) => (props.modalOpen ? "0" : "-100%")};
    top: 0;
    background-color: #f3f3f3;
    height: 100vh;
    width: 20em;
    box-shadow: ${(props) => (props.modalOpen ? "0 0 20em 20vw rgba(0, 0, 0, 0.274)" : "none")};
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    padding: 1.5em;
    transition: right 600ms ease;
    
    .list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 1.3em;
    }`

const TopMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;`

const Title = styled.h1`
    font-size: 3em; `

type HeaderProps = {
    primeiroLink?:string,
    primeiroLinkDestino?:string,
    segundoLink?:string,
    segundoLinkDestino?:string,
    terceiroLink?:string,
    terceiroLinkDestino?:string,
    ultimoLink?:string,
    ultimoLinkDestino?:string,
    className?:string;
}

export default function Header({primeiroLink,primeiroLinkDestino,segundoLink,segundoLinkDestino,terceiroLink,terceiroLinkDestino,ultimoLink,ultimoLinkDestino,className}:HeaderProps) {
    
    const [modalOpen,setModalOpen] = useState(false);

    const context = useContext(LoginContext);

    if (!context) {
        throw new Error("LoginComponent LoginProvider")
    } 

    const {login, toggleLogin} = context;

    return(
        <HeaderComp className={className}>
            <Link to={'/'} className="link">
                <Logo height="6vh" width="6vh"/>
            </Link>
            <Buttons>
                <ul className="list">
                    {primeiroLink && (
                        <li>
                            <Link to={primeiroLinkDestino||""}>
                                <HeaderComponent name={primeiroLink}/>
                            </Link>
                        </li>)}
                    {segundoLink && (
                        <li>
                            <Link to={segundoLinkDestino||""}>
                                <HeaderComponent name={segundoLink}/>
                            </Link>
                        </li>)}
                    {terceiroLink && (
                        <li>
                            <Link to={terceiroLinkDestino||""}>
                                <HeaderComponent name={terceiroLink}/>
                            </Link>
                        </li>)}
                    {login === "deslogado" && (<li>
                        <Link to={ultimoLinkDestino||""}>
                            <HeaderComponent name={ultimoLink} strong/>
                        </Link>
                    </li>)}
                    {login === "logado" && (<li>
                        <HeaderComponent name="Sair" onClick={() => (toggleLogin())} strong/>
                    </li>)}
                </ul>
            </Buttons>
            <ButtonCellphone>
                <HeaderComponent icon={<MenuButton height="4.5vh" width="4.5vh" color="#1E272F"/>} onClick={() => setModalOpen(true)}/>
                <MenuMobile modalOpen={modalOpen}>
                    <TopMenu>
                        <Title>Menu</Title>
                        <HeaderComponent icon={<CloseButton height="4.5vh" width="4.5vh" color="#1E272F"/>} onClick={() => setModalOpen(false)}/>
                    </TopMenu>
                    <ul className="list">
                        {primeiroLink && (
                            <li>
                                <Link to={primeiroLinkDestino || ""}>
                                    <HeaderComponent name={primeiroLink} fontSize="1.4em" />
                                </Link>
                            </li>)}
                        {segundoLink && (
                            <li>                            
                                <Link to={segundoLinkDestino || ""}>
                                    <HeaderComponent name={segundoLink} fontSize="1.4em" />
                                </Link>
                            
                            </li>)}
                        {login === "deslogado" && (<li>
                            <Link to={ultimoLinkDestino||""}>
                                <HeaderComponent name={ultimoLink} strong fontSize="1.7em"/>
                            </Link>
                        </li>)}
                        {login === "logado" && (<li>
                            <HeaderComponent name="Sair" onClick={() => (toggleLogin())} strong fontSize="1.7em"/>
                        </li>)}
                    </ul>
                </MenuMobile>
            </ButtonCellphone>
        </HeaderComp>
    )
}