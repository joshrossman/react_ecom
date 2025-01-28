import axios from 'axios'
import {useState, useEffect} from 'react'
import {Button,Container, Modal, Row, Col, Image, Form} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

const SearchProduct = () =>{
    const [id,changeId]=useState(-1);
    const [inputId,changeInputId]=useState('');
    const [productData,changeData]=useState([]);
    const [error,changeError] = useState('');
    const [itemDeleted,changeDelete] = useState(false);
    
    const [show, setShow] = useState(false);

    function handleClose(){ setShow(false)};
    const handleShow = () => setShow(true);

    function handleClick(){
        changeId(inputId)
    }
   
    const handleDelete = async () =>{
        await axios.delete(`http://127.0.0.1:5000/products/${id}`)
        changeId(false);
        changeDelete(true);
        changeError('') ;
        changeData([]);
        handleClose;
        
    }
    useEffect(()=>{
    if(id){
        changeDelete(false)
        axios.get(`http://127.0.0.1:5000/products/${id}`)
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
        <>
       
        <Modal show={show} onHide={handleClose} centered>
      
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product? This action cannot be undone!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={()=>{handleClose(); handleDelete();}}>
            Delete Product
          </Button>
        </Modal.Footer>
        </Modal>
      
        
            
      
            <Container className='container'>
            <Form  className='col col-8 mx-auto '>
            <h3>Search For a Products</h3>
            <Form.Control 
            type='text'
            value={inputId} 
            placeholder='Search By ID'
            onChange={(e)=>changeInputId(e.target.value)}
            />
                
                {Object.keys(error).length!=0?(
                <Button type='button' className = 'm-3' onClick={handleClick}>
                    Search
                </Button>
                )
                :
                (
                    
                   <>
                    
     
      
                    <Button type='button' className = 'm-3 mb-4' onClick={handleClick}>
                    Search
                    </Button>
                    <Button type='button' variant="danger" className = 'm-3 mb-4' onClick={handleShow}>
                    Remove Product
                    </Button>
                    </>
                   
                   
        

                

                    
                )
            }
                
            
            
            {Object.keys(error).length===0?(
                itemDeleted?(
                    <>
                       <p> Product has been successfully deleted.</p>
                        
                    </>
                ):
                (
                    <>
                   
                    <p><b>Product: </b> {productData['name']}</p>
                    <p><b>Price: </b> {productData['price']}</p>
                   
                    </>
                )
            )
            :
            (
                <>
                    <br></br> Not a valid product ID.
                </>
                   
            )
            
        }
        </Form>
            
        </Container>
          
            
        
        </>
    )
}
export default SearchProduct