import React from "react";
import { useForm } from "react-hook-form";
import InputForm from "../Components/InputForm";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import firebase from "../Config/firebase"

const styles = {
    formulario: {
        marginLeft: "80px",
        marginRight: "80px",
        maxWidth: "40%",
    }
}
function AltaProductos() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log("data", data)
        try {
            const document = await firebase.db.collection("productos")
                .add({
                    name: data.name,
                    price: data.price,
                    description: data.description,
                })
            console.log(document)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)} className="formulario" style={styles.formulario}>
                <InputForm label="Nombre" name="name" register={{ ...register("name", { required: true, minLength: 4 }) }} />

                {errors.name?.type === "required" && <span style={{ color: "red" }}>El campo es obligatorio</span>}
                {errors.name?.type === "minLength" && <span style={{ color: "red" }} >Debe introducir al menos 3 caracteres</span>}
                <br />
                <InputForm label="Precio" name="price" register={{ ...register("price", { required: true, minLength: 4 }) }} />
                <br />

                <InputForm label="Descripcion"  name="description" register={{ ...register("description", { required: true, minLength: 4 }) }} />



                <Button type="submit" /*style={styles.botonRegistrarse}*/ variant="success">Guardar</Button>{' '}
            </Form>
        </div>
    )

}

export default AltaProductos;
