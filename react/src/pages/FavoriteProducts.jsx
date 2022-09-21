import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";

const FavoriteProducts = () => {
    const [idCardsArr, setIdCardsArr] = useState([]);
    const [cardsArr, setCardsArr] = useState([]);

    useEffect(() => {
        axios.get('/users/favoriteCards')
            .then((response) => {
                setIdCardsArr(response.data)
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

    useEffect(() => {
        let newArr = [];
        for (let i = 0; i < idCardsArr.length; i++) {
            axios.get('cards/myCard', { headers: { 'id-card': idCardsArr[i] } })
                .then(res => {
                    console.log(res.data);
                })
        }
        console.log(newArr);
    }, [idCardsArr])

    // console.log(cardsArr);
    return (
        <div></div>
    )
}

export default FavoriteProducts;