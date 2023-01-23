import { useState, useContext } from "react";
import { AppSizeContext } from "../../App";
import ChatMessage from "../ChatMessage";
import InfoBar from "../InfoBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { sanitize } from "../../helpers";

const ChatPanel = ({ getUserInfo, activeChat, socket, messages, addMessage, deleteChat, handleBack }) => {
    const appSize = useContext(AppSizeContext);
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

    let currentMessages = [...messages[activeChat]];
    let messagesList = currentMessages.length === 0 ? <p className="emptyMessage"><i>There are no messages yet. Say hi!</i></p> : currentMessages.reverse().map((message, index) => {
        let user = getUserInfo(message.id);
        return <ChatMessage nick={user.nick} color={user.color} message={message} own={message.id === socket.id} key={index} />;
    });

    let chatUser = getUserInfo(activeChat);
    return (
        <div id="chatPanel">
            {(activeChat !== "global" || appSize === "small") && <InfoBar title={chatUser.nick} avatarColor={chatUser.color} avatarContent={activeChat !== "global" ? chatUser.nick : <FontAwesomeIcon icon={solid("users")} />} rightIcon={activeChat !== "global" && <FontAwesomeIcon icon={solid("trash")} />} rightOnClick={() => { deleteChat(activeChat) }} leftIcon={appSize === "small" ? <FontAwesomeIcon icon={solid("chevron-left")} /> : undefined} leftOnClick={handleBack} />}
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