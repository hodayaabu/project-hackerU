import { useState } from "react";
import DeleteItem from "./DeleteItem";

const MyCard = (props) => {
    const [editing, setEditing] = useState(false);
    const [updatedDescription, setUpdateDescription] = useState(props.desc);
    const [updatedPrice, setUpdatedPrice] = useState(props.price);
    const [updatedType, setUpdatedType] = useState(props.type);
    const [updatedImage, setUpdatedImage] = useState(props.image);

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
        props.setUpdateCard(props.id, updatedImage, updatedDescription, updatedPrice, updatedType);
        setEditing(false);
    }

    const style = {
        'height': '30%'
    }

    return (
        <div className="card" style={style} key={props.id}>

            <div onDoubleClick={handleEditing} style={viewMode}>

                <img height='50%' className="card-img-top" src={props.image} alt="Product pic" />

                <div className="card-body">
                    <h5 className="card-title">About The Product:</h5>
                    <p className="card-text">{props.desc}</p>
                    <p className="card-text"> <strong>Type:</strong> {props.type}</p>
                    <p className="card-text"> <strong>Price:</strong> {props.price}$</p>
                    <p className="card-text"> <strong>Created at:</strong> {props.creationDate}</p>
                    <p className="card-text"> <strong>Contact: </strong> {props.name} - {props.phone}</p>
                </div>

                <div className="card-footer">
                    <div><small>Double click to edit the product</small></div>
                    <DeleteItem onDelete={props.onDelete} id={props.id} />
                </div>
            </div>


            {/* When edit mode is on this div will display: */}
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

export default MyCard;
