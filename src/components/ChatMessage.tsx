import React from "react";
import styled from "styled-components";

interface ChatMessageProps {
    text: React.ReactNode;
    isUserMessage: boolean;
}

interface MessageProps {
    isUserMessage: boolean;
}
  
const Mensagens = styled.div<MessageProps>`
    text-align: ${(props) => (props.isUserMessage ? 'right' : 'left')};
    margin: 10px;`

const Mensagem = styled.div<MessageProps>`
    display: inline-block;
    padding: 10px;
    border-radius: 10px;
    background: ${(props) => (props.isUserMessage ? '#77ccfe' : '#e0e0e0')};
    max-width: 80%;
    word-wrap: break-word; // Adiciona quebra de linha automática
    overflow-wrap: break-word;`

const ChatMessage: React.FC<ChatMessageProps> = ({ text, isUserMessage }) => {
    return (
        <Mensagens isUserMessage={isUserMessage}>
            <Mensagem isUserMessage={isUserMessage}>
                {text}
            </Mensagem>
        </Mensagens>
    );
};

export default ChatMessage;