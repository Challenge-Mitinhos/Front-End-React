import styled from "styled-components";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

const Content = styled.div`
    display: flex;
    flex-direction: column;
    height: min-content;
    background-image: url("/img/rodovia-maior.jpg");
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
        height: 17em;
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
        height: 4em;
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

const TimeWrapper = styled.div`
    display: flex;
    gap: 3em;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;`

const Card = styled.div`
    width: 23em;
    padding: 1.3em;
    border-radius: 2em;
    display: flex;
    flex-direction: column;
    gap: .4em;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
    backdrop-filter: blur(1em);
    border: 2px solid rgba(255,255,255,0.18);
    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
    -webkit-backdrop-filter: blur(1em);
    position: relative;

    
    @media screen and (max-width: 480px){
        width: 80vw;
    }
    
    .photo {
        border-radius: .5em;
        transition: .2s ease-in-out;
    }
    
    h1 {
        color: #E1E1E1;
        font-size: 1.35em;
    }
    
    p {
        color: #D7D7D7;
        font-size: 1em;
        font-weight: 100;
    }
    
    .textBlock {
        margin-top: .8em;
        display: flex;
        flex-direction: column;
        gap: .7em;
        margin-bottom: .2em;
    }
    
    &:hover{
        .photo {
            filter: blur(.5em);
        }
        h1, p {
            filter: blur(.5em);
        }
        .social{
            opacity: 1;
            transform: translateY(-2em);
        }
        
    }`

const FirstSection = styled.section`
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1024px) {
        height: 80vh;
    }`

const SecondSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4em;
    padding-bottom: 5em;
    gap: 4em;`
    
const Title = styled.h1`
    font-size: 10em;
    color: #ffffffd6;
    text-shadow: 0 0 32px rgba(0, 0, 0, 0.63);
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: rgba(255,255,255,0.18);
    
    @media screen and (max-width: 1500px){
        font-size: 10vw;
        text-shadow: 0 0 16px rgb(0, 0, 0, 0.3);
    }`

const scrollToFuncion = (id:string): (() => void) => {
    return () => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({behavior:"smooth"});
        }
    }
}

const Social = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    position: absolute;
    left: 23%; /* Centraliza horizontalmente */
    top: 50%; /* Ajusta a posição vertical conforme necessário */
    z-index: 20;
    opacity: 0;
    transition: all 0.2s ease-in-out;

    div {
        height: 3.5em;
        width: 3.5em;
        padding: 1em;
        border-radius: 100%;
        background: transparent;
        border: 2px solid rgba(255,255,255,0.18);  
        box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        padding-top: 0.17em;
        padding-left: 0.1em;
        height: 1.8em;
    }
`;


export default function Time() {
    let logged = false;

    return(
        <>  
            <Header primeiroLink="Início" segundoLink="ChatBot" ultimoLink={logged?"Perfil":"Entrar"} primeiroLinkDestino='/'/>
            <Content>
                <FirstSection>
                    <Glass>
                        <Text>
                            <h1>Nosso Time</h1>
                            <p>Conecte-se diretamente com os desenvolvedores do projeto para suporte e esclarecimentos.</p>
                            <Button onClick={scrollToFuncion("team")}>Conheça nossa equipe</Button>
                        </Text>
                        <Image src="/img/meeting-cuate.svg" alt="RobotIMG" style={{height:"32vw", width:"32vw"}}/>
                    </Glass>
                </FirstSection>
                <SecondSection id="team">
                    <Title>Desenvolvedores</Title>
                    <TimeWrapper>
                        <Card>
                        <Social className="social">
                                <div>
                                    <Link to="https://github.com/MikaelDv"><img src="/img/github-brands-solid.svg" alt="GitHub icon"/></Link>
                                </div>
                                <div>
                                    <Link to="https://instagram.com/011mikael" target="_blank" ><img src="/img/instagram-brands-solid.svg" alt="" /></Link>
                                </div>
                                <div>
                                    <Link to="https://www.linkedin.com/in/mikael-sanches/" target="_blank"><img src="/img/linkedin-in-brands-solid.svg" alt="" /></Link>
                                </div>
                            </Social>
                            <img src="/img/cards/CardMikael.png" alt="foto do colaborador Mikael" className="photo" />
                            <i/>
                            <div className="textBlock">
                                <h1>Mikael Sanches</h1>
                                <p>Analista e Desenvolvedor de Sistemas</p>
                            </div>
                        </Card>
                        <Card>
                        <Social className="social">
                                <div>
                                    <Link to="https://github.com/Murilo-Capristo"><img src="/img/github-brands-solid.svg" alt="GitHub icon"/></Link>
                                </div>
                                <div>
                                    <Link to="https://instagram.com/capristin" target="_blank" ><img src="/img/instagram-brands-solid.svg" alt="" /></Link>
                                </div>
                                <div>
                                    <Link to="https://www.linkedin.com/in/murilo-capristo-78809a306" target="_blank"><img src="/img/linkedin-in-brands-solid.svg" alt="" /></Link>
                                </div>
                            </Social>
                            <img src="/img/cards/CardMurilo.png" alt="foto do colaborador Murilo" className="photo" />
                            <div className="textBlock">
                                <h1>Murilo Capristo</h1>
                                <p>Analista e Desenvolvedor de Sistemas</p>
                            </div>
                        </Card>
                        <Card>
                            <Social className="social">
                                <div>
                                    <Link to="https://github.com/StaniukaitisPaula"><img src="/img/github-brands-solid.svg" alt="GitHub icon"/></Link>
                                </div>
                                <div>
                                    <Link to="https://instagram.com/p_blesaa" target="_blank" ><img src="/img/instagram-brands-solid.svg" alt="" /></Link>
                                </div>
                                <div>
                                    <Link to="https://www.linkedin.com/in/paula-blesa-staniukaitis-5ab53224a/" target="_blank"><img src="/img/linkedin-in-brands-solid.svg" alt="" /></Link>
                                </div>
                            </Social>
                            <img src="/img/cards/CardPaula.png" alt="foto do colaborador Paula" className="photo" />
                            <div className="textBlock">
                                <h1>Paula Blesa</h1>
                                <p>Analista e Desenvolvedor de Sistemas</p>
                            </div>
                        </Card>
                    </TimeWrapper>
                </SecondSection>
            </Content>
        </>
    )
}