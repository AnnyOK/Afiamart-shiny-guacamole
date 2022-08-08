import React from 'react'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from './screens/UserEditScreen.js'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3 px-3 mx-3">
        <Routes>
          <Container>
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/admin/orderlist' element={<OrderListScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/admin/productslist" element={<ProductListScreen />} />
            <Route path="/admin/productslist/:page" element={<ProductListScreen />} />
            <Route path="/admin/products/:id/edit" element={<ProductEditScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/users/:id/edit' element={<UserEditScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/search/:keyword/page/:page" element={<HomeScreen />} />
            <Route path="/page/:page/" element={<HomeScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Container>
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
