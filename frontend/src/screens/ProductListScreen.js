import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader'
import Paginate from '../components/Paginate';
import {
    listProducts,
    deleteProduct,
    createProduct
} from '../actions/productAction'
import { PRODUCT_CREATE_RESET } from "../constants/productConstant"
import { useNavigate, useParams } from 'react-router-dom';


function ProductListScreen() {
    const page=useParams().page ||1
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, pageNumber } = productList
    console.log('productlist',productList)


    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            navigate('/login')
        }
        if (successCreate) {
            navigate(`/admin/products/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts("",page))
        }
    }, [dispatch,
        navigate,
        userInfo,
        successDelete,
        successCreate,
        createProduct,
        page
    ])


    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            dispatch(deleteProduct(id));
            console.log(id)

        }
    }
    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <div className="m-6">
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && (<Message variant="danger">{errorDelete}</Message>)}
            {loadingCreate && <Loader />}
            {errorCreate && (<Message variant="danger">{errorCreate}</Message>)}

            {loading ? <Loader /> : error ? (<Message variant="danger">{error}</Message>)
                : (
                    <>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th> BRAND</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(products[0])}

                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>

                                        <td>
                                            <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                                <Button variant="light" className="btn-sm">
                                                    <i className="fas fa-edit"></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className="btn-sm" onClick={() => deleteHandler(product._id)}>
                                                <i className="fas fa-trash" style={{ color: 'white' }}></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </Table>
                       {console.log('page',pageNumber,'pages',pages)}
                        <Paginate page={pageNumber} pages={pages} isAdmin={true}/>
                    </>
                )}
                       
        </div>
    );
}
export default ProductListScreen;