import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import UserButton from '../UserButton';

const UserPanel = ({ nicks, socket, openChat }) => {
    const [searchTerm, setSearchTerm] = useState('');

    let usersList;
    if (Object.keys(nicks).length <= 1) {
        usersList = <p className="emptyMessage"><i>There are no online users</i></p>
    } else {
        let filteredUsers = Object.entries(nicks).filter(([id, user]) => id !== socket.id && user.nick.toLowerCase().includes(searchTerm.toLowerCase()));
        usersList = filteredUsers.map(([id, user], i) => {
            if (id !== socket.id && user.nick.toLowerCase().includes(searchTerm.toLowerCase())) {
                return (
                    <React.Fragment key={id}>
                        {i !== 0 && <hr className="seperator"></hr>}
                        <UserButton avatarColor={user.color} avatarContent={user.nick[0]} subtext={user.nick} icon userid={id} onClick={() => { openChat(id) }} />
                    </React.Fragment>
                )
            }
            return null;
        })
    }

    return (
        <>
            <h1>Online Users <span>({nicks[socket.id] ? Object.entries(nicks).length - 1 : "..."})</span></h1>
            <SearchBar setSearchTerm={setSearchTerm} />
            <div id="usersList">
                {usersList}
            </div>
        </>
    );
};

export default UserPanel;