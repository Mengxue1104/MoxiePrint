import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Row, Col, Modal, Form } from 'react-bootstrap';
import { ref as storageRef, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { get, ref, push, set, update } from 'firebase/database';
import { db } from "../db/firebaseConfig";

export default function Store() {
    const [productList, setProductList] = useState([])
    const [product, setProduct] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [imagePreview, setImagePreview] = useState("")
    const [file, setFile] = useState("")

    //get data
    const fetchData = async () => {
        const product = ref(db, '/product')
        const productSnapShot = await get(product)
        const productData = { ...productSnapShot.val() }
        const products = Object.keys(productData).map(k => {
            return productData[k]
        })

        setProductList(products)
    }

    //init data
    const initData = () => {
        setProduct([])
        setImagePreview("")
        setShowModal(true)
    }

    //save data
    const handleSave = async () => {
        const dataRef = ref(db, 'product');
        let urlPath = ""

        if (!product.key && !file) alert("Please upload image")

        if (file.name !== undefined) {
            const imageRef = storageRef(getStorage(), `${file.name}`);
            await uploadBytes(imageRef, file);
            urlPath = await getDownloadURL(imageRef)
        }

        if (product.key) {
            const postData = {
                key: product.key,
                sku: product.sku,
                title: product.title,
                custom: product.custom,
                image: urlPath === "" ? imagePreview : urlPath,
                price: product.price
            }
            console.log(imagePreview)
            const updates = {};
            updates['/product/' + product.key] = postData;
            update(ref(db), updates);
        }
        else {
            const itemRef = await push(dataRef)

            set(itemRef, {
                key: itemRef.key,
                sku: `jhvr${itemRef.key}`,
                title: product.title,
                custom: product.custom,
                image: urlPath,
                price: product.price
            })
        }

        fetchData()

        setShowModal(false)
    }

    //updata data
    const handleChange = async (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }
    //edit button
    const handleEdit = async (key) => {
        let temp = productList.filter(p => p.key === key)[0]

        setImagePreview(temp.image)
        setProduct(temp)
        setShowModal(true)
    }

    //delete button
    const handleDelete = async (key) => {
        if (window.confirm("Are you sure to delete this item?")) {
            const updates = {};
            updates['/product/' + key] = null;
            update(ref(db), updates);
            fetchData()
        }
    }

    //image`
    const onImageSelected = async (e) => {
        let upload = e.target.files[0]

        setFile(upload)
        setImagePreview(URL.createObjectURL(upload))
    }

    useEffect(() => {
        fetchData()
    }, [imagePreview])

    return (
        <Container fluid>
            <Row>
                <Col sm={1}>
                    <Button variant="outline-primary mb-3" onClick={() => initData()}>Add Product</Button>
                </Col>
                <Col>
                    <Container>
                        <Row>
                            {productList.map((p, k) => {
                                if (p.key) {
                                    return <Col sm={3} key={k} className="mb-3">
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={p.image} />
                                            <Card.Body>
                                                <Card.Title>{p.title}</Card.Title>
                                                <Card.Text>
                                                    <p>{p.custom}</p>
                                                    <b>${p.price}</b>
                                                </Card.Text>
                                            </Card.Body>
                                            <div className='control'>
                                                <Button variant="outline-dark" onClick={() => handleEdit(p.key)}>Edit</Button>
                                                <Button variant="outline-danger" className="ml-3" onClick={() => handleDelete(p.key)}>Del</Button>
                                            </div>
                                        </Card>
                                    </Col>
                                }
                            })}
                        </Row>
                    </Container>
                </Col>
            </Row>


            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{product.key ? 'Edit' : 'Add'} Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Title:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                name="title"
                                value={product.title}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Description:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                name="custom"
                                value={product.custom}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Price:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="number"
                                min="0"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Image:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={onImageSelected}
                            />
                            {imagePreview && <img src={imagePreview} alt="preview" className='img-preview' />}
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}