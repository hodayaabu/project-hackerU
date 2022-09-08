import { FaTrash } from "react-icons/fa";

const DeleteItem = ({ onDelete, id }) => {

    const handleBtnDelete = () => {
        onDelete(id);
    };

    return (
        <>
            <button
                type="button"
                onClick={handleBtnDelete}>
                <FaTrash />
            </button>
        </>
    )
}

export default DeleteItem;