import React from "react"
import Form from 'react-bootstrap/Form'


function InputForm(props) {


    const { label, type, name, placeholder, register } = props

    return (
    <Form.Group className="mb-3" controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Control type={type || "text"} name={name} placeholder={placeholder || ""} {...register} />
    </Form.Group>
        

      /* Sin bootstrap 
       /* <div>
        <label>{label}</label>
        <input type={type || "text"} name={name} placeholder={placeholder || ""} {...register} ></input>
        </div>
       */
    )


}
export default InputForm

