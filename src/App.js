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
  const [messages, setMessages] = useState({ global: [] });
  const [activeChat, setActiveChat] = useState("global");
  const [unreadChats, setUnreadChats] = useState(new Set());
  const [timedOutCount, setTimedOutCount] = useState(0);

  const openPopup = (popup) => {
    setPopupsShown(popups => [...popups, popup]);
  };

  const closePopup = (popup) => {
    setPopupsShown(popups => popups.filter(x => (x !== popup)));
  };

  const openChat = (chat) => {
    if (!(chat in messages)) {
      setMessages(messages => ({ ...messages, [chat]: [] }));
    }

    setUnreadChats(unreadChats => new Set([...unreadChats].filter(x => (x !== chat))));

    setActiveChat(chat);
  };

  const addMessage = (chat, id, msg) => {
    setMessages(messages => {
      let newMessages = { ...messages };

      if (!(chat in newMessages)) {
        newMessages[chat] = [];
      }

      // Add to messages array if already exists
      if (newMessages[chat].length > 0 && newMessages[chat][newMessages[chat].length - 1].id === id) {
        newMessages[chat][newMessages[chat].length - 1].msg.push(msg);
      } else {
        newMessages[chat].push({ id: id, msg: [msg] });
      }

      return newMessages;
    });
  };
  
  const getUserInfo = (id) => {
    return {
      nick: id in nicks ? nicks[id].nick : <s>Disconnected</s>,
      color: id in nicks ? nicks[id].color : "grey",
      disconnected: !(id in nicks)
    };
  };

  useEffect(() => {
    socket.onAny((eventName, ...args) => {
      console.log(eventName, args);
    });

    socket.on("connect", () => {
      console.log("Connected to server");
      closePopup("connecting");
      closePopup("disconnected");
      openPopup("nickname");
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

    socket.on("user disconnect", (id) => {
      setNicks(nicks => {
        let newNicks = { ...nicks };
        delete newNicks[id];
        return newNicks;
      });
    });

    socket.on("chat message", (id, msg, target) => {
      let chat = target === "global" ? "global" : id;
      addMessage(chat, id, msg);

      setUnreadChats(unreadChats => new Set([...unreadChats, chat]));
    });

    socket.on("timed out", () => {
      setTimedOutCount(10);
      openPopup("timed out");
    });
  }, []);

  useEffect(() => {
    if (timedOutCount > 0) {
      setTimeout(() => {
        setTimedOutCount(timedOutCount => timedOutCount - 1);
      }, 1000);
    } else {
      closePopup("timed out");
    }
  }, [timedOutCount]);

  return (
    <div className="App">
      <div className="center" id="content">
        <div className="centerX">

          <div className="box" id="usersBox">
            <UserPanel nicks={nicks} socket={socket} openChat={openChat} />
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
                <MessagesPanel openChat={openChat} messages={messages} getUserInfo={getUserInfo} activeChat={activeChat} />
                <ChatPanel getUserInfo={getUserInfo} activeChat={activeChat} socket={socket} messages={messages} addMessage={addMessage} />
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
      <Popup isOpen={popupsShown.includes("timed out")} title="Timed Out" >
        <p>Please stop typing so fast!</p>
        <p>You can rejoin the chat in {timedOutCount} seconds.</p>
      </Popup>
    </div>
  );
};

export default App;
