import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const ProductPage = () => {
    const [product, setProduct] = useState({});

    const location = useLocation();

    useEffect(() => {

        axios.get('/cards/myCard', { headers: { 'id-card': location.search } })
            .then((response) => {
                setProduct(response.data)
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
    }, [location])

    return (
        <div className="card" key={product.id}>
            <div>
                <img className="card-img-top" src={product.image} alt="Product pic" />
                <div className="card-body">
                    <h5 className="card-title">About The Product:</h5>
                    <p className="card-text">{product.desc}</p>
                    <p className="card-text"> <strong>Type:</strong> {product.type}</p>
                    <p className="card-text"> <strong>Price:</strong> {product.price}$</p>
                    <p className="card-text"> <strong>Contact: </strong> {product.name} - {product.phone}</p>
                </div>

                <div className="card-footer">
                    Created at: {product.creationDate}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
