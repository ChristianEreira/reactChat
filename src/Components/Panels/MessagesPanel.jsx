import { useState, useContext } from "react";
import { AppSizeContext } from "../../App";
import SearchBar from "../SearchBar";
import UserButton from "../UserButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const MessagesPanel = ({ openChat, messages, getUserInfo, activeChat, unreadChats, handleNewChatClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const appSize = useContext(AppSizeContext);

    let messagesList;
    if (Object.keys(messages).length > 1) {
        messagesList = Object.entries(messages).filter(([id, msgs]) => {
            if (searchTerm === '') {
                return id !== "global";
            } else {
                return id !== "global" && !getUserInfo(id).disconnected && getUserInfo(id).nick.toLowerCase().includes(searchTerm.toLowerCase());
            }
        }).map(([id, msgs]) => {
            let user = getUserInfo(id);
            return <UserButton avatarColor={user.color} avatarContent={user.nick} title={user.nick} subtext={messages[id].length > 0 ? messages[id][messages[id].length - 1].msg[messages[id][messages[id].length - 1].msg.length - 1] : undefined} unread={unreadChats.has(id)} selected={id === activeChat} hoverable onClick={() => { openChat(id) }} key={id} />;
        });
    } else {
        messagesList = <p className="emptyMessage"><i>Click on a user to start a chat</i></p>;
    }

    return (
        <div id="messagesMenu">
            <h1>Messages</h1>
            {appSize !== "large" && <div className="button primary full" onClick={handleNewChatClick}>Message a new user</div>}
            <SearchBar setSearchTerm={setSearchTerm} />
            <UserButton avatarColor="grey" avatarContent={<FontAwesomeIcon icon={solid('users')} />} title="Global chat" subtext="Chat with all users" unread={unreadChats.has("global")} selected={activeChat === "global"} hoverable onClick={() => { openChat('global') }} />
            <hr className="seperator" />
            <div id="messagesList">
                {messagesList}
            </div>
        </div>
    );
};

export default MessagesPanel;