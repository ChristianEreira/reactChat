const ChatMessage = ({ message, nick, color, own }) => {
    return (
        <div className={own ? "rightMsg" : "leftMsg"}>
            <div className={`avatar ${color} small`}>{nick}</div>
            <div className="msgBody">
                <div className="msgName">{nick}</div>
                {message.msg.map((msg, i) => {
                    return (
                        <div className="msgText" key={i}>{msg}</div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatMessage;