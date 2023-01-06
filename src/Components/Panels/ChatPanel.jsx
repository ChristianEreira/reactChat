import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const ChatPanel = () => {
    const [currentCharacters, setCurrentCharacters] = useState(0);

    return (
        <div id="chatPanel">
            {/* TODO: infoBar needs to be here */}
            <div id="chatBottom">
                <div id="messages">
                    <div className="emptyMessage"><i>There are no messages yet. Say hi!</i></div>
                    <p id="charCount">{currentCharacters}/300</p>
                    {/* TODO: onSubmit */}
                    <form className="centerX" id="msgInput" onSubmit={() => {}}>
                        <textarea name="msg" id="msgBox" placeholder="Type a message..." maxlength="300" onInput={(e) => {setCurrentCharacters(e.target.value.length)}}></textarea>
                        <button type="submit" id="sendBtn"><FontAwesomeIcon icon={solid('paper-plane')} /></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatPanel;