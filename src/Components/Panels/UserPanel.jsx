import React from "react";
import { useState } from 'react';
import SearchBar from '../SearchBar';

const UserPanel = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            {/* TODO: Make ... dynamic */}
            <h1>Online Users <span>(...)</span></h1>
            <SearchBar setSearchTerm={setSearchTerm} />
            <div className="usersList">{searchTerm === '' ?
                (<p className="emptyMessage">
                    <i>There are no online users</i>
                </p>) : (
                    <>
                        {/* TODO: Display filtered list */}
                        {searchTerm}
                    </>
                )}</div>
        </>
    );
};

export default UserPanel;