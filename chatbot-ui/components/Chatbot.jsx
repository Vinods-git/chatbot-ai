"use client"
import { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { user: true, content: inputValue },
    ]);
    setInputValue('');
    fetch('/api/chatbot', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ message: inputValue }),
})
  .then((response) => response.json())
  .then((data) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: false, content: data.reply },
    ]);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    // Send the user message to the backend for processing
    let url = "http://127.0.0.1:8000"
    console.log(url)
    fetch(url + '/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { user: false, content: data.reply },
          ]);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  };

  return (
    <div className="chatbot-container">
      {/* <div className="chatbot-conversation">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user ? 'user' : 'bot'}`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit} className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form> */}
      <header>
        <h2>
          Chatbot
        </h2>
      </header>
    </div>
  );
};

export default Chatbot;
