import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import { BsHeartFill } from 'react-icons/bs'

//Import css:
import '../css/home.css';
import '../css/card.css';

const Home = () => {
    const [cardsArr, setCardsArr] = useState([]);
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState({});

    const handleClose = () => {
        setShow(false);
        setProduct({});
    }

    const handleShow = (e) => {
        axios.get('cards/myCard', { headers: { 'id-card': e.target.id } })
            .then((res) => {
                setProduct(res.data);
                setShow(true);
            })
            .catch((err) => {

                if (err.response) {
                    //error from server
                    toast.error(err.response.data)
                } else if (err.request) {
                    //error if server not responding
                    toast.error('Something went wrong')
                } else {
                    toast.error('Something went wrong')
                }
            });
    }

    const handleAddFavorite = (productId) => {
        axios.patch('users/addFavorite', { 'cardId': productId })
            .then((res) => {
                toast(res.data);
            })
            .catch((err) => {

                if (err.response) {
                    //error from server
                    toast.error(err.response.data)
                } else if (err.request) {
                    //error if server not responding
                    toast.error('Something went wrong')
                } else {
                    toast.error('Something went wrong')
                }
            });
    }


    useEffect(() => {
        axios.get('/cards/allCards')
            .then((response) => {
                const arr = [response.data[0], response.data[1], response.data[2]];
                setCardsArr(arr);
            })
            .catch((err) => {

                if (err.response) {
                    //error from server
                    toast.error(err.response.data)
                } else if (err.request) {
                    //error if server not responding
                    toast.error('Something went wrong')
                } else {
                    toast.error('Something went wrong')
                }
            });
    }, []);

    return (
        <>
            <h1> Welcome to BUY & SELL site!</h1>
            <div className=" info">

                <p>
                    Need a sofa for the living room?
                    <br />
                    Looking for a used iPhone?
                    <br />
                    Want to refresh your wardrobe with an outfit or two?
                    <br />
                    Here you can find all these products and many more, in every category you can think of. Appliances and electronics, furniture, everything you can buy and sell is right at your fingertips.
                    All you have to do is select the product category, and you will immediately receive a list of ads of people selling it throughout the country.
                    <br />
                    Happy shopping!✌🏼👍🏼👌🏼
                </p>
            </div>

            <h5>Some of our products</h5>
            <div className="cardsWrapper row row-cols-1 row-cols-md-4 g-4">
                {cardsArr.map((item) => {
                    return (
                        <div className="card" key={item._id}>
                            <img className="productPic" src={item.image} alt="Product pic" />
                            <p className="card-text"> <strong>Type:</strong> {item.productType}</p>
                            <p className="card-text"> <strong>Price:</strong> {item.price}$</p>

                            <button className="btn btnShowMore" onClick={handleShow} id={item._id}>Show more</button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header>
                                    <img className="productPic" src={product.image} alt="Product pic" />
                                </Modal.Header>
                                <Modal.Body>
                                    <h5 className="cardTitle">About the product:</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text"> <strong>Type:</strong> {product.productType}</p>
                                    <p className="card-text"> <strong>Price:</strong> {product.price}$</p>
                                    <p className="card-text"> <strong>Created At:</strong> {product.creationDate}</p>
                                    <p className="card-text"> <strong>Contact: </strong> {product.name} - {product.phone}</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                                    <button type="button" className="btn handleAddToFavorite" onClick={() => handleAddFavorite(product._id)}><BsHeartFill /> Add to favorites</button>
                                </Modal.Footer>
                            </Modal>

                        </div>

                    )
                })}
            </div>
            <span ><Link to='/products' className="productsLink">click to another products...</Link></span>

        </>
    )
};

export default Home;