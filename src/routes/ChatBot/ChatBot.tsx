import { useEffect, useRef, useState } from 'react';
import ChatMessage from '../../components/ChatMessage';
import React from 'react';
import Header from '../../components/Header/Header';
import styled from 'styled-components';
import { Field, Form, Formik } from 'formik';
import Footer from '../../components/Footer/Footer';

const ChatPage = styled.div`
    background: url("/img/44023.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
        min-height: 80vh;
    }
`

const ChatBotBox = styled.div`
    height: 80vh;
    width: 700px; 
    border-radius: 1em;
    padding: 20px;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
    backdrop-filter: blur(1em);
    -webkit-backdrop-filter: blur(1em);
    border-radius: 2em;
    border: 2px solid rgba(255,255,255,0.18);
    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    @media screen and (max-width: 768px) {
        width: 90%;
        height: 75vh;
    }
    
    .messages{
        height: 90%; 
        overflow-y: scroll;
        border-radius: 1em;

        &::-webkit-scrollbar-track{
            border-radius: 10px;
            background-color: transparent;
        }

        &::-webkit-scrollbar{            
            min-height: 8px;
            width: 12px;
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb{
            border-radius: 10px;
            background-color: #e0e0e0;   
        }
    }
    
    .send-message{
        width: 100%;
        height: 7%;
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .button-send {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 15%;
        height: 100%;
    }
    
    .button-send img{
        height: 100%;
    }
    
    .input-message{
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
        outline: none;
        border: 2px solid rgba(255, 255, 255, 0.377);
        border-radius: 40px;
        font-size: 16px;
        padding: 20px 45px 20px 20px;
        transition: all 0.3s ease;
        color: #fff;

        @media screen and (max-width: 768px) {
            font-size: 14px;
        }
    }
    
    .input-message::placeholder{
        color: #fff;
    }`

export default function ChatBot() {
    const [messages, setMessages] = useState<string[]>(["Olá, eu sou o AutoCare Bot! Como posso te ajudar?"]);

    const botMessages = [
        "Você pode me dar mais detalhes ou sintomas?",
        "Verifiquei que você não possui nenhum veículo cadastrado. Para poder analisar melhor o seu problema, por favor, me informe a marca e modelo de seu veículo.",
        "Qual o ano de fabricação do seu veículo",
        "Seu veículo dá sinais Vazamento de Gasolina, o que pode acarretar em riscos a sua saúde. Sua manutenção tem um custo médio de R$880,00, deseja se dirigir a um parceiro para avaliação precisa?",
        "Certo. Para que eu possa te direcionar a um de nossos parceiros, por favor, qual a sua localização?",
        "Verificando...",
        "De acordo com a sua localização: Av. Paulista, 1106. - Bela Vista, São Paulo - SP. Os parceiros mais próximos são:\n1. (Bela Vista Automotivos) - 7 min.\n2. (Auto Mecânica Mecha) - 9 min.\n3. (Auto Fix Car) - 12min.\nPara qual parceiro deseja ser encaminhado?" ,
        "Já enviei as suas informações para a oficina parceira, que está no seu aguardo. Para mais suporte, entre em contato novamente. Obrigado por utilizar o AutoCare Bot."
    ];

    const [botIndex, setBotIndex] = useState<number>(0);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const sendBotMessage = () => {
        if (botIndex < botMessages.length) {
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, `AutoCare Bot: ${botMessages[botIndex]}`]);

                if (botIndex === 5) {
                    setTimeout(() => {
                    setMessages(prevMessages => [...prevMessages, `AutoCare Bot: ${botMessages[botIndex+1]}`])
                    setBotIndex(prevIndex => prevIndex +2);
                    }, 2000);
                } else {
                    setBotIndex(prevIndex => prevIndex+1);
                }
            }, 700);
        }
    }

    const formatMessage = (text: string) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
      };

    const scrollToBottom = () => {
        const messagesContainer = messagesEndRef.current?.parentElement;

        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            <Header primeiroLink='Início' segundoLink='Time' primeiroLinkDestino='/' segundoLinkDestino='/time'/>
            <ChatPage>
                <ChatBotBox>
                    <div className='messages'>
                        {messages.map((msg, index) => (
                            <ChatMessage
                                key={index}
                                text={formatMessage(msg)}
                                isUserMessage={msg.startsWith('Você')}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <Formik
                        initialValues={{ inputMessage: '' }}
                        onSubmit={(values, { resetForm }) => {
                            setMessages(prevMessages => [...prevMessages, `Você: ${values.inputMessage}`]);
                            sendBotMessage();
                            resetForm();
                        }}
                    >
                        {({ handleSubmit, submitForm }) => (
                            <Form className="send-message" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                                <Field 
                                    name="inputMessage" 
                                    placeholder="Digite sua mensagem"
                                    className="input-message"
                                />                            
                                <div className="button-send" onClick={submitForm}>
                                    <img src="/img/send-msg.svg" alt="Send Message Button" />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </ChatBotBox>
            </ChatPage>
            <Footer/>
        </>
    );
};