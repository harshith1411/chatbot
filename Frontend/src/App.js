import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import botImage from './bot_image.png';
import trashIcon from './trashIcon.png';
import whiteSend from './whiteSend.png';
import silverLogo from './silverLogo.png';

function App() {

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messageEndRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState('MutualFunds');

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  const handleMessageSubmit = async () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        text: inputValue,
        sender: 'user',
      };

      setMessages([...messages, newMessage]);
      setInputValue('');

      try {
        const response = await axios.post('http://localhost:8000/chat', { userMessage: newMessage.text, database: selectedOption});
        console.log('Response:', response.data);

        const chatbotResponse = response.data.reply;

        const newChatbotMessage = {
          text: chatbotResponse,
          sender: 'chatbot',
        };

        setMessages((prevMessages) => [...prevMessages, newChatbotMessage]);

      }
      catch (error) {
        console.error('Error:', error.response);
      }

    }
  };

  function handleClearChat() {
    setMessages([]);
  };

  function handleKey(event) {
    if(event.key === 'Enter') {
      handleMessageSubmit();
    };
  };

  function handleSelectChange(event) {
    setSelectedOption(event.target.value);
  };



  return (
    <div className="App">
      <div className='headerHolder'>
        <header className='appHeader'>
          <div className='logoholder'><img src={silverLogo} alt="Silver Touch Technologies" className='silverLogo' /></div>
          <div className='heading'><h1>Intelligent Query ChatBot</h1></div>
          <div className='logoholder'>
            <select value={selectedOption} onChange={handleSelectChange} className='dropdown' >
              <option value="MutualFunds">Mutual Funds</option>
              <option value="companyData">World Companies</option>
            </select>
          </div>
        </header>
      </div>
      


      <section className='chatbox'>
        <div className='chatlog'>
          
            <div className="chatbot-window">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${message.sender === 'user' ? 'user' : 'chatbot'}`}
                >
                  <div className='messagetext'>
                    <span>
                      {message.sender === 'chatbot' && <img src={botImage} alt="logo" className='silverlogo'/>}
                    </span>
                    
                    <div className={`${message.sender === 'user' ? 'usertText' : 'chatbotText'}`}>
                      {message.text}
                    </div>
                  </div>

                </div>
              ))}

              <div ref={messageEndRef}/>

            </div>
          
        </div>

        <div className='chatinputholder'>
          <div className='inputandbutton'>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Start typing..."
              className='inputbox'
              onKeyDown={handleKey}
            />
            <button onClick={handleMessageSubmit} className='sendbutton'>
              <img src={whiteSend} alt="send" className='sendIcon' />
            </button>
          </div>

          <div className='clearButtonholder'><button onClick={handleClearChat} className='clearButton'>
                <img src={trashIcon} alt="clear chat" className='clearIcon'/>
          </button></div>

        </div>
      </section>

    </div>
  )
};

export default App;
