const InfoBar = ({leftIcon, rightIcon, leftOnClick, rightOnClick, title, avatarColor, avatarContent}) => {
    return (
        <div id="infoBar">
            <div onClick={leftOnClick}>
                {leftIcon}
            </div>
            <div className="title">
                <div className={`avatar ${avatarColor} small`}>{avatarContent}</div>
                <p className="bold">{title}</p>
            </div>
            <div onClick={rightOnClick}>
                {rightIcon}
            </div>
        </div>
    );
};

export default InfoBar;