import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputForm from "../Components/InputForm";
import Form from 'react-bootstrap/Form'
import { useRef } from "react"
import firebase from "../Config/firebase"
import ButtonWithLoading from "../Components/ButtonWithLoading";


const styles = {
    formulario: {
        marginLeft: "80px",
        marginRight: "80px",
        maxWidth: "40%",
        }
}

function RegistroPage() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading,setLoading] = useState(false)


    const password = useRef({});
    password.current = watch("pass", "");

    const onSubmit = async (data) => {

        console.log("data", data)

    try {
        
      const responseUser = await  firebase.auth.createUserWithEmailAndPassword(data.email,data.pass) 
      console.log (responseUser.user.uid)
      if (responseUser?.user?.uid){
        console.log("responseUser")
        const document = await firebase.db.collection("usuarios")
        .add({
            name:data.name,
            lastname:data.lastname,
            tel:data.tel,
            userID:responseUser.user.uid,
        }) 
        console.log(document)
        setLoading(false)
      }

    } catch (e) {
        console.log(e)
        setLoading(false)
    }

    }
    return (
        <div className="formu" >
            <Form onSubmit={handleSubmit(onSubmit)} style={styles.formulario}>


                <InputForm label="Nombre" name="name" register={{ ...register("name", { required: true, minLength: 4 }) }} />

                {errors.name?.type === "required" && <span style={{ color: "red" }}>El campo es obligatorio</span>}
                {errors.name?.type === "minLength" && <span style={{ color: "red" }} >Debe introducir al menos 3 caracteres</span>}
                <br />
                <InputForm label="Apellido" name="lastname" register={{ ...register("lastname", { required: true, minLength: 4 }) }} />
                <br />
                {errors.email && <span style={{ color: "red" }} >El campo es obligatorio</span>}

                <InputForm label="Email" name="email" register={{ ...register("email", { required: true, minLength: 4 }) }} />

                {errors.tel && <span  style={{ color: "red" }} >El campo es obligatorio</span>}

                <InputForm label="Telefono" type="number" name="tel" register={{ ...register("tel", { required: true, minLength: 4 }) }} />

                {errors.tel && <span  style={{ color: "red" }} >El campo es obligatorio</span>}

                <InputForm label="Password" type="password" name="pass" placeholder="Password" register={{ ...register("pass", { required: true, minLength: 4 }) }} />

                {errors.pass && <span style={{ color: "red" }} >El campo es obligatorio</span>}

                <InputForm label="Confirmar Password" placeholder="Confirmar Password" type="password" name="confirpass" register={{ ...register("confirpass", { required: true, minLength: 4, validate: value => value === password.current || <span style={{ color: "red" }}  >"El password es incorrecto" </span>}) }} />
                {errors.confirpass && <p style={{ color: "red" }} >{errors.confirpass.message}</p>}
                <br />
                <br />
                
                <ButtonWithLoading loading={loading}>Registrarme</ButtonWithLoading>
            </Form>          

        </div>
    )
}

export default RegistroPage;
