import axios from 'axios'
import {useState, useEffect} from 'react'
import {Button,Container, Row, Col, Image, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateProduct = () =>{
    const [productData,changeData] = useState([]);
    const [name,setName] = useState('');
    const [price,setPrice] = useState(0);
    const [id,setId] = useState('');
    const [idIsValid, changeValidId] = useState('')
    const [error,setError] = useState(null);
    const [isSubmitted, changeSubmitted] = useState(false);
    const [loaded, changeLoaded] = useState(false);

    useEffect(()=>{
        if({id})
            {
        const getData = async () => {
        
            try{
                    
                    const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
                    setError('')
                    console.log(response.data)
                    changeData(response.data);
                    setName(response.data['name']);
                    setPrice(response.data['price']);
                    changeValidId(id);
                    changeSubmitted(true);
                    console.log(productData)
                   
            
                
            }

            catch(error){
                setError(error.toString());
                changeValidId('');
                changeSubmitted(false);
                }
            }

            getData();
        }
    }
    ,[id])
    
    
    


    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(id) {
            const newProduct = {id, name, price};
            try{
                if(name || price){
                    await axios.put(`http://127.0.0.1:5000/products/${id}`,newProduct)
                    setError('')
                    changeLoaded(true)
                }
   
            }
            catch(error){
                setError(error.toString())
                changeLoaded(true)
            }
        }
    }
    return(
        <Container className='container' style={{overflow:'scroll'}}>
        <Form className='col col-9 mx-auto' onSubmit={handleSubmit}>
            <h3>Update Product</h3>
            <h5 style={{marginTop:'-15px'}}>Please enter a *valid* ID to edit.</h5>
            <Form.Label className='mt-2 '>ID:</Form.Label>
            <Form.Control className='p-2 m-1 mb-3' type='text' value={id} placeholder="ID" onChange={(e)=>setId(e.target.value)}></Form.Control>
            {id && idIsValid && isSubmitted ?(<>
            <Form.Label className='mt-2 '>Name:</Form.Label>
            <Form.Control className='p-2 mb-3' type='text' value={name} placeholder="Name" onChange={(e)=>setName(e.target.value)}></Form.Control>
            <Form.Label className='mt-2 '>Price:</Form.Label>
            <Form.Control className='p-2 mb-3' type='email' value={price} placeholder="Price" onChange={(e)=>setPrice(e.target.value)}></Form.Control>       
           
            <Button type="submit" variant='primary' className='mt-3' onClick={handleSubmit}>Edit Product</Button>
            {(loaded===true)? 
                    (<>{(error==='')?(<p>Product Changed Succesfully</p>):(<p style={{color:'red'}}>Could not Change Product: {error}</p>)}</>):(<p></p>)}</>)
                    :
                    (id?(<p>ID not valid</p>): (<p>No Data To Display Yet</p>))
            }
        </Form>
        </Container> 
    )
       
}
export default UpdateProduct