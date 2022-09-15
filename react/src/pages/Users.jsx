import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteItem from "../components/DeleteItem";

const Users = () => {
    const [usersArr, setUsersArr] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {

        axios.get('/users/allUsers', { headers: { 'admin-token': localStorage.getItem("token") } })
            .then((response) => {
                setUsersArr(response.data);
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
    }, []);

    const handleDeleteUser = (id) => {
        axios.delete('/users/deleteUser', { headers: { 'admin-token': localStorage.getItem("token"), 'user-id': id } })
            .then((response) => {
                setUsersArr(response.data);
                toast('The user has been deleted successfully')
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

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleAdmin = (admin) => {
        return admin ? 'Yes' : 'No';
    }

    return (
        <>

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
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.city}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{handleAdmin(item.admin)}</td>

                                    <td><DeleteItem onDelete={handleDeleteUser} id={item._id} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Users