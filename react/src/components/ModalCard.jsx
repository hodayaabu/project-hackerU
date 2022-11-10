import { Modal } from 'react-bootstrap';
import { BsHeartFill, BsHeart } from 'react-icons/bs'

const ModalCard = ({ handleClose, handleFavorite, product, show, handleRemoveFavorite }) => {

    return (

        <Modal className="modalCard" show={show} onHide={handleClose} >

            <Modal.Header>
                <img className="productPic" src={product.image} alt="Product pic" />
            </Modal.Header>

            <Modal.Body>
                <h5 className="cardTitle">About the product:</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"> <strong>Type:</strong> {product.productType}</p>
                <p className="card-text"> <strong>Price:</strong> {product.price}$</p>
                <p className="card-text"> <strong>Created At:</strong> {product.creationDate}</p>
                <p className="card-text"> <strong>Contact: </strong> {product.name} - {product.phone}</p>
            </Modal.Body>

            <Modal.Footer>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                {handleFavorite ? (
                    <button type="button" className="btn handleAddToFavorite" onClick={() => handleFavorite(product._id)}><BsHeartFill /> Add to favorites</button>
                ) : (

                    <button
                        type="button"
                        className="btn handleRemoveFavorite"
                        onClick={() => handleRemoveFavorite(product._id)}>
                        <BsHeart /> Remove favorites
                    </button>
                )}
            </Modal.Footer>

        </Modal>
    )
}

export default ModalCard;