const InfoBar = ({leftIcon, rightIcon, leftOnClick, rightOnClick, title, avatarColor, avatarContent, margin}) => {
    return (
        <div id="infoBar" className={margin ? "withMargin" : undefined}>
            <div onClick={leftOnClick}>
                {leftIcon}
            </div>
            <div className="title">
                {avatarContent && <div className={`avatar ${avatarColor} small`}>{avatarContent}</div>}
                <p className={`bold ${!avatarContent && "noMargin"}`}>{title}</p>
            </div>
            <div onClick={rightOnClick}>
                {rightIcon}
            </div>
        </div>
    );
};

export default InfoBar;