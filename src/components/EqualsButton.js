function OperatorButton( {id, label, sendDataToParent, className} ) {
    
    const handleMouseClick = (e) => {
        sendDataToParent(e);
    }

    return (
        <button 
            onClick={handleMouseClick} 
            id={id} 
            className={className}
            label={label}
        >
            {label}
        </button>
    );
}

export default OperatorButton;