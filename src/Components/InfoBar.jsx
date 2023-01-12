const InfoBar = ({leftIcon, rightIcon, leftOnClick, rightOnClick, title, avatarColor, avatarContent}) => {
    return (
        <div id="infoBar">
            <div>
                {leftIcon}
            </div>
            <div className="title">
                <div className={`avatar ${avatarColor} small`}>{avatarContent}</div>
                <p className="bold">{title}</p>
            </div>
            <div>
                {rightIcon}
            </div>
        </div>
    );
};

export default InfoBar;