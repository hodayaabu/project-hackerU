import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Home = () => {
    const [cardsArr, setCardsArr] = useState([]);
    const history = useHistory();

    const handleGoToProduct = (id) => {
        history.push({
            pathname: '/productPage',
            search: id
        })
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
                        <div className="card" key={item._id}>
                            <div className="col" >
                                <img className="productPic" src={item.image} style={style} alt="Product pic" />
                                <p className="card-text"><strong>Type:</strong> {item.productType}</p>
                                <p className="card-text"><strong>Price:</strong> {item.price}$</p>
                                <button type="button" className="btn btn-outline-info" onClick={handleGoToProduct(item._id)}>
                                    Go to the product
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <span><Link to='/products'>click to another products...</Link></span>

        </>
    )
};

export default Home;