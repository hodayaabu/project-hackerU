import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteItem from "../components/DeleteItem";

//import style:
import '../css/users.css';

const Users = () => {
    const [usersArr, setUsersArr] = useState([]);
    const [search, setSearch] = useState('');

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

    const handleDeleteUser = (id) => {
        axios.delete('/users/deleteUser', { headers: { 'user-id': id } })
            .then((response) => {
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
                                    <th>Name</th>
                                    <th>City</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Admin?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersArr
                                    .filter((item) => {
                                        return search.toLocaleLowerCase() === '' ? item : item.name.toLocaleLowerCase().includes(search);
                                    })
                                    .map((item) => (

                                        <div className="t">
                                            <tr key={item._id}>
                                                <td aria-label='Name'>{item.name}</td>
                                                <td aria-label='City'>{item.city}</td>
                                                <td aria-label='Email'>{item.email}</td>
                                                <td aria-label='Phone'>{item.phone}</td>
                                                <td aria-label='Admin?'>{handleAdmin(item.admin)}</td>

                                                <td><DeleteItem onDelete={handleDeleteUser} id={item._id} /></td>
                                            </tr>
                                        </div>
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