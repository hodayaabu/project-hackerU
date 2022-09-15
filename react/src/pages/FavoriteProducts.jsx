import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
import Card from "../components/Card";

const FavoriteProducts = () => {

    const [cardsArr, setCardsArr] = useState([]);

    useEffect(() => {
        axios.get('/cardsReview/myFavoriteCards')
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
    }, [])
    return (
        <div className="row row-cols-1 row-cols-md-4 g-4">
            {cardsArr.map((item) => {
                return (
                    <Card
                        name={item.name}
                        desc={item.description}
                        rating={item.rating}
                        creationDate={item.creationDate}
                        image={item.image}
                        id={item._id}
                        key={item._id}
                    />
                );
            })}
        </div>
    )
}

export default FavoriteProducts;