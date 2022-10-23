import axios from "axios";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react"
import { Modal } from 'react-bootstrap';
import { BsHeart } from 'react-icons/bs'

import '../../css/card.css';

const FavoriteProducts = () => {
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

    const handleRemoveFavorite = (productId) => {

        axios.patch('users/removeFavorite', { 'cardId': productId })
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
        axios.get('/users/favoriteCards')
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

    return (
        <div>
            {cardsArr.length === 0 ? (
                <h4>You did not save any product yet</h4>
            ) : (

                <div className="row row-cols-1 row-cols-md-3 g-4 mx-auto">
                    {cardsArr.map((item) => {
                        return (
                            <div className="card" key={item._id}>
                                <img className="productPic" src={item.image} alt="Product pic" />
                                <p className="card-text"> <strong>Type:</strong> {item.productType}</p>
                                <p className="card-text"> <strong>Price:</strong> {item.price}$</p>

                                <button className="btn btn-outline-dark" onClick={handleShow} id={item._id}>Show more</button>

                                <Modal show={show} onHide={handleClose}>

                                    <Modal.Header>
                                        <img className="productPic" src={product.image} alt="Product pic" />
                                    </Modal.Header>
                                    <Modal.Body>
                                        <h5>About the product:</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text"> <strong>Type:</strong> {product.productType}</p>
                                        <p className="card-text"> <strong>Price:</strong> {product.price}$</p>
                                        <p className="card-text"> <strong>Created At:</strong> {product.creationDate}</p>
                                        <p className="card-text"> <strong>Contact: </strong> {product.name} - {product.phone}</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <span onClick={() => handleRemoveFavorite(product._id)}><BsHeart /> Remove from favorites</span>
                                    </Modal.Footer>
                                </Modal>

                            </div>

                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default FavoriteProducts;