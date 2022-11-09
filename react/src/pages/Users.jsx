import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteItem from "../components/DeleteItem";

//Import style:
import '../css/users.css';

const Users = () => {
    const [usersArr, setUsersArr] = useState([]);
    const [search, setSearch] = useState('');

    //Find all the users
    useEffect(() => {
        axios.get('/users/allUsers', { headers: { 'admin-token': localStorage.getItem("token") } })
            .then((response) => {
                setUsersArr(response.data);
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
    }, []);

    //When admin clicked on delete user
    const handleDeleteUser = (id) => {
        axios.delete('/users/deleteUser', { headers: { 'user-id': id } })
            .then((response) => {

                //Update rhe new users array
                setUsersArr(response.data);
                toast('The user has been deleted successfully')
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

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleAdmin = (admin) => {
        return admin ? 'Admin' : 'User';
    }

    return (
        <>
            {usersArr.length < 1 ? (
                <div className="container">
                    <h4>There is no users yet</h4>
                </div>
            ) : (

                <div className="container">
                    <h1>All the users</h1>

                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search user by name"
                            aria-label="Search"
                            onChange={handleSearch}
                        />
                    </form>

                    <div >
                        <table className="table">

                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Admin?</th>
                                </tr>
                            </thead>

                            <tbody>
                                {usersArr
                                    .filter((item) => {
                                        return search.toLocaleLowerCase() === '' ? item : item.name.toLocaleLowerCase().includes(search);
                                    })
                                    .map((item) => (
                                        <tr key={item._id}>
                                            <td >{item.name}</td>
                                            <td >{item.city}</td>
                                            <td >{item.email}</td>
                                            <td >{item.phone}</td>
                                            <td >{handleAdmin(item.admin)}</td>

                                            <th scope="row"><DeleteItem onDelete={handleDeleteUser} id={item._id} /></th>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default Users