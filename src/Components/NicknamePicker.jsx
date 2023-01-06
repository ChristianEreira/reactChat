const NicknamePicker = ({closePopup}) => {
    return (
        <form>
            <input type="text" id="nickInput" placeholder="Nickname" />
            <p id="nickError" className="invisible">Error</p>
            <button type="submit" className="button primary">Confirm</button>
            <button type="button" className="button secondary" onClick={closePopup}>Cancel</button>
        </form>
    );
};

export default NicknamePicker;