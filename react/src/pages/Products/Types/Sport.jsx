import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from 'react-bootstrap';
import { BsHeartFill } from 'react-icons/bs'

//import css
import '../../../css/card.css';

const Sport = () => {
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
                console.log("err.request", err.request);

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
                console.log("err.request", err.request);

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
        axios.get('/cards/Sport')
            .then((response) => {
                setCardsArr(response.data)
            })
            .catch((err) => {
                console.log("err.request", err.request);

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

    const handleSorted = (e) => {
        if (e.target.value === 'high') {
            const sortedCards = [...cardsArr].sort((a, b) => b.price - a.price);
            setCardsArr(sortedCards);
        } else if (e.target.value === 'low') {
            const sortedCards = [...cardsArr].sort((a, b) => a.price - b.price);
            setCardsArr(sortedCards);
        }
    }

    return (
        <>
            {cardsArr.length > 0 ? (
                <div>
                    <h5>All Sport Product:</h5>
                    <select aria-label="Default select example" onChange={handleSorted}>
                        <option>Sort by price:</option>
                        <option value="high">high to low</option>
                        <option value="low">low to high</option>
                    </select>
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
                                            <span onClick={() => handleAddFavorite(product._id)}><BsHeartFill /> Add to favorites</span>
                                        </Modal.Footer>
                                    </Modal>

                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : (
                <div className="container">
                    <h4>There are no Sport products yet </h4>
                </div>
            )}
        </>
    )
};

export default Sport;