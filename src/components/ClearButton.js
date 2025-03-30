function ClearButton( {id, sendDataToParent, className, label} ) {
    
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

export default ClearButton;