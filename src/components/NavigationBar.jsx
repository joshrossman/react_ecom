import { NavLink} from 'react-router-dom'
import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';




const NavigationBar = () =>{
    return(
        <>
            
            <nav className="clearfix d-none d-md-flex ">
                
                <NavLink className = {({isActive})=>`nav_style ${isActive?'active':''}`}  to='/customers/add' end> Create Customer</NavLink>
                <NavLink className = {({isActive})=>`nav_style ${isActive?'active':''}`}   to='/customers' end>Search (and Delete) Customer</NavLink>
                <NavLink className = {({isActive})=>`nav_style ${isActive?'active':''}`}  to='/customers/update' end>Update Customer</NavLink>
                <NavLink className = {({isActive})=>`nav_style ${isActive?'active':''}`}   to='/products' end>List Products</NavLink>
                <NavLink className = {({isActive})=>`nav_style ${isActive?'active':''}`}   to='/products/add' end>Create Product</NavLink>
                <NavLink className = {({isActive})=>`nav_style ${isActive?'active':''}`}   to='/products/search' end>Search (and Delete) Products </NavLink>
                <NavLink className = {({isActive})=>`nav_style ${isActive?'active':''}`}   to='/products/update' end>Update Product</NavLink>
                <NavLink className = {({isActive})=>`nav_style ${isActive?'active':''}`}   to='/order' end>Place Order</NavLink>
            </nav>
            
                
                <Dropdown className="clearfix d-md-none mt-4 mb-4" style={{width:'100%'}} >
                <Dropdown.Toggle  style={{width:'100%',backgroundColor:'antiquewhite',height:'4rem',color:'rgb(56, 125, 181)',fontSize:'30px'}}>
                    Navigate
                </Dropdown.Toggle>
                <Dropdown.Menu style={{width:'100%'}} >
                <Dropdown.Item className = {({isActive})=>`nav_style ${isActive?'active':''}`}  href='/customers/add' end> Create Customer</Dropdown.Item>
                <Dropdown.Item className = {({isActive})=>`nav_style ${isActive?'active':''}`}   href='/customers' end>Search (and Delete) Customer</Dropdown.Item>
                <Dropdown.Item className = {({isActive})=>`nav_style ${isActive?'active':''}`} href='/customers/update' end>Update Customer</Dropdown.Item>
                <Dropdown.Item className = {({isActive})=>`nav_style ${isActive?'active':''}`}   href='/products' end>List Products</Dropdown.Item>
                <Dropdown.Item className = {({isActive})=>`nav_style ${isActive?'active':''}`}   href='/products/add' end>Create Product</Dropdown.Item>
                <Dropdown.Item className = {({isActive})=>`nav_style ${isActive?'active':''}`}   href='/products/search' end>Search (and Delete) Products </Dropdown.Item>
                <Dropdown.Item className = {({isActive})=>`nav_style ${isActive?'active':''}`}   href='/products/update' end>Update Product</Dropdown.Item>
                <Dropdown.Item className = {({isActive})=>`nav_style ${isActive?'active':''}`}   href='/order' end>Place Order</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

           
            
        </>
    )
}
export default NavigationBar