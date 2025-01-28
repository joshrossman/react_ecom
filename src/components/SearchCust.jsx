import axios from 'axios'
import {useState, useEffect} from 'react'
import {Button,Container, Row, Col, Image, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchCust = () =>{
    const [id,changeId]=useState(-1);
    const [inputId,changeInputId]=useState('');
    const [customerData,changeData]=useState([]);
    const [error,changeError] = useState('');
    const [itemDeleted,changeDelete] = useState(false);

    const handleClick = () =>{
        changeId(inputId)
    }
    const handleDelete = async () =>{
        await axios.delete(`http://127.0.0.1:5000/customers/${id}`)
        changeId(false);
        changeDelete(true);
        changeError('') 
        changeData([])
        
    }
    useEffect(()=>{
    if(id){
        changeDelete(false)
        axios.get(`http://127.0.0.1:5000/customers/${id}`)
            .then((response) => {
                changeData(response.data)
                changeError('')
                
            })
            .catch((error)=>{
                changeData([])
                changeError(error)
            })  
        }}, [id]);
    
    return(
        <div>
            <Container className='container'>
            <Form className='col col-8 mx-auto '>
            <h3>Search for a customer</h3>
            <Form.Control 
            type='text'
            value={inputId} 
            placeholder='Search By ID'
            onChange={(e)=>changeInputId(e.target.value)}/>
                <br></br>
                {Object.keys(error).length!=0?(
                <Button type='button' className = 'mb-2' onClick={handleClick}>
                    Search
                </Button>
                )
                :
                (
                    <>
                  
                    <Button type='button' className = 'm-3 mb-4 mt-1' onClick={handleClick}>
                    Search
                    </Button>
                    <Button type='button' variant="danger" className = 'm-3 mb-4 mt-1' onClick={handleDelete}>
                    Delete Customer
                    </Button>
                    </>
                )
            }
                
            
            
            {Object.keys(error).length===0?(
                itemDeleted?(
                    <>
                        <br></br> Customer has been successfully deleted.
                        
                    </>
                ):
                (
                    <p >
                    <p><b>Customer Id: </b> {customerData['id']}</p>
                    <p><b>Customer Name:</b>  {customerData['name']}</p>
                    <p><b>Customer Email:</b>  {customerData['email']}</p>
                    <p><b>Customer Phone Number:</b>  {customerData['phone']}</p>
                    </p>
                )
            )
            :
            (
                <>
                    <br></br> Not a valid customer ID.
                </>
                   
            )
            
        }
        </Form>
            
        </Container>
        
          
            
        </div>
    )
}
export default SearchCust