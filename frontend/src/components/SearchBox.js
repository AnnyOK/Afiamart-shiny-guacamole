import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom';
function SearchBox(history) {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    // const location = useLocation()

    // useEffect(() => {
    //   console.log(location.p)
    // },[])
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }
    return (
        <Form onSubmit={submitHandler} style={{display: 'flex'}}>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search products...'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' className='p-2 inline' variant='outline-success'> Search</Button>
        </Form>
    );
}

export default SearchBox;