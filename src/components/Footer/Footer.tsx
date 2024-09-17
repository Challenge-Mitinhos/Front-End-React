import { Link } from "react-router-dom"
import styled from "styled-components"

const FooterContainer = styled.div`
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    padding: 2em;
    gap: 1em;
`

const LogoEmail = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    font-size: 18px;
    font-weight: 500;
    color: #1E272F;

    & img {
        height: 36px;
    }

    a {
        text-decoration: none;
        color: #1E272F;
    }
`

const Copy = styled.p`
    font-size: 18px;
    font-weight: 500;
    color: #1E272F;
`

const List = styled.ul`
    list-style: none;
    display: flex;
    gap: 2em;
`

const Icon = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    padding: 10px;
    height: 60px;
    width: 60px;
    transition: all .2s ease;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.171);
    }
`

export default function Footer() {
    return (
        <FooterContainer>
            <LogoEmail>
                <img src="/img/logo.svg" alt="Logo AutoCare" />
                <Link to={"mailto:autocaredevs@outlook.com"}>
                    <p>autocaredevs@outlook.com</p>
                </Link>
            </LogoEmail>
            <Copy>&#169; 2024 AutoCare | FIAP</Copy>
            <nav>
                <List>
                    <Link to={"#"}>
                        <Icon>
                            <img style={{height: "100%", width: "28px"}} src="/img/github-black.svg" alt="GitHub icon"/>
                        </Icon>
                    </Link>
                    <Link to={"#"}>
                        <Icon>
                            <img style={{height: "100%", width: "26px"}} src="/img/instagram-black.svg" alt="Instagram icon" />
                        </Icon>
                    </Link>
                    <Link to={"#"}>
                        <Icon>
                            <img style={{height: "100%", width: "26px"}} src="/img/linkedin-black.svg" alt="Linkedin icon" />
                        </Icon>
                    </Link>
                </List>
            </nav>
        </FooterContainer>
    )
}