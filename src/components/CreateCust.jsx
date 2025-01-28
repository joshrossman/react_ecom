import axios from 'axios'
import {useState, useEffect} from 'react'
import {Button,Container, Row, Col, Image, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateCust = () =>{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [error,setError] = useState('');
    const [statement] = useState(true);
    const [loaded, changeLoaded] = useState(false);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(statement) {
            const newCust = {name, email, phone};
            try{
                if(name || email ||phone){
                    await axios.post('http://127.0.0.1:5000/customers/add',newCust)
                
                setName('');
                setEmail('');
                setPhone('');
                setError('')
                console.log('test3')
                changeLoaded(true);
            }
                
                
                }

            catch(error){
                setError(error.toString());
                setName('');
                setEmail('');
                setPhone('');
                console.log('test1');
                changeLoaded(true);
               

            }
        }
        else{
                
                console.log('test2');
                setName('');
                setEmail('');
                setPhone('');
                setError(error.toString())
                
            }
        
    }
    return(
        <div >
            <Container className='container'>
            <Form className=' col col-8 mx-auto' onSubmit={handleSubmit}>
                <h3>Add New Customer</h3>
                <Form.Control className='p-2 m-3 mb-4' type='text' value={name} placeholder="Name" onChange={(e)=>setName(e.target.value)}></Form.Control>
                <Form.Control className='p-2 m-3 mb-4' type='email' value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}></Form.Control>       
                <Form.Control className='p-2 m-3 mb-4' type='tel'  value={phone} placeholder="Phone Number" onChange={(e)=>setPhone(e.target.value)}></Form.Control>
                <Button type="submit" variant='primary' onClick={handleSubmit}>Add New Customer</Button>
            </Form>
            
            {(loaded===true)? 
                    (<>{(error==='') ? (<p>Customer Added Succesfully</p>):(<p style={{color:'red'}}>Could not add Customer: {error}</p>)}</>)
                    :
                    (<p></p>)
                }
            </Container>
            
            
        </div>
    )
}
export default CreateCust