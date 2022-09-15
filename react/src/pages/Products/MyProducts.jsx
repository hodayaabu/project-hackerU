import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "../../components/Card";

const MyProducts = () => {
    const [cardsArr, setCardsArr] = useState([]);

    useEffect(() => {
        axios.get('/cards/myAllCards')
            .then((response) => {
                setCardsArr(response.data)
            })
    }, [])

    const handleDeleteCard = (id) => {
        axios.delete('/cards/myCard', { headers: { 'id-card': id } })
            .then((response) => {
                setCardsArr(response.data);
                toast('The card has been deleted successfully')
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

    const handleUpdateCard = (id, updatedImage, updatedDescription, updatedPrice, updatedType) => {
        axios.patch('/cards/myCard',
            { image: updatedImage, description: updatedDescription, price: updatedPrice, productType: updatedType }, { headers: { 'id-card': id } })

            .then((response) => {
                setCardsArr(response.data)
                toast('The card has been updated successfully')
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

    return (
        <>
            <h3>My Products</h3>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {cardsArr.map((item) => {
                    return (
                        <Card
                            name={item.name}
                            phone={item.phone}
                            desc={item.description}
                            price={item.price}
                            creationDate={item.creationDate}
                            image={item.image}
                            type={item.productType}
                            id={item._id}
                            key={item._id}
                            onDelete={handleDeleteCard}
                            setUpdateCard={handleUpdateCard}
                        />
                    );
                })}
            </div>
        </>
    )
};

export default MyProducts;