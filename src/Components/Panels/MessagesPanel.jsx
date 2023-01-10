import { useState } from "react";
import SearchBar from "../SearchBar";
import UserButton from "../UserButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const MessagesPanel = ({openChat}) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div id="messagesMenu">
            <h1>Messages</h1>
            <SearchBar setSearchTerm={setSearchTerm} />
            {searchTerm}
            <UserButton avatarColor="grey" avatarContent={<FontAwesomeIcon icon={solid('users')} />} title="Global chat" subtext="Chat with all users" selected hoverable onClick={() => {openChat('global')}} />
            <hr className="seperator" />
            <div id="messagesList">
                <p className="emptyMessage"><i>Click on a user to start a chat</i></p>
            </div>
        </div>
    );
};

export default MessagesPanel;