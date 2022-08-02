import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import {saveShippingAddress} from '../actions/cartActions'


function ShippingScreen() {
    console.log(useSelector(state=>state))
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
console.log(localStorage.getItem('shippingAddress'))
console.log(shippingAddress)

    const navigate = useNavigate()

    // const [address, setAddress] = useState(shippingAddress.address)
    // const [city, setCity] = useState(shippingAddress.city)
    // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    // const [country, setCountry] = useState(shippingAddress.country)



    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [country, setCountry] = useState("")


    const dispatch = useDispatch()


    const submitHandler=(e)=>{
    e.preventDefault()
dispatch(saveShippingAddress({address,city,postalCode,country}))  
 navigate('/payment')
//navigate('/payment')
  }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postal code'
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='country'
                        placeholder='Enter country'
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;