import { useState } from "react";
import SearchBar from "../SearchBar";
import UserButton from "../UserButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const MessagesPanel = ({openChat, messages, getUserInfo, activeChat}) => {
    const [searchTerm, setSearchTerm] = useState('');

    let messagesList;
    if (Object.keys(messages).length > 1) {
        messagesList = Object.entries(messages).filter(([id, msgs]) => id !== "global").map(([id, msgs]) => {
            // TODO: Display last message
            let user = getUserInfo(id);
            return <UserButton avatarColor={user.color} avatarContent={user.nick} title={user.nick} subtext="Chat with all users" selected={id === activeChat} hoverable onClick={() => {openChat(id)}} key={id} />;
        });
    } else {
        messagesList = <p className="emptyMessage"><i>Click on a user to start a chat</i></p>;
    }

    return (
        <div id="messagesMenu">
            <h1>Messages</h1>
            <SearchBar setSearchTerm={setSearchTerm} />
            {searchTerm}
            <UserButton avatarColor="grey" avatarContent={<FontAwesomeIcon icon={solid('users')} />} title="Global chat" subtext="Chat with all users" selected={activeChat === "global"} hoverable onClick={() => {openChat('global')}} />
            <hr className="seperator" />
            <div id="messagesList">
                {messagesList}
            </div>
        </div>
    );
};

export default MessagesPanel;