import React from 'react'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Routes>
          <Container>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
          </Container>
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
