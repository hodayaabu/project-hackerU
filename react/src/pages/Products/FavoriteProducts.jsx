import axios from "axios";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react"
import ModalCard from "../../components/ModalCard";

//Import css
import '../../css/card.css';

const FavoriteProducts = () => {
    const [cardsArr, setCardsArr] = useState([]);
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState({});

    // Request for all the favorite product
    useEffect(() => {
        axios.get('/cards/favoriteCards')
            .then((response) => {
                setCardsArr(response.data)
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

    //When modal closed
    const handleClose = () => {
        setShow(false);
        setProduct({});
    }

    //When modal open
    const handleShow = (e) => {

        //Request for the product by id
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


    //When user clicked on remove from favorite
    const handleRemoveFavorite = (productId) => {

        axios.patch('cards/removeFavorite', { 'cardId': productId })
            .then((res) => {
                handleClose();
                setCardsArr(res.data)
                toast('The card has been removed from your favorites');
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

    return (
        <div>
            {cardsArr.length === 0 ? (
                <h4>You did not save any product yet</h4>
            ) : (

                <div className="cardsWrapper row row-cols-1 row-cols-md-4 g-4">

                    {cardsArr.map((item) => {
                        return (
                            <div className="card" key={item._id}>
                                <img className="productPic" src={item.image} alt="Product pic" />
                                <p className="card-text"> <strong>Type:</strong> {item.productType}</p>
                                <p className="card-text"> <strong>Price:</strong> {item.price}$</p>

                                <button className="btn btnShowMore" onClick={handleShow} id={item._id}>Show more</button>

                            </div>

                        )
                    })}

                    <ModalCard
                        handleClose={handleClose}
                        handleRemoveFavorite={handleRemoveFavorite}
                        handleFavorite={false}
                        product={product}
                        show={show}
                    />

                </div>
            )}
        </div>
    )
}

export default FavoriteProducts;