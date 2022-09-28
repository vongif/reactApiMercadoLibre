import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import InputForm from "../Components/InputForm";
import {Button,Form} from 'react-bootstrap'
import MiAlert from "../Components/MiAlert";
import firebase from "../Config/firebase"
import AuthContext from "../Context/AuthContext";
import { loginMessage } from "../Util/errorMessage";
import {useNavigate} from "react-router-dom"

const styles = {
    formLogin: {
        padding: "15px",
        maxWidth: "40%",
        paddingTop: "30px",
        backgroundColor: "#4C737C",
        color: "$gris-light",
        fontSize: "20px",
        textAlign: "left",
    },
}
function LoginPage(props) {

    const { register, handleSubmit, formState: {errors}} = useForm();
    const [alert, setAlert] = useState({ variant: '', text: ''})
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    const onSubmit = async (data) => {

        console.log("data", data)

        try {
            
            const responseUser = await firebase.auth.signInWithEmailAndPassword(data.email, data.pass)
            console.log(responseUser.user.uid)
            if (responseUser.user.uid) {
                const user = await firebase.db.collection("usuarios")
                    .where("userID", "==", responseUser?.user?.uid)
                    .get()
                setTimeout(() => { /*colocado para que se vea en mensaje de Bienvenido*/   
                context.loginUser(user.docs[0].data())
                setAlert({variant:'success', text:'Bienvenido ' + user.docs[0].data().name})   
                navigate("/")    
                }, 3000);
                
            }
        } catch (e) {
            console.log(e.code)
            if (e.code === "auth/user-not-found") {
            
            }
            setAlert({ variant: "danger", text: loginMessage[e.code] || "Ha ocurrido un error" })

        }

    }
    return (
        <div style={styles.formLogin}>
            <Form onSubmit={handleSubmit(onSubmit)} >
                <InputForm label="Email" type="email" name="email" register={{ ...register("email", { required: true, minLength: 10 }) }} />
                {errors.email && <span style={{ color: "red" }} >El email es obligatorio</span>}
                <InputForm label="Password" name="pass" register={{ ...register("pass", { required: true, minLength: 5 }) }} />
                {errors.pass && <span style={{ color: "red" }} >El Password es obligatorio</span>}
                {errors.pass?.type === "minLength" && <span>Debe introducir al menos 3 caracteres</span>}
                <br />
                <br />
                <Button type="submit" variant="primary" >
                    Ingresar
                </Button>
                <MiAlert style={{ color:'white'}} {...alert} />
            </Form>
                
        </div>
    )
}

export default LoginPage

