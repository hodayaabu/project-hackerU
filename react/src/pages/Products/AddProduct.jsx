import axios from "axios";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaPlusCircle } from "react-icons/fa";

const AddProduct = () => {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('');

    const focusRef = useRef();

    useEffect(() => {
        focusRef.current.focus();
    }, []);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }

    const handleImageChange = (e) => {
        setImage(e.target.value)
    }

    const handleTypeChange = (e) => {
        setType(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/cards', { image, description, price, productType: type })
            .then((response) => {
                setDescription('');
                setPrice('');
                setImage('')
                setType('')
                toast('Your card has been successfully written');
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
            <h3>Add New Product: </h3>
            <div >
                <form className="CardForm" onSubmit={handleSubmit}>

                    <label htmlFor="imageInput">Write image link here:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageInput"
                        value={image}
                        onChange={handleImageChange}
                        ref={focusRef}
                    />

                    <label htmlFor="descriptionInput">Write description about the product here:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descriptionInput"
                        value={description}
                        onChange={handleDescriptionChange}
                        ref={focusRef}
                    />

                    <label htmlFor="priceInput">product price: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="priceInput"
                        value={price}
                        onChange={handlePriceChange}
                        ref={focusRef}
                    />
                    <br />
                    <div className="mb-3">
                        <select className="form-select" aria-label="Default select example" onChange={handleTypeChange}>
                            <option>Product Type: </option>
                            <option value="Electronics">Electronics</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Sport">Sport</option>
                            <option value="Fashion">Fashion</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                    <button type="submit" disabled={!description || !price || !type || !image ? true : false}>
                        <FaPlusCircle />
                    </button>
                </form>
            </div>
        </>
    )
};

export default AddProduct;