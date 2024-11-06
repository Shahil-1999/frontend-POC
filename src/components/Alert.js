import React from 'react'

function Alert(props) {

    return (
        <>
            {props?.alert?.type ? <div className={`alert alert-${props.alert.type} alert-dismissible fade show my-0`} role="alert">
                <strong>{props.alert.type}</strong> : {props.alert.msg}
            </div>
            : null }
        </>
    )
}

export default Alert
