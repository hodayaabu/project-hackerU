import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';

const Home = () => {
    const [cardsArr, setCardsArr] = useState([]);
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState({});

    const cardStyle = {
        width: '25%',
        margin: '3%'
    }

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


    useEffect(() => {
        axios.get('/cards/allCards')
            .then((response) => {
                const arr = [response.data[0], response.data[1], response.data[2]];
                setCardsArr(arr);
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

    const style = {
        width: "100%",
    }

    return (
        <>
            <h1>Welcome</h1>
            <div>
                <h3>Secondary Title</h3>
                <p>Some text about the site</p>
            </div>

            <div className="row row-cols-1 row-cols-md-4 g-4">
                {cardsArr.map((item) => {
                    return (
                        <div className="card" style={cardStyle} key={item._id}>
                            <img className="productPic" src={item.image} style={style} alt="Product pic" />
                            <p className="card-text"> <strong>Type:</strong> {item.productType}</p>
                            <p className="card-text"> <strong>Price:</strong> {item.price}$</p>

                            <button className="btn btn-outline-dark" onClick={handleShow} id={item._id}>Show more</button>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Dialog >
                                    <Modal.Header>
                                        <img className="productPic" src={product.image} style={style} alt="Product pic" />
                                    </Modal.Header>
                                    <Modal.Body>
                                        <h5>About the product:</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text"> <strong>Type:</strong> {product.productType}</p>
                                        <p className="card-text"> <strong>Price:</strong> {product.price}$</p>
                                        <p className="card-text"> <strong>Contact: </strong> {product.name} - {product.phone}</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        Created at: {product.creationDate}
                                        <button type="button" onClick={handleClose} className="btn btn-secondary">Close</button>
                                    </Modal.Footer>
                                </Modal.Dialog>
                            </Modal>

                        </div>

                    )
                })}
            </div>
            <span><Link to='/products'>click to another products...</Link></span>

        </>
    )
};

export default Home;