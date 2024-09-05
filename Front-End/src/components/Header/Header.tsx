import styled from "styled-components";
import Logo from "../../svg/Logo";
import HeaderComponent from "./HeaderComponent";
import MenuButton from "../../svg/MenuButton";
import { useState } from "react";
import CloseButton from "../../svg/CloseButton";
import { Link } from "react-router-dom";

const HeaderComp = styled.div`
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
    }`

const Buttons = styled.div`
    display: flex;
    gap: 3.5em;
    align-items: center;
    @media screen and (max-width: 756px) {
        display: none;
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
    transition: right 850ms ease;`

const TopMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;`

const Title = styled.h1`
    font-size: 3em; `

export default function Header() {
    
    const [modalOpen,setModalOpen] = useState(false);

    let logged = false;
    
    return(
        <HeaderComp>
            <Link to={'/'}>
                <Logo height="7vh" width="7vh"/>
            </Link>
            <Buttons>
                <Link to={'/time'}>
                    <HeaderComponent name="Time"/>
                </Link>
                <HeaderComponent name="ChatBot"/>
                <HeaderComponent name="Entrar" strong/>
            </Buttons>
            <ButtonCellphone>
                <HeaderComponent icon={<MenuButton height="4.5vh" width="4.5vh" color="#1E272F"/>} onClick={() => setModalOpen(true)}/>
                <MenuMobile modalOpen={modalOpen}>
                    <TopMenu>
                        <Title>Menu</Title>
                        <HeaderComponent icon={<CloseButton height="4.5vh" width="4.5vh" color="#1E272F"/>} onClick={() => setModalOpen(false)}/>
                    </TopMenu>
                    <HeaderComponent name="Time" fontSize="1.5em"/>
                    <HeaderComponent name="ChatBot" fontSize="1.5em"/>
                    <HeaderComponent name={logged?"Perfil":"Entrar"} strong fontSize="2em"/>
                </MenuMobile>
            </ButtonCellphone>
        </HeaderComp>
    )
}