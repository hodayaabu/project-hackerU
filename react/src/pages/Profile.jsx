import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from 'react-toastify';

const Profile = () => {
    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState({});

    const { name, city, phone, email } = user;
    const [updatedName, setUpdateName] = useState('');
    const [updatedCity, setUpdateCity] = useState('');
    const [updatedPhone, setUpdatePhone] = useState('');

    useEffect(() => {
        axios.get('/users/me')
            .then((response) => {
                setUser(response.data);
            })
    }, []);



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

    const handleBtnUpdate = (e) => {
        e.preventDefault();

        axios.patch('/users/update', { name: updatedName, city: updatedCity, phone: updatedPhone }, { headers: { 'user-email': user.email } })
            .then((response) => {
                setUser(response.data);
                toast('you updated your profile successfully');
                setEditing(false);
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
        <div className="card" >
            <div className="col" onDoubleClick={handleEditing} style={viewMode}>
                <h5 className="card-title">{name}</h5>
                <div className="card-body">
                    <p className="card-text">{city}</p>
                    <p className="card-text">{email}</p>
                    <p className="card-text">{phone}</p>
                </div>
            </div>

            <div style={editMode}>
                <label>Name:</label>
                <input
                    type="text"
                    style={editMode}
                    value={updatedName}
                    onChange={(e) => setUpdateName(e.target.value)}
                />
                <br />
                <br />
                <label>City:</label>
                <input
                    type="text"
                    style={editMode}
                    value={updatedCity}
                    onChange={(e) => setUpdateCity(e.target.value)}
                />
                <br />
                <br />
                <label>Phone:</label>
                <input
                    type="text"
                    style={editMode}
                    value={updatedPhone}
                    onChange={(e) => setUpdatePhone(e.target.value)}
                />
                <br />
                <br />
                <button onClick={handleBtnUpdate} style={editMode}>Update</button>
            </div>
        </div>

    );
};

export default Profile;