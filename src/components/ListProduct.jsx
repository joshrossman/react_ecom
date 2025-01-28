import axios from 'axios'
import {useState, useEffect} from 'react'
import {Button,Container, Row, Col, Image, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const ListProduct = () =>{
    const [productData,changeData]=useState([]);
    const [error, changeError]=useState('');


    useEffect(()=>{
        axios.get("http://127.0.0.1:5000/products")
        .then((response)=>{
            changeData(response.data);
            console.log(response.data)

        })
        .catch((error)=>
            changeError(error)

        )

        },
        ([])
    )
    return(
        <div >
            <Container className='conatiner myList'>
                <h3>List Of Products:</h3>
            {productData.map((product)=>
            <>
            <p style={{fontWeight:'700',textDecoration:'underline', textTransform:'uppercase'}}>Product Id: {product['id']}</p>
            <p>Product Name: {product['name']}</p>
            <p>Product Price: {product['price']}</p>
            </>
            )}
            </Container>
            
        </div>
    )
}
export default ListProduct