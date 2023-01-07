import './App.css';
import { useState, useEffect } from 'react';
import AvatarColourPicker from './Components/AvatarColourPicker';
import UserButton from './Components/UserButton';
import NicknamePicker from './Components/NicknamePicker';
import Popup from './Components/Popup';
import UserPanel from './Components/Panels/UserPanel';
import MessagesPanel from './Components/Panels/MessagesPanel';
import ChatPanel from './Components/Panels/ChatPanel';
import io from 'socket.io-client';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const socket = io("http://localhost:8080", { transports: ['websocket'], upgrade: false });

const App = () => {
  const [popupsShown, setPopupsShown] = useState(["connecting", "nickname"]);
  const [nicks, setNicks] = useState({});

  const openPopup = (popup) => {
    setPopupsShown(popups => [...popups, popup]);
  };

  const closePopup = (popup) => {
    setPopupsShown(popups => popups.filter(x => (x !== popup)));
  };

  useEffect(() => {
    socket.onAny((eventName, ...args) => {
      console.log(eventName, args);
    });

    socket.on("connect", () => {
      console.log("Connected to server");
      closePopup("connecting");
      closePopup("disconnected");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      openPopup("disconnected");
    });

    socket.on("set nickname", (id, newNick) => {
      setNicks(nicks => ({ ...nicks, [id]: id in nicks ? { ...nicks[id], nick: newNick } : { nick: newNick } }));

      if (id === socket.id) {
        closePopup("nickname");
      }
    });

    socket.on("set color", (id, newColor) => {
      setNicks(nicks => ({ ...nicks, [id]: id in nicks ? { ...nicks[id], color: newColor } : { color: newColor } }));
    });

    socket.on("set nickname list", (nickList) => {
      setNicks(nickList);
    });
  }, [nicks]);

  return (
    <div className="App">
      <div className="center" id="content">
        <div className="centerX">

          <div className="box" id="usersBox">
            <UserPanel nicks={nicks} socket={socket} />
          </div>

          <div className="centerY">
            <div className="box" id="optionsBox">
              <div className="spaceX">
                <UserButton avatarColor={nicks[socket.id] ? nicks[socket.id].color : "red"} avatarContent={nicks[socket.id] ? nicks[socket.id].nick : "..."} title="Nickname:" subtext={<>{nicks[socket.id] ? nicks[socket.id].nick : "..."} <span className="imitateLink" onClick={() => { openPopup("nickname") }}>(change)</span></>} />
                <AvatarColourPicker socket={socket} selected={nicks[socket.id] ? nicks[socket.id].color : "red"} />
              </div>
            </div>

            <div className="box" id="messagesBox">
              <div className="centerX">
                <MessagesPanel />
                <ChatPanel />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popup isOpen={popupsShown.includes("nickname")} title="Choose a Nickname" >
        <NicknamePicker socket={socket} nicks={nicks} closePopup={() => { closePopup("nickname") }} />
      </Popup>
      <Popup isOpen={popupsShown.includes("connecting")} title="Connecting..." >
        <p>Connecting to the server...</p>
      </Popup>
      <Popup isOpen={popupsShown.includes("disconnected")} title="Disconnected" >
        <p>Lost connection to server. Attempting to reconnect...</p>
      </Popup>
    </div>
  );
};

export default App;
