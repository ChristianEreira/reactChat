import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const UserButton = ({ title, subtext, avatarColor, avatarContent, selected, hoverable, icon, onClick, unread }) => {
    return (
        <div className={`userButton ${!icon && "noIcon"} ${hoverable && "hoverable"} ${selected && "selected"}`} onClick={onClick}>
            <div className={`avatar ${avatarColor}`}>
                {avatarContent}
            </div>
            <div className="userDesc">
                <p><b>{title}</b></p>
                <p className={unread ? "bold" : undefined}>{subtext}</p>
            </div>
            {icon && <FontAwesomeIcon icon={solid("comment-alt")} />}
        </div>
    );
};

export default UserButton;