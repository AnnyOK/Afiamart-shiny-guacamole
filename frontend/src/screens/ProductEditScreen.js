import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { CloudinaryContext, Image } from 'cloudinary-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstant';

function ProductEditScreen() {
    const productId = useParams().id
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [fileUploading, setFileUploading] = useState(null)


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails


    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productslist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)

            }
        }

    }, [dispatch, product, navigate, productId, successUpdate])


    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        // const signatureResponse = await axios.get('/api/upload/get-signature')
        const myFormData = new FormData()
        myFormData.append('image', file)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                },
                onUploadProgress: function (e) {
                    console.log(e.loaded / e.total)
                }
            }
            // const {data} = await axios.post('https://afiamart-cloud.herokuapp.com/solitary', myFormData)
            const {data} = await axios.post('/api/uploads/cloud', myFormData)
            // const { data } = await axios.post('/api/uploads', myFormData, config)
            setImage(data.secure_url)
            setUploading(false)
        } catch (error) {
            setUploading(false)
        }

    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))

    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Update Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate.message}</Message>}

                {loading ? <Loader />
                    : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type='number'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type='text'
                                    placeholder='Enter image url'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                ></Form.Control>

                                <Form.Control
                                    type="file"
                                    controlid="image-file"
                                    label="Choose image"
                                    // custom
                                    onChange={uploadFileHandler}
                                ></Form.Control >
                                    {uploading && <Loader />}
                            </Form.Group>

                            
                            {/* 
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                   
                                <Form.Control
                                 placeholder='Enter image url'
                                 value={image}
                                 onChange={(e) => setImage(e.target.value)}

                                    type="file"
                                    // controlId="formfile"
                                    label="Choose image"
                                    // custom
                                    onChange={uploadFileHandler}
                                />
                                {uploading && <Loader />}
                            </Form.Group> */}


                            <Form.Group controlId='brand'>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type='text'
                                    placeholder='Enter brand'
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control type='text'
                                    placeholder='Enter category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='countInStock'>
                                <Form.Label>Count In Stock</Form.Label>
                                <Form.Control type='number'
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type='text'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'> Update</Button>

                        </Form>

                    )}

            </FormContainer>
        </>

    );
}

export default ProductEditScreen;