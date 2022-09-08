import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from 'react-toastify';

const Profile = () => {
    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('/users/me')
            .then((response) => {
                setUser(response.data);
            })
    }, []);

    const [updatedName, setUpdateName] = useState(user.name);
    const [updatedGender, setUpdateGender] = useState(user.gender);
    const [updatedAge, setUpdateAge] = useState(user.age);
    const [updatedCity, setUpdateCity] = useState(user.city);
    const [updatedPhone, setUpdatePhone] = useState(user.phone);

    const style = {
        width: "8%",
        borderRadius: "50%"
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

    const handleBtnUpdate = (e) => {
        e.preventDefault();

        axios.patch('/users/update', { name: updatedName, gender: updatedGender, age: updatedAge, city: updatedCity, phone: updatedPhone }, { headers: { 'user-email': user.email } })
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
                <img className="userPic" src={user.image} style={style} alt="User pic" />
                <h5 className="card-title">{user.name}</h5>
                <div className="card-body">
                    <p className="card-text">{user.gender}</p>
                    <p className="card-text">{user.age}</p>
                    <p className="card-text">{user.city}</p>
                    <p className="card-text">{user.email}</p>
                    <p className="card-text">{user.phone}</p>
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
                <label>Gender:</label>
                <input
                    type="text"
                    style={editMode}
                    value={updatedGender}
                    onChange={(e) => setUpdateGender(e.target.value)}
                />
                <br />
                <br />
                <label>Age:</label>
                <input
                    type="text"
                    style={editMode}
                    value={updatedAge}
                    onChange={(e) => setUpdateAge(e.target.value)}
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