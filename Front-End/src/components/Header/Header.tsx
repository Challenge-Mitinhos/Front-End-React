import styled from "styled-components";
import Logo from "../../svg/Logo";
import HeaderComponent from "./HeaderComponent";

export default function Header() {
    const Header = styled.div`
        display: flex;
        justify-content: space-between;
        padding: .4em;
        padding-left: 1.2em;
        padding-right: 8em;`

    const Buttons = styled.div`
        display: flex;
        gap: 3.5em;
        align-items: center;`
    return(
        <Header>
            <Logo height="3.6em" width="3.6em"/>
            <Buttons>
                <HeaderComponent name="Time"/>
                <HeaderComponent name="ChatBot"/>
                <HeaderComponent name="Entre" strong/>
            </Buttons>
        </Header>
    )
}