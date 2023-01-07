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

  useEffect(() => {
    socket.onAny((eventName, ...args) => {
      console.log(eventName, args);
    });

    socket.on("connect", () => {
      console.log("Connected to server");
      setPopupsShown(popups => popups.filter(x => (x !== "connecting" && x !== "disconnected")));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setPopupsShown(popups => [...popups, "disconnected"]);
    });

    socket.on("set nickname", (id, newNick) => {
      let toSet = id in nicks ? { ...nicks[id], nick: newNick } : { nick: newNick};
      setNicks(nicks => ({ ...nicks, [id]: toSet }));

      if (id === socket.id) {
        setPopupsShown(popups => popups.filter(x => (x !== "nickname")));
      }
    });
  }, [nicks]);

  return (
    <div className="App">
      <div className="center" id="content">
        <div className="centerX">

          <div className="box" id="usersBox">
            <UserPanel />
          </div>

          <div className="centerY">
            <div className="box" id="optionsBox">
              <div className="spaceX">
                {/* TODO: Replace ... with username */}
                {/* TODO: Open nick popup on click */}
                <UserButton avatarColor="yellow" avatarContent="..." title="Nickname:" subtext={<>{nicks[socket.id] ? nicks[socket.id].nick : "..."} <span className="imitateLink">(change)</span></>} />

                {/* TODO: Replace selected */}
                <AvatarColourPicker selected="yellow" />
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
        <NicknamePicker socket={socket} closePopup={() => { setPopupsShown(popups => popups.filter(x => (x !== "nickname"))) }} />
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
