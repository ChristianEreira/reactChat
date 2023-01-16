import { useState } from "react";
import ChatMessage from "../ChatMessage";
import InfoBar from "../InfoBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { sanitize } from "../../helpers";

const ChatPanel = ({ getUserInfo, activeChat, socket, messages, addMessage }) => {
    const [currentMessage, setCurrentMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let message = currentMessage.trim();

        if (message !== "") {
            socket.emit("chat message", sanitize(message), activeChat);

            addMessage(activeChat, socket.id, message);
            setCurrentMessage("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
            return false;
        }
    };

    let messagesList = messages[activeChat].length === 0 ? <p className="emptyMessage"><i>There are no messages yet. Say hi!</i></p> : messages[activeChat].map((message, index) => {
        let user = getUserInfo(message.id);
        return <ChatMessage nick={user.nick} color={user.color} message={message} own={message.id === socket.id} key={index} />;
    });

    let chatUser = getUserInfo(activeChat);
    return (
        <div id="chatPanel">
            {activeChat !== "global" && <InfoBar title={chatUser.nick} avatarColor={chatUser.color} avatarContent={chatUser.nick} rightIcon=<FontAwesomeIcon icon={solid("trash")} /> rightOnClick={() => { alert(activeChat) }} />}
            <div id="chatBottom">
                <div id="messages">
                    {messagesList}
                </div>
                <p id="charCount" className={currentMessage.trim().length >= 300 ? "full" : undefined}>{currentMessage.trim().length}/300</p>
                <form className="centerX" id="msgInput" onSubmit={handleSubmit}>
                    <textarea name="msg" id="msgBox" placeholder="Type a message..." maxLength="300" value={currentMessage} disabled={chatUser.disconnected} onKeyDown={handleKeyDown} onInput={(e) => { setCurrentMessage(e.target.value) }}></textarea>
                    <button type="submit" id="sendBtn"><FontAwesomeIcon icon={solid('paper-plane')} /></button>
                </form>
            </div>
        </div>
    );
};

export default ChatPanel;