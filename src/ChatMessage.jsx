const ChatMessage = ({ message }) => {
    return (
        // TODO: All needs to be made dynamic + only names if global chat, etc.
        <div className="leftMsg">
            <div className="avatar red small">randomName</div>
            <div className="msgBody">
                <div className="msgName">randomName</div>
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