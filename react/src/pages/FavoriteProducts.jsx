import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";

const FavoriteProducts = () => {

    const [cardsArr, setCardsArr] = useState([]);

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
    }, [])
    console.log(cardsArr);
    return (
        <div></div>
    )
}

export default FavoriteProducts;