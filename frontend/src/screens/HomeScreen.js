import React, { useEffect } from 'react'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productAction.js'
import Loader from "../components/Loader.js"
import Message from '../components/Message.js'


function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  // console.log(products)

  return (
    <>
      <h1>Latest products</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
<Message variant='danger'>{error}</Message>
        ) : (
        <Row>
          {products.map((product, i) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
