import { Link } from "react-router-dom";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
    return (
        <div className="card">
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <footer className="blockquote-footer">All rights reserved to Hodaya Abu Ltd. Do not make use of all the contents appearing in BUY&SELL site.</footer>
                    <p>
                        <Link to='/privacyPolicy'>Privacy Policy</Link>
                        |
                        <Link to="/contact">Contact Us</Link>
                        |
                        <Link to='#' onClick={() => window.location = 'tel:0587611770'}>
                            <FontAwesomeIcon icon={faPhone} />
                        </Link>
                    </p>
                </blockquote>
            </div>
        </div>
    )
};

export default Footer;