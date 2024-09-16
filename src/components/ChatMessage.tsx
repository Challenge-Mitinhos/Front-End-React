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
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;`

const Mensagem = styled.div<MessageProps>`
    display: inline-block;
    padding: 10px;
    border-radius: 10px;
    font-size: 16px;
    background: ${(props) => (props.isUserMessage ? '#77ccfe' : '#ffffff')};
    max-width: 80%;
    word-wrap: break-word;
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