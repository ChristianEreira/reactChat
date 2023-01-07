import { useState } from 'react';
import SearchBar from '../SearchBar';
import UserButton from '../UserButton';

const UserPanel = ({ nicks, socket }) => {
    const [searchTerm, setSearchTerm] = useState('');

    let usersList;
    if (Object.keys(nicks).length === 0) {
        usersList = <p className="emptyMessage"><i>There are no online users</i></p>
    } else if (searchTerm === '') {
        usersList = Object.entries(nicks).map(([id, user]) => {
            return (
                <UserButton avatarColor={user.color} avatarContent={user.nick[0]} title={user.nick} key={id} />
            )
        })
    } else {
        usersList = <p>{searchTerm}</p>
    }

    return (
        <>
            {/* TODO: Make ... dynamic */}
            <h1>Online Users <span>({nicks[socket.id] ? Object.entries(nicks).length - 1 : "..."})</span></h1>
            <SearchBar setSearchTerm={setSearchTerm} />
            <div className="usersList">
                {usersList}
            </div>
        </>
    );
};

export default UserPanel;