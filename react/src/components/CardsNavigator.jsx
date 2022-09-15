import React from "react";
import { NavLink } from "react-router-dom";

const CardsNavigator = () => {

    return (
        <nav className="navbar navbar-expand-lg bg-ligh">

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/electronics" exact>Electronics</NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/furniture" exact>Furniture</NavLink>
                    </li>

                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/sport" exact>Sport</NavLink>
                    </li>

                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/fashion" exact>Fashion</NavLink>
                    </li>

                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/other" exact>Other</NavLink>
                    </li>
                </ul>

            </div>
        </nav>
    )
}

export default CardsNavigator;