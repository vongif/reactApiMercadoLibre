import React from "react"
//import Button from 'react-bootstrap/Button'
import { Alert } from 'react-bootstrap'

function MiAlert(props) {
    const { variant,text} = props
    return (
        
        <Alert key={variant} variant={variant}>
            {text}
        </Alert>
    )
}
export default MiAlert;
