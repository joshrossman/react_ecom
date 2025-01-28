import axios from 'axios'
import {useState, useEffect} from 'react'
import {Button,Container, Row, Col, Image, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateCust = () =>{
    const [customerData,changeData] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [id,setId] = useState('');
    const [idIsValid, changeValidId] = useState('')
    const [error,setError] = useState('3');
    const [isSubmitted, changeSubmitted] = useState(false);
    const [loaded, changeLoaded] = useState(false);

    useEffect(()=>{
        if({id})
            {
        const getData = async () => {
        
            try{
            
                    const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
                    setError('')
                    console.log(response.data)
                    changeData(response.data);
                    setName(response.data['name']);
                    setEmail(response.data['email']);
                    setPhone(response.data['phone']);
                    changeValidId(id);
                    changeSubmitted(true);
                    console.log(customerData)
                   
            
                
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
            const newCust = {id, name, email, phone};
            try{
                if(id){
                    await axios.put(`http://127.0.0.1:5000/customers/${id}`,newCust)
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
        <Form className='col col-8 mx-auto'  onSubmit={handleSubmit}>
            <h3>Update Customer</h3>
            <h5 style={{marginTop:'-15px'}}>Please enter a *valid* ID to edit.</h5>
            <Form.Label className='mt-2 '>ID:</Form.Label>
            <Form.Control className='p-2 m-1 mb-3' type='text' value={id} placeholder="ID" onChange={(e)=>setId(e.target.value)}></Form.Control>
            {id && idIsValid && isSubmitted ?(<>
            <Form.Label>Name</Form.Label>
            <Form.Control className='p-2 ' type='text' value={name} placeholder="Name" onChange={(e)=>setName(e.target.value)}></Form.Control>
            <Form.Label className='mt-2 '>Email</Form.Label>
            <Form.Control className='p-2 ' type='email' value={email} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}></Form.Control>       
            <Form.Label className='mt-2 '>Phone Number</Form.Label>
            <Form.Control className='p-2 mb-2' type='tel'  value={phone} placeholder="Phone Number" onChange={(e)=>setPhone(e.target.value)}></Form.Control>
            
            <Button type="submit" variant='primary' className='mt-3 mb-2' onClick={handleSubmit}>Edit Customer</Button>
           
                {(loaded===true)? 
                    (<>{(error==='')?(<p>Customer Changed Succesfully</p>):(<p style={{color:'red'}}>Could not Change Customer: {error}</p>)}</>):(<p></p>)}</>)
                    :
                    (id?(<p>ID not valid</p>): (<p>No Data To Display Yet</p>))
                }
        
        </Form>
        </Container> 
    )
       
}
export default UpdateCust