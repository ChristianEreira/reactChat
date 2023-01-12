import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const InfoBar = (leftIcon, rightIcon, leftOnClick, rightOnClick, title, avatar) => {
    return (
        <div id="infoBar">
            <div>
                <FontAwesomeIcon icon={solid("chevron-left")} />
            </div>
            <div className="title">
                <div className="avatar red small">Test</div>
                <p className="bold">{title}</p>
            </div>
            <div>
                <FontAwesomeIcon icon={solid("trash")} />
            </div>
        </div>
    );
};

export default InfoBar;