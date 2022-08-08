import React, { useEffect } from 'react'
import Product from '../components/Product'
import Meta from '../components/Meta'
import {useParams,Link} from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productAction.js'
import Loader from "../components/Loader.js"
import Message from '../components/Message.js'
import Paginate  from '../components/Paginate'
import ProductsCarosel from '../components/ProductsCarosel'


function HomeScreen() {
  const {keyword,page} = useParams()
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products,pageNumber,pages } = productList
  const productDetail = products.products
  useEffect(() => {
    dispatch(listProducts(keyword,page))
  }, [dispatch,keyword,page])

  return (
    <>
    <Meta/>
    {!keyword ? <ProductsCarosel/> :<Link to ='/' className='btn btn-light'>
      Go Back
      </Link>}
      <h1>Latest products</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
<Message variant='danger'>{error}</Message>
        ) : (
          <>
        <Row>
          {products.map((product, i) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={pageNumber} keyword={keyword}  />
        </>
      )}
    </>
  )
}

export default HomeScreen
