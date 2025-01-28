import {Button,Container, Row, Col, Image} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const Error=()=>{
    return(
        <div className = 'bg-info text-danger' style={{overflow:'hidden'}}>
            <Container className='mt-3' style={{overflow:'hidden'}}>
                <Row  style={{height:'8rem'}} >
                    <Col>
                    <Image className="mx-auto" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOZpshplq-d8Z3yY1M7Fa3osGVJ5f8NBDtVhBfY247s5AWXIqk0JEoOIgbux5tUC5-y4&usqp=CAU' style={{height:'8rem', width:'auto'}}></Image>               
                    </Col> 
                </Row>
                <Row style={{height:'4rem'}} > 
                    <Col>
                     <h1>Error! 404 </h1>
                     </Col>
                </Row>
                <Row >
                    <Col  className="mx-auto">
                    This page cannot be found. If you are trying to load character details - please go to the "browse" page and click on a character that you would like to see displayed.
                    </Col>
                </Row>
            </Container>
          
        </div>
    )
}
export default Error;