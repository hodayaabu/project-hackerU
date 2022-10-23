import React from "react";
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { adminActions } from "../store/admin.redux";

//import css
import '../css/navbar.css';


const MainNavigator = () => {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const isAdmin = useSelector((state) => state.admin.isAdmin);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleAdminCheck = (e) => {
        e.preventDefault();
        axios
            .get("/users/me")
            .then((response) => {
                if (response.data.admin) {
                    dispatch(adminActions.admin());
                    toast('you logged in as an admin')
                    history.push('/Users');
                } else {
                    toast.error('Access denied, you are not an admin');
                    history.push('/MyFeedbacks');

                }
            })
            .catch((err) => {
                console.log("err.request", err.request);

                if (err.response) {
                    //error from server
                    console.log('from admin:', err.response.data);
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
        <>
            <div className="logo">
                <NavLink className="navbar-brand navbar-logo" to="/" exact >BUY & SELL</NavLink>
                <p className="logo-text">Buying and selling second hand products</p>
            </div>
            <nav className="navbar navbar-expand-lg bg-light">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        {loggedIn ? (
                            <li className="nav-item active logout">
                                <NavLink className="nav-link" to="/logout" exact>Logout</NavLink>
                            </li>
                        ) : (
                            <li className="nav-item active login">
                                <NavLink className="nav-link" to="/login" exact>Login</NavLink>
                            </li>
                        )}

                        <li className="nav-item btn-group">
                            <NavLink to="dropdown-menu" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Me
                            </NavLink>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/myProducts">My Products</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/favorite">Favorite Products</NavLink></li>
                            </ul>
                        </li>

                        <li className="nav-item btn-group">
                            <NavLink to="dropdown-menu" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Products
                            </NavLink>
                            <ul className="dropdown-menu">
                                <li><NavLink className="dropdown-item" to="/products">All Products</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/electronics">Electronics</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/fashion">Fashion</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/furniture">Furniture</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/sport">Sport</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/other">Other</NavLink></li>
                            </ul>
                        </li>

                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/addProduct" exact>Add Product</NavLink>
                        </li>

                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/contact" exact>Contact</NavLink>
                        </li>

                        {isAdmin ? (
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/users" exact>Users</NavLink>
                            </li>
                        ) : null}
                    </ul>

                    {loggedIn ? (
                        <button className=" btn btn-outline-info" onClick={handleAdminCheck}>are you Admin?</button>
                    ) : null}

                </div>
            </nav></>
    )
}

export default MainNavigator;