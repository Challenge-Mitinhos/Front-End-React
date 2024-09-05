import styled from "styled-components";
import Header from "../../components/Header/Header";

const Background = styled.div`
    height: 90vh;
    display: flex;
    background-image: url("/img/rodovia.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    justify-content: center;
    align-items: center;
    
    @media screen and (max-width: 1280px) {
        background-image: url("/img/44891.jpg")
    }`

const Glass = styled.div`
    width: 80vw;
    height: 70vh;
    margin: auto;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
    backdrop-filter: blur(1em);
    -webkit-backdrop-filter: blur(1em);
    border-radius: 2em;
    border: 1px solid rgba(255,255,255,0.18);
    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
    
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    @media screen and (max-width: 1280px) {
        height: 38vh;

    }`

const Button = styled.button`
    margin-top: .5em;
    background-color: #01A1FD;
    width: 25vw;
    height: 8vh;
    border-radius: 1rem;
    font-size: 1.68rem;
    font-weight: 600;
    color: #fff;
    text-align: center;
    align-self: flex-end;
    border: 0;
    transition: all 0.3s ease;

    &:hover{
        pointer-events: auto;
        transform: translateY(-0.5vh);
        box-shadow: 0vh 6px 20px rgba(0,0,0,0.37);
        cursor: pointer;
    }

    @media screen and (max-width: 1280px) {
        align-self: center;
        font-size: 1.68rem;
        width: 60vw;
        height: 7vh;
    }

    @media screen and (max-width: 756px){
        font-size: 1rem;
    }
`

const Image = styled.img`
    @media screen and (max-width: 1280px) {
        display: none;
    }
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    text-align: right;

    h1 {
        font-size: 3em;
        color: #1E272F;
        height: min-content;
    }

    p {
        font-size: 1.3em;
        font-weight: 300;
        color: #1E272F;
        width: 30vw;
    }

    
    @media screen and (max-width: 1280px) {
        text-align: center;
        align-items: center;

        h1 {
            font-size: 2em;
        }

        p {
            width: 65vw;
        }
    }

    @media screen and (max-width: 756px){
        p {
            font-size: 1rem;
        }
    }
`

const Ai = styled.a`
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    background: linear-gradient(to right,rgba(226,235,255,1) 0%, rgba(41,177,255,1) 50%, rgba(226,235,255,1) 100%);
    background-size: 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: animate-gradient 2s linear infinite;

    @keyframes animate-gradient {
        to {
            background-position: -200%;
        }
    }
`

export default function Home() {
    return(
        <>
            <Header/>
            <Background>
                <Glass>
                    <Image src="/img/Robotics-cuate.svg" alt="RobotIMG" style={{height:"35em", width:"35em"}}/>
                    <Content>
                        <h1>AutoCare Bot</h1>
                        <p>Seu assistente virtual especializado em mecânica automotiva, impulsionado pela mais avançada <Ai href="">Inteligência Artificial.</Ai></p>
                        <Button>Inicie uma conversa</Button>
                    </Content>
                </Glass>
            </Background>
        </>
    )
}