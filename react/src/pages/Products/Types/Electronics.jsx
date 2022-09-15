import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CardsNavigator from "../../../components/CardsNavigator"

const Electronics = () => {
    const [cardsArr, setCardsArr] = useState([]);

    useEffect(() => {
        axios.get('/cards/Electronics')
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

    const style = {
        width: "100%",
    }

    return (
        <>
            <CardsNavigator />
            <h3>All Electronics Product:</h3>
            <select aria-label="Default select example" onChange={handleSorted}>
                <option>Sort by price:</option>
                <option value="high">high to low</option>
                <option value="low">low to high</option>
            </select>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {cardsArr.map((item) => {
                    return (
                        <div className="card" key={item._id}>
                            <div className="col" >
                                <img className="productPic" src={item.image} style={style} alt="Product pic" />
                                <p className="card-text">Type: {item.productType}</p>
                                <p className="card-text">Price: {item.price}</p>
                                <button type="button" className="btn btn-outline-info" key={item._id} data-bs-toggle="modal" data-bs-target="#productCard">
                                    Go to the product
                                </button>

                                <div className="modal fade" id="productCard" tabindex="-1" aria-labelledby="productCardLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <img className="productPic" src={item.image} style={style} alt="Product pic" />
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="productCardLabel">About the product:</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <p className="card-text">{item.description}</p>
                                                <p className="card-text">Type: {item.productType}</p>
                                                <p className="card-text">Price: {item.price}</p>
                                            </div>

                                            <div>
                                                <h6>Contact Information:
                                                </h6>
                                                <p className="card-text">{item.name} - {item.phone}</p>
                                            </div>


                                            <div className="modal-footer">
                                                Created at: {item.creationDate}
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
};

export default Electronics;