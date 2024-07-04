import React from 'react'

function Button(props) {
    const { type = "", className = "", onClickHandler = null, buttonText = "" } = props
    return (
        <>
            <button type={type} className={className} onClick={() => onClickHandler}>{buttonText}</button>
        </>
    )
}

export default Button
