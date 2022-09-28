import React, { useState, useEffect } from "react"
import ProductoApi from "./ProductoApi"
import { getAllProductosApi } from '../Services/productosServices'
import Row from "react-bootstrap/esm/Row"
import Loading from "./Loading"


function ProductosApi() {

    const [productos,setProductos] = useState([])
    const [loading,setLoading] = useState(true)
    const [buscar,setBuscar] = useState ('ipod')

    useEffect(
         
           ()=> {
            
                getAllProductosApi(buscar)          
                .then(response => {
                    console.log(response)
                    setProductos(response.results)
                    setLoading(false)
                },) 
                .catch (error=> console.log(error)) 
            
        },
       [buscar]    
    ) 

    const handleChange = (event)=>{
   
        const value = event.target.value
       setBuscar(value)

    }
     
    if (loading) {
        
            return (<div className="cargando">Cargando...</div>)
        
    }
    else {
        const titulo = "Productos"
        return (
            <Loading className="productos">

                <h1 style={{ width: '18rem',backgroundColor: '#42BF70', marginTop: '5 px', width:'100%',paddingLeft: '10px'}} >{titulo}</h1>
                <div style={{backgroundColor: '#E7F0EA', display:'flex', flexdirection: 'row',marginBottom:'10px'}}>   
                <div style={{paddingLeft: '10px', paddingRight:'10px'}}>Buscar</div>
                <input  value={buscar} onChange={handleChange}></input>
                </div>
                <Row style={{backgroundColor: '#E7F0EA', marginTop: '5 px',paddingLeft: '10px'}}>
                    {productos.map(productoData => <ProductoApi data={productoData} />)}
                </Row>
            </Loading>

        )

    }

}

export default ProductosApi
