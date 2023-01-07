import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const UserButton = ({ userid, title, subtext, avatarColor, avatarContent, selected, hoverable, icon }) => {
    if (userid) {
        // TODO: Set variables based on userid
    }
    return (
        <div className={`userButton ${!icon && "noIcon"} ${hoverable && "hoverable"} ${selected && "selected"}`}>
            <div className={`avatar ${avatarColor}`}>
                {avatarContent}
            </div>
            <div className="userDesc">
                <p><b>{title}</b></p>
                <p>{subtext}</p>
            </div>
            {icon && <FontAwesomeIcon icon={solid("comment-alt")} />}
        </div>
    );
};

export default UserButton;