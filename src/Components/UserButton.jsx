import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const UserButton = ({ userid, title, subtext, avatarColor, avatarContent, selected }) => {
    // TODO: Add icon support for 'online users' chat button
    if (userid) {
        // TODO: Set variables based on userid
    }
    return (
        <div className={`userButton noIcon hoverable ${selected && "selected"}`}>
            <div className={`avatar ${avatarColor}`}>
                {avatarContent}
            </div>
            <div className="userDesc">
                <p><b>{title}</b></p>
                <p>{subtext}</p>
            </div>
        </div>
    );
};

export default UserButton;