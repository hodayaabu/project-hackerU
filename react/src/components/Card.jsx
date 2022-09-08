import { useState } from "react";
import DeleteItem from "./DeleteItem";

const Card = (props) => {
    console.log(props.phone);
    const [editing, setEditing] = useState(false);
    const [updatedDescription, setUpdateDescription] = useState(props.desc);
    const [updatedPrice, setUpdatedPrice] = useState(props.price);
    const [updatedType, setUpdatedType] = useState(props.type);
    const [updatedImage, setUpdatedImage] = useState(props.image);


    const style = {
        width: "100%",
    }

    let viewMode = {};
    let editMode = {};

    if (editing) {
        viewMode.display = "none";
    } else {
        editMode.display = "none";
    }

    const handleEditing = () => {
        setEditing(true);
    };

    const handleBtnUpdate = () => {
        props.setUpdateCard(props.id, updatedImage, updatedDescription, updatedType, updatedPrice);
        setEditing(false);
    }

    return (
        <div className="card" >
            <div className="col" >
                <img className="productPic" src={props.image} style={style} alt="Product pic" />
                <button type="button" className="btn btn-outline-info" key={props.id} data-bs-toggle="modal" data-bs-target="#productCard">
                    Go to the product
                </button>

                <div className="modal fade" id="productCard" tabindex="-1" aria-labelledby="productCardLabel" aria-hidden="true">
                    <div className="modal-dialog" onDoubleClick={handleEditing} style={viewMode}>
                        <div className="modal-content">
                            <img className="productPic" src={props.image} style={style} alt="Product pic" />
                            <div className="modal-header">
                                <h5 className="modal-title" id="productCardLabel">About the product:</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p className="card-text">{props.desc}</p>
                                <p className="card-text">Type: {props.type}</p>
                                <p className="card-text">Price: {props.price}</p>
                            </div>

                            <div>
                                <h6>Contact Information:
                                </h6>
                                <p className="card-text">{props.name} - {props.phone}</p>
                            </div>


                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <DeleteItem onDelete={props.onDelete} id={props.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div style={editMode}>
                <label>Description:</label>
                <input
                    type="text"
                    style={editMode}
                    value={updatedDescription}
                    onChange={(e) => setUpdateDescription(e.target.value)}
                />

                <label>Image:</label>
                <input
                    type="text"
                    style={editMode}
                    value={updatedImage}
                    onChange={(e) => setUpdatedImage(e.target.value)}
                />

                <label>Type:</label>
                <input
                    type="text"
                    style={editMode}
                    value={updatedType}
                    onChange={(e) => setUpdatedType(e.target.value)}
                />

                <label>Price:</label>
                <input
                    type="text"
                    style={editMode}
                    value={updatedPrice}
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                />
                <button onClick={handleBtnUpdate} style={editMode}>Update</button>
            </div>
        </div>
    );
};

export default Card;
