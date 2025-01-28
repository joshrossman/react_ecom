import axios from 'axios'
import {useState, useEffect} from 'react'
import {Button,Container, Row, Col, Image, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateProduct = () =>{
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [error,setError] = useState('');
    const [statement] = useState(true);
    const [loaded, changeLoaded] = useState(false);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(statement) {
            const newProduct = {name, price};
            try{
                if(name || price){
                    await axios.post('http://127.0.0.1:5000/products',newProduct)
                
                setName('');
                setPrice('');
                setError('');
                changeLoaded(true);
                }
                
                }

            catch(error){
                setError(error.toString());
                setName('');
                setPrice('');
                changeLoaded(true);
                
               

            }
        }
        else{
                setError(error.toString());
                setName('');
                setPrice('');
                
               
            }
        
    }
    return(
        <div >
            <Container className='container'>
            <Form className='col col-8 mx-auto ' onSubmit={handleSubmit}>
                <h3>Add New Product</h3>
                <Form.Control className='p-2 m-3 mb-4' type='text' value={name} placeholder="Name" onChange={(e)=>setName(e.target.value)}></Form.Control>
                <Form.Control className='p-2 m-3 mb-4' type='num'  value={price} placeholder="Price" onChange={(e)=>setPrice(e.target.value)}></Form.Control>
                <Button type="submit" variant='primary' onClick={handleSubmit}>Add New Product</Button>
            </Form>
                {(loaded===true)? 
                    (<>{(error==='') ? (<p>Product Added Succesfully</p>):(<p style={{color:'red'}}>Could not add Product: {error}</p>)}</>)
                    :
                    (<p></p>)
                }
                        </Container>
            
        </div>
    )
}
export default CreateProduct