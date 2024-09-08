import styled from "styled-components";
import Header from "../../components/Header/Header";

const Content = styled.div`
    height: max-content;
    background-image: url("/img/44891.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;`

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
    font-size: 1.5vw;
    font-weight: 600;
    color: #fff;
    text-align: center;
    align-self: flex-start;
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

const Text = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: left;

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

const TimeWrapper = styled.div``

export default function Time() {
    let logged = false;

    return(
        <>  
            <Header primeiroLink="Início" segundoLink="ChatBot" ultimoLink={logged?"Perfil":"Entrar"} primeiroLinkDestino='/'/>
            <Content>
                <div>
                    <Glass>
                        <Text>
                            <h1>Nosso Time</h1>
                            <p>Conecte-se diretamente com os desenvolvedores do projeto para suporte e esclarecimentos.</p>
                            <Button>Conheça nossa equipe</Button>
                        </Text>
                        <Image src="/img/meeting-cuate.svg" alt="RobotIMG" style={{height:"32vw", width:"32vw"}}/>
                    </Glass>
                </div>
                <section>
                    <h1>Desenvolvedores</h1>
                    <TimeWrapper>
                        <img src="" alt="" />
                        <h1>Mikael Sanches</h1>
                        <p>Analista e Desenvolvedor de Sistemas</p>
                    </TimeWrapper>
                </section>
            </Content>
        </>
    )
}