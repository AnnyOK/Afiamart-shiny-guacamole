import React, { useState, useEffect } from 'react'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, reviewProduct } from '../actions/productAction.js'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import Meta  from '../components/Meta'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { PRODUCT_REVIEW_RESET } from '../constants/productConstant'

const ProductScreen = (history) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  // console.log(id)
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReview = useSelector((state) => state.productReview)
  const { error: errorReview, success } = productReview
  useEffect(() => {
    if(success){
      alert("Review submitted")
      setRating(0)
      setComment('')
      dispatch({ type:PRODUCT_REVIEW_RESET})
    }

    dispatch(listProductDetails(id))
  }, [dispatch, id,success])


  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }
  const submitHandler = (e) => {
    e.preventDefault()
dispatch(reviewProduct(id,{rating,comment}))
  }
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup Variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating || 0}
                    text={`${product.numreviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price:${product.price}</ListGroup.Item>
                <ListGroup.Item>Description:{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong> ${product.price}</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row>
                      <Button
                        className="btn-block"
                        type="button"
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                      >
                        Add to Cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item >
                  <h2>Write a customer review</h2>
                  {errorReview && <Message variant='danger'>{errorReview}</Message>}
                  {userInfo ? (<Form onSubmit={submitHandler}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value=''>Select...</option>
                        <option value='1'>1-Poor</option>
                        <option value='2'>2-Fair</option>
                        <option value='3'>3-Good</option>
                        <option value='4'>4-Very Good</option>
                        <option value='5'>5-Excellent</option>

                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='commet'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        value={comment}
                        placeholder='Leave a comment'
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='button'>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form.Group>
                  </Form>) : <Message> Please <Link to="/login">sign in </Link> to write a review
                  </Message>}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
