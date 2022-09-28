import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from "../Components/Loading"
import { getByIdProductos } from "../Services/productosServices"


const styles = {
    detalleProducto: {
        display: "flex",
        flexDirection: "column",
    },
    imagenes: {

        paddingLeft: "10px",
        paddingTop: "10px",
        paddingRigth: "10px",
        paddingBotton: "10px",
    },
    detallePrecio: {
        textAlign: "center",
    },
    botonComprar: {
        textDecoration: "none",
        padding: "10px",
        fontWeight: "600",
        fontSize: "20px",
        color: "#ffffff",
        backgroundColor: "black",
        borderRadius: "6px",
        border: "2px solid #0016b0",
    },
    detalleInfo: {
        maxWidth: "90%",
        listStyleType: "none",
        lineHeight: "1.6",
        background: "#CCC",
        margin: "0 0 10px 0",
        padding: "4px 8px",
        marginLeft: "20px",
        border: "1px solid #666",

    },
    detalleTerms: {
        backgroundColor: "black",
        color: "white",
        fontSize: "25px",
    },
    detalleSeller: {
        paddingTop: "15px",
        backgroundColor: "yellow",
        textAlign: "left",

    }

}



function DetallePage() {
    const { id } = useParams()
    console.log("Id", id)

    const [loading, setLoading] = useState(true)
    const [producto, setProducto] = useState({})
    const [seller, setSeller] = useState({})
    useEffect(
        () => {
            try {
                const request = async () => {
                    const response = await getByIdProductos(id)
                    console.log("response", response)
                    setLoading(false)
                    setProducto(response)
                    setSeller(producto.seller_address.city)
                }
                request()
            } catch (e) {
                console.log(e)
            }
        
        },
        [id]
    )
    if (loading) {
        return (
            <Loading loading={loading} >
                Cargando
            </Loading>
            )
    } else {
        return (
            <Loading>
            <div>

                <div style={styles.detalleProducto} >
                    <div style={styles.detallePrecio}>
                        <h1>{producto.title}</h1>
                        <h2>{producto.currency_id} {producto.price}</h2>
                        <h3>{producto.warranty}</h3>
                        <div style={styles.detalleSeller}>
                            <h3>Vendedor</h3>
                            <p>{producto.seller_address.city.name}</p>
                            <p>{producto.seller_address.state.name}</p>
                            <p>{producto.seller_address.country.name}</p>
                        </div>
                    </div>
                    <p style={styles.imagenes}>{producto.pictures.map(image => <img src={image.url}></img>)}</p>

                    <div  >
                        {producto.attributes.map((item) => <li style={styles.detalleInfo}>{item.name} <br /> {item.value_name}</li>)}
                        {producto.sale_terms.map((item) => <p style={styles.detalleTerms}>{item.name} <br /> {item.value_name}</p>)}
                    </div>
                </div>
                <button style={styles.botonComprar}>Comprar</button>
            </div>
          </Loading>
        )
    }
}


export default DetallePage;