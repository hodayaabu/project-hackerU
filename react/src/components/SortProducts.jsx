

const SortProducts = ({ handleSorted }) => {
    return (
        <select onChange={handleSorted}>
            <option>Sort by price:</option>
            <option value="high">high to low</option>
            <option value="low">low to high</option>
        </select>
    )
}

export default SortProducts;