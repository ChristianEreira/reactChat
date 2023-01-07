const AvatarColourPicker = ({selected, socket}) => {
    const colours = ["red", "yellow", "green", "cyan", "blue"];

    return (
        <div className="userButton noIcon">
            <div className="userDesc">
                <p><b>Avatar colour:</b></p>
                <div className="colorSelectList">
                    {colours.map((colour) => {
                        return (
                            <div className={`colorSelect ${colour} ${colour === selected && "selected"}`} onClick={() => {socket.emit('set color', colour)}} key={colour}></div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AvatarColourPicker;