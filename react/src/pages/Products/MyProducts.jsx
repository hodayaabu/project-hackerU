import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyCard from "../../components/MyCard";

const MyProducts = () => {
    const [cardsArr, setCardsArr] = useState([]);

    // Request for all my products
    useEffect(() => {
        axios.get('/cards/myAllCards')
            .then((response) => {
                setCardsArr(response.data)
            })
    }, [])


    //When user clicked on delete product
    const handleDeleteCard = (id) => {
        axios.delete('/cards/myCard', { headers: { 'id-card': id } })
            .then((response) => {
                setCardsArr(response.data);
                toast('The card has been deleted successfully')
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

    //When user clicked on update product
    const handleUpdateCard = (id, updatedImage, updatedDescription, updatedPrice, updatedType) => {
        axios.patch('/cards/myCard',
            { image: updatedImage, description: updatedDescription, price: updatedPrice, productType: updatedType }, { headers: { 'id-card': id } })

            .then((response) => {
                setCardsArr(response.data)
                toast('The card has been updated successfully')
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
        <>
            {cardsArr.length > 0 ? (
                <div className="container">

                    <h5>My Products</h5>

                    <div className="row row-cols-1 row-cols-md-3 g-4 cardsWrapper">

                        {cardsArr.map((item) => {
                            return (
                                <MyCard
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
                </div>
            ) : (
                <div className="container">
                    <h4>You have not uploaded any products yet</h4>
                </div>
            )}
        </>
    )
};

export default MyProducts;




