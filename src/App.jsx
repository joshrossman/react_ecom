import { useState } from 'react'
import './App.css'
import CreateCust from './components/CreateCust'
import SearchCust from './components/SearchCust'
import UpdateCust from './components/UpdateCust'
import ListProduct from './components/ListProduct'
import CreateProduct from './components/CreateProduct'
import SearchProduct from './components/SearchProduct'
import UpdateProduct from './components/UpdateProduct'
import PlaceOrder from './components/PlaceOrder'
import NavigationBar from './components/NavigationBar'
import Error from './components/Error'
import { Routes, Route} from 'react-router-dom'
import './AppStyle.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <NavigationBar />
      <Routes>
        <Route path='/customers/add' element={<CreateCust />} />
        <Route path='/customers' element={<SearchCust />} />
        <Route path='/customers/update' element={<UpdateCust />} />
        <Route path='/products' element={<ListProduct />} />
        <Route path='/products/add' element={<CreateProduct />} />
        <Route path='/products/search' element={<SearchProduct />} />
        <Route path='/products/update' element={<UpdateProduct />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='*' element={<Error />} />
      </Routes>
        
    </>
  )
}

export default App
