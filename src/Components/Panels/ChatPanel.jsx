import { useState } from "react";
import ChatMessage from "../ChatMessage";
import InfoBar from "../InfoBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { sanitize } from "../../helpers";

const ChatPanel = ({ nicks, activeChat, socket }) => {
    const [currentMessage, setCurrentMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let message = currentMessage.trim();

        if (message !== "") {
            socket.emit("chat message", sanitize(message), activeChat);

            // TODO: Call add message function
            setCurrentMessage("");
        }
    };

    return (
        <div id="chatPanel">
            {activeChat !== "global" && <InfoBar title={nicks[activeChat].nick} avatarColor={nicks[activeChat].color} avatarContent={nicks[activeChat].nick} rightIcon=<FontAwesomeIcon icon={solid("trash")} /> rightOnClick={() => { alert(activeChat) }} />}
            <div id="chatBottom">
                <div id="messages">
                    <ChatMessage message={{ msg: ["This is the first message!", "and this is the sencond"] }} />
                    <p className="emptyMessage"><i>There are no messages yet. Say hi!</i></p>
                </div>
                <p id="charCount">{currentMessage.trim().length}/300</p>
                <form className="centerX" id="msgInput" onSubmit={handleSubmit}>
                    <textarea name="msg" id="msgBox" placeholder="Type a message..." maxLength="300" value={currentMessage} onInput={(e) => { setCurrentMessage(e.target.value) }}></textarea>
                    <button type="submit" id="sendBtn"><FontAwesomeIcon icon={solid('paper-plane')} /></button>
                </form>
            </div>
        </div>
    );
};

export default ChatPanel;