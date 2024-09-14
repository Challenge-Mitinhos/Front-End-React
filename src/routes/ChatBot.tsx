import React, { useState } from 'react';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, `Você: ${input}`]);
      setInput('');
      
      // Simulação de resposta automática
      setTimeout(() => {
        setMessages([...messages, `Você: ${input}`, 'Bot: Resposta pré-escrita']);
      }, 500);
    }
  };

  return (
    <div style={{ width: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '80%' }}
        />
        <button onClick={handleSendMessage} style={{ width: '18%' }}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;