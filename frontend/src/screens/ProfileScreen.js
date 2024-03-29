import React, { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom'
import { Form, Button, Row, Col,Table } from "react-bootstrap"
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails,updateUserProfile} from '../actions/userActions'
import {listMyOrders} from '../actions/orderActions'

function ProfileScreen() {
    const location = useLocation()
   const history = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [comfirmPassword, setComfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

      const userUpdateProfile = useSelector(state => state.userUpdateProfile)
     const { success } = userUpdateProfile

     const orderListMy = useSelector(state => state.orderListMy)
     const {loading:loadingOrders, orders,error:errorOrders } = orderListMy

   //const { success } =useSelector(state => state.updateUserProfile)
    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } else {
            if (!user||!user.name||success) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)

            }
        }
    }, [dispatch, history, userInfo, user,success])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== comfirmPassword) {
            setMessage('Password do not match')
        } else {
            // console.log(updatedUserProfile({ id: user._id, name, email, password }))
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }

    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>


                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='comfirmPassword'>
                        <Form.Label>Comfirm password</Form.Label>
                        <Form.Control type='password'
                            placeholder='comfirm password'
                            value={comfirmPassword}
                            onChange={(e) => setComfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'> Update</Button>
                </Form>

            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            {loadingOrders ? <Loader/>
            :errorOrders?(<Message variant='danger'>{errorOrders}</Message>)
            :(<Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                        {orders.map(order=>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10) : (<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className="btn-sm" variant='info'>Details</Button>
                                    </LinkContainer>
                                    </td>
                            </tr>
                        ))}
                </tbody>
            </Table>)}
            </Col>

        </Row>);
}

export default ProfileScreen;

// <FormContainer>
// <Row className="py-3">
//     <Col>
//     Have an account?<Link to={redirect? `/login?redirect=${redirect}`:`/login`}>Login</Link>
//     </Col>
// </Row>
// </FormContainer>
/////////////////////////
// {loadingOrders ? (
//     <Loader/>): errorOrders?(
//         <Message variannt='danger'>{errorOrders}</Message>
//     ):(
//         <Table striped bordered hover responsive className="table-sm">
//             <thead>
//             <tr>
//             <th>ID</th>
//             <th>Date</th>
//             <th>TOTAL</th>
//             <th>PAID</th>
//             <th>DELIVERED</th>
//             </tr>
//             </thead>
//             <tbody>
//                 {orders.map((order)=>{
//                     <tr key={order.id}>
//                         <td>{order._id}</td>
//                         <td>{order.createdAt.substring(0,10)}</td>
//                         <td>{order.totalPrice}</td>

//                         <td>{order.isPaid?(order.paidAt.substring(0,10)):(
//                             <i className="fas fa-times" style={{color:'red'}}></i>
//                         )}</td>
// <td>
//     {order.isDelivered?(order.deliveredAt.substring(0,10)):(
//         <i className="fas fa-times" style={{color:'red'}}></i>
//     )}
// </td>
// <td>
//     <LinkContainer to={`/order/${order._id}`}>
//         <Button className="btn-sm" variant='light'>
//             Details
//         </Button>
//     </LinkContainer>
// </td>

//                     </tr>
//                 })}
//             </tbody>
//         </Table>
//     )
// }
