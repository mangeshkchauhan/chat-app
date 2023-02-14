import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';
import { store } from './store';
import { Provider } from 'react-redux';
import { Header } from './stories/Header';

const socket = io('https://chat-app-uptut.onrender.com');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  const onLogin = () => {};
  const onLogout = () => {};
  const onCreateAccount = () => {};

  return (
    <Provider store={store}>
      <Header
        user={{ name: username }}
        onLogin={onLogin}
        onLogout={onLogout}
        onCreateAccount={onCreateAccount}
      />
      <div className='App'>
        {!showChat ? (
          <div className='joinChatContainer'>
            <h3>Join A Chat</h3>
            <input
              type='text'
              placeholder='John...'
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type='text'
              placeholder='Room ID...'
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </Provider>
  );
}

export default App;
