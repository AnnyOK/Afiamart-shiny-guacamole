import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader';
import Message from './Message';
import { topProduct } from '../actions/productAction'
import { useDispatch, useSelector } from 'react-redux';

function ProductsCarosel(props) {
    const dispatch = useDispatch()
    const topRated = useSelector(state => state.topRated)
    const { loading, error, topProducts } = topRated
    useEffect(() => {
        dispatch(topProduct())
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
        : <Carousel pause='hover' className='bg-dark'>
            {topProducts.map((product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}><Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} $({product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            )))}
        </Carousel>


}

export default ProductsCarosel;