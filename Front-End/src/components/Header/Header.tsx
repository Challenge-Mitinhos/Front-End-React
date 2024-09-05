import styled from "styled-components";
import Logo from "../../svg/Logo";
import HeaderComponent from "./HeaderComponent";
import MenuButton from "./MenuButton";
import { useRef, useState } from "react";

export default function Header() {
    const Header = styled.div`
        display: flex;
        justify-content: space-between;
        padding: 1em;
        padding-left: 4.5em;
        padding-right: 8em;
        box-shadow: 0 0 0.5em 0.2em rgba(0, 0, 0, 0.5);
        @media screen and (max-width: 640px) {
            padding-left: 1em;
            padding-right: 2em;
        }`

    const Buttons = styled.div`
        display: flex;
        gap: 3.5em;
        align-items: center;
        @media screen and (max-width: 640px) {
            display: none;
        }`

    const ButtonCellphone = styled.div`
        display: none;
        position: fixed;
        top: 1.85em;
        right: 1.85em;
        @media screen and (max-width: 640px) {
            display: block;
        }
    `

    const MenuMobile = styled.div`
        position: absolute;
        right: 0;
        top: 0;
        background-color: #ffb7b7;
        height: 100vh;
        width: 80vw`
    
    const [modalOpen,setModalOpen] = useState(false);

    let logged = false;
    let component = logged?<HeaderComponent name="Perfil" strong/>:<HeaderComponent name="Entrar" strong/>;
    
    return(
        <Header>
            <Logo height="3.5em" width="3.5em"/>
            <Buttons>
                <HeaderComponent name="Time"/>
                <HeaderComponent name="ChatBot"/>
                <HeaderComponent name="Entrar" strong/>
            </Buttons>
            <ButtonCellphone>
                <HeaderComponent icon={<MenuButton/>} onClick={() => (setModalOpen(!modalOpen))}/>
                <dialog open={modalOpen}>
                    <MenuMobile>
                        <HeaderComponent name="Time"/>
                        <HeaderComponent name="ChatBot"/>
                        {component}
                    </MenuMobile>
                </dialog>   
            </ButtonCellphone>
        </Header>
    )
}