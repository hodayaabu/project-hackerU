import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//import style:
import "../css/deleteItemComponent.css";

const DeleteItem = ({ onDelete, id }) => {

    const handleBtnDelete = () => {
        onDelete(id);
    };

    return (
        <>
            <button
                className="trashIcon"
                type="button"
                onClick={handleBtnDelete}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </>
    )
}

export default DeleteItem;