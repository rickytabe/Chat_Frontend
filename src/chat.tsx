import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './chat.css';

interface Message {
  user: string;
  message: string;
  timestamp: string;
}

const socket = io('https://chat-backend-vorb.onrender.com'); // Change this to your server URL

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch initial chat history
    socket.on('init', (msgs: Message[]) => {
      setMessages(msgs);
    });

    // Listen for new messages
    socket.on('chatMessage', (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('init');
      socket.off('chatMessage');
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && message) {
      const newMessage = { user, message, timestamp: new Date().toISOString() };
      socket.emit('chatMessage', newMessage);
      setMessage('');
    }
  };

  return (
    <div id="chat">
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.user}:</strong> {msg.message} <em>{new Date(msg.timestamp).toLocaleTimeString()}</em>
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="User"
          required
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
