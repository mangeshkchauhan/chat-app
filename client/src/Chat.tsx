import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from './store';

interface ChatProps {
  socket: any;
  username: any;
  room: any;
}
function Chat({ socket, username, room }: ChatProps) {
  const dispatch = useDispatch();
  const messages = useSelector((state: any) => state.chats.messages);
  const [currentMessage, setCurrentMessage] = useState('');

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      dispatch(addMessage(messageData));
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data: any) => {
      dispatch(addMessage(data));
    });
  }, [socket]);

  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
          {messages.map((messageContent: any, i: number) => {
            return (
              <div
                className='message'
                id={username === messageContent.author ? 'you' : 'other'}
                key={i}
              >
                <div>
                  <div className='message-content'>
                    <p>{messageContent.message}</p>
                  </div>
                  <div className='message-meta'>
                    <p id='time'>{messageContent.time}</p>
                    <p id='author'>{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input
          type='text'
          value={currentMessage}
          placeholder='Hey...'
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
