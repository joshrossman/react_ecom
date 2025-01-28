import axios from 'axios'
import {useState, useEffect} from 'react'
import {Button,Container, Row, Col, Image, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const PlaceOrder = () =>{
    const [id,changeId] = useState('');
    const [customer_id,changeUser] = useState('');
    const [date,changeDate] = useState('');
    const [error,setError] = useState('');
    const [orderStatus,changeStatus] = useState(false)
    const [productId,changeProductId] = useState('')
    const [productsNames, changeProductList] = useState([])
    const [products, changeProductListId] = useState([])
    

    const placeOrder=()=>{
        changeStatus(true)
        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(Object.keys(error).length === 0 || error==='') {
            const newOrder = {id,date, customer_id,products};
            try{ 
                if(id){
                    console.log(id)
                    console.log(date)
                    console.log(customer_id)
                    const response = await axios.post('http://127.0.0.1:5000/order',newOrder)
                    console.log(response)
                   
                }
                changeId('')
                changeUser('');
                changeDate('');
                changeProductListId([])
                changeProductList([])
                changeProductId('')
                
                }

            catch(error){
                setError(error.toString());
                console.log(error)

            }
        }
        else{
                setError(error);
                console.log(error);
            }
        
    }
    
    const handleProductSubmit = async (event) => {
        event.preventDefault();
        if(Object.keys(error).length === 0 || error==='') {
            
            try{ 
                if(productId){
                    const response = await axios.get(`http://127.0.0.1:5000/products/${productId}`)
                    console.log(response)
                    
                    const newList = [...productsNames,response.data['name']]
                    const newIdList = [...products,response.data['id']]
                    changeProductList(newList)
                    changeProductListId(newIdList)
                    console.log(response.data['name'])
                    console.log(productsNames)
                    console.log(products)


                }
                
                }

            catch(error){
                setError(error.toString());
                console.log(error)

            }
        }
        else{
                setError(error);
                console.log(error);
            }
        
    }
    return(
        <div >
            
            {orderStatus?(
                <Container className='container'>
            <Form className='col col-8 mx-auto ' onSubmit={handleSubmit}>
                <h3>Place New Order</h3>
                <Form.Control className='p-2 m-3 mb-4' type='num' value={id} placeholder="Order Id" onChange={(e)=>changeId(e.target.value)}></Form.Control>
                <Form.Control className='p-2 m-3 mb-4' type='date' value={date} placeholder="Date" onChange={(e)=>changeDate(e.target.value)}></Form.Control>
                <Form.Control className='p-2 m-3 mb-4' type='num'  value={customer_id} placeholder="Customer ID" onChange={(e)=>changeUser(e.target.value)}></Form.Control>
                <Button type="submit" variant='primary' onClick={handleSubmit}>Add New Order</Button>
            </Form>
            </Container>
            ):
            ( <Container className='container'>
                <Form className='col col-8 mx-auto ' >
                    <h3>Add Items To Purchase By ID:</h3>
                    <Form.Control className='p-2 m-3 mb-4' type='num' value={productId} placeholder="Order Id" onChange={(e)=>changeProductId(e.target.value)}></Form.Control>
                    
                    <Button type="button" className='m-2' variant='primary'  onClick={handleProductSubmit} >Add Product ID</Button>
                    <Button type="button"  className='m-2' variant='info'  onClick={placeOrder} >Place Order</Button>
                </Form>
                {productsNames.map((product, index)=>
                    <>
                    <p key={index}>{product}</p>
                    </>
                )}
                
                     
                </Container>
                
            )
        }
            
        </div>
    )
}
export default PlaceOrder