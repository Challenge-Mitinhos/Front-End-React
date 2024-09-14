import { useEffect, useRef, useState } from 'react';
import ChatMessage from '../components/ChatMessage';
import React from 'react';
import Header from '../components/Header/Header';

export default function ChatBot() {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    const botMessages = [
        "Olá, eu sou o AutoCare Bot! Como posso te ajudar?",
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

    const handleSendMessage = () => {
        if(input.trim()) {
            setMessages(prevMessages => [...prevMessages, `Você: ${input}`]);
            setInput("");

            setTimeout(() => {
                sendBotMessage();
            }, 500);
        }
    }

    const sendBotMessage = () => {
        if (botIndex < botMessages.length) {
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, `AutoCare Bot: ${botMessages[botIndex]}`]);

                if (botIndex === 6) {
                    setTimeout(() => {
                    setMessages(prevMessages => [...prevMessages, `AutoCare Bot: ${botMessages[botIndex+1]}`])
                    setBotIndex(prevIndex => prevIndex +2);
                    }, 2000);
                } else {
                    setBotIndex(prevIndex => prevIndex+1);
                }
            }, 500);
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
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div>
            <Header/>
            <div style={{height: '90vh'}}>
                <div style={{ height: '90%', overflowY: 'scroll', border: '1px solid #ddd', padding: '10px' }}>
                    {messages.map((msg, index) => (
                        <ChatMessage
                            key={index}
                            text={formatMessage(msg)}
                            isUserMessage={msg.startsWith('Você')}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <div style={{ display:'flex' }}>
                        <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{ width: '80%' }}
                        placeholder="Digite sua mensagem"
                        />
                        <div onClick={handleSendMessage} style={{ width: '17%' }}>
                            <img src="/img/send-msg.svg" alt="Send Message Button" style={{width: '100%'}} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};