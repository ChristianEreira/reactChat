const Popup = ({ children, isOpen, title }) => {
    return (
        <div className={`center popupBack ${!isOpen && "hidden"}`}>
            <div className="box">
                <h1>{title}</h1>
                {children}
            </div>
        </div>
    );
};

export default Popup;