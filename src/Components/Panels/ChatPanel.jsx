import { useState } from "react";
import ChatMessage from "../../ChatMessage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const ChatPanel = () => {
    const [currentCharacters, setCurrentCharacters] = useState(0);

    return (
        <div id="chatPanel">
            {/* TODO: infoBar needs to be here */}
            <div id="chatBottom">
                <div id="messages">
                    <ChatMessage message={{msg: ["This is the first message!", "and this is the sencond"]}} />
                    <p className="emptyMessage"><i>There are no messages yet. Say hi!</i></p>
                </div>
                <p id="charCount">{currentCharacters}/300</p>
                {/* TODO: onSubmit */}
                <form className="centerX" id="msgInput" onSubmit={() => { }}>
                    <textarea name="msg" id="msgBox" placeholder="Type a message..." maxLength="300" onInput={(e) => { setCurrentCharacters(e.target.value.length) }}></textarea>
                    <button type="submit" id="sendBtn"><FontAwesomeIcon icon={solid('paper-plane')} /></button>
                </form>
            </div>
        </div>
    );
};

export default ChatPanel;