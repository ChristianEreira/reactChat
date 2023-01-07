import { useEffect, useState } from 'react';
import { sanitize } from '../helpers';

const NicknamePicker = ({ closePopup, socket }) => {
    const [nickError, setNickError] = useState(null);
    const [nickInput, setNickInput] = useState('');

    const checkNick = e => {
        let nick = e.target.value;
        if (nick.length > 20) {
            setNickError("Nickname must be less than 20 characters");
        } else if (nick === "") {
            setNickError("Nickname cannot be blank");
        } else if (!nick.match(/^[0-9a-z]+$/i)) {
            setNickError("Nickname must only use a-z and 0-9");
        } else {
            setNickError(null);
            setNickInput(nick);
        }
    };

    const changeNickname = (e) => {
        e.preventDefault();
        socket.emit('set nickname', sanitize(nickInput));
        return false;
    };

    useEffect(() => {
        socket.on("nickname error", (error) => {
            setNickError(error);
        });
    }, [socket]);

    return (
        <form>
            <input type="text" id="nickInput" className={nickError ? "inputError" : undefined} placeholder="Nickname" onInput={checkNick} />
            <p id="nickError" className={!nickError ? "invisible" : undefined}>{nickError}</p>
            <button type="submit" className="button primary" onClick={changeNickname}>Confirm</button>
            <button type="button" className="button secondary" onClick={closePopup}>Cancel</button>
        </form>
    );
};

export default NicknamePicker;