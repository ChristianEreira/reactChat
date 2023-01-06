import './App.css';
// import { useState } from 'react';
// import SearchBar from './Components/SearchBar';
import AvatarColourPicker from './Components/AvatarColourPicker';
import UserButton from './Components/UserButton';
import UserPanel from './Components/Panels/UserPanel';
import MessagesPanel from './Components/Panels/MessagesPanel';
import ChatPanel from './Components/Panels/ChatPanel';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const App = () => {
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
                <div className="userButton noIcon">
                  {/* TODO: Replace ... with username */}
                  <div className="avatar yellow">...</div>
                  <div className="userDesc">
                    <p><b>Nickname:</b></p>
                    {/* TODO: Replace ... with username */}
                    {/* TODO: Open nick popup on click */}
                    <p>... <span className="imitateLink">(change)</span></p>
                  </div>
                </div>

                {/* TODO: Replace selected */}
                <AvatarColourPicker selected="yellow"/>
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
    </div>
  );
};

export default App;
