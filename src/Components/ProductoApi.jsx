import React, { useState } from "react"
import { Link } from "react-router-dom"
import {Card,Button,Col} from 'react-bootstrap'

function ProductoApi(props) {
    const { data } = props
    const [mensaje, setMensaje] = useState('')
    
    return (
    
        /*<div> Sin bootstrap
            <img src={data.thumbnail}></img>
            <p>{data.title}</p>
            <p>$ {data.price}</p>
            <button onClick={handleClick}>Comprar</button>
            <button><Link to={'/producto/'+data.id}>Ver detalle</Link></button>
            <div>{mensaje}</div>
        </div>*/
       <Col>
        <Card style={{ width: '18rem',backgroundColor: '#7fffd4' }}>
            <Card.Img variant="top" src={data.thumbnail} />
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>
                    $ {data.price}
                </Card.Text>
                <Card.Text>
                     {data.id}
                </Card.Text>
                <Button as={Link} to={'/producto/' + data.id} variant="primary">Ver detalle</Button>
                <div>{mensaje}</div>
            </Card.Body>
        </Card>
        </Col>
        )
     
}
export default ProductoApi