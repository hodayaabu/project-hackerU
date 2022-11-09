import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth.redux";
import { toast } from "react-toastify";
import { adminActions } from "../store/admin.redux";

const Logout = () => {
    const [userName, setUserName] = useState('');

    //Redux
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch();

    //Find the user
    useEffect(() => {
        axios.get('/users/me')
            .then((response) => {
                setUserName(response.data.name);
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


    const handleLogout = () => {
        localStorage.clear();
        dispatch(authActions.logout());
        dispatch(adminActions.noAdmin());
    }


    return (
        <>
            {loggedIn ? (
                <div className="mb-3">
                    <h3>Hey {userName} :)</h3>
                    <p> Do you want to log out?</p>
                    <button onClick={handleLogout} type="button" className="btn btn-danger">Logout</button>
                </div>
            ) : (
                <div className="mb-3">
                    <p>
                        You logged out successfully !
                        <br />
                        Hope to see you here again :)
                    </p>
                </div>
            )}
        </>
    )
};

export default Logout;