import { useState } from 'react';

const NicknamePicker = ({ closePopup }) => {
    const [nickError, setNickError] = useState(null);

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
        }
    };

    return (
        <form>
            <input type="text" id="nickInput" className={nickError && "inputError"} placeholder="Nickname" onInput={checkNick} />
            <p id="nickError" className={!nickError && "invisible"}>{nickError}</p>
            <button type="submit" className="button primary">Confirm</button>
            <button type="button" className="button secondary" onClick={closePopup}>Cancel</button>
        </form>
    );
};

export default NicknamePicker;