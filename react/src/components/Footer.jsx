import { Link } from "react-router-dom";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import css:
import '../css/footer.css';

const Footer = () => {
    return (
        <>
            <div className="mainFooter">
                <blockquote className="blockquote mb-0">
                    <footer className="blockquote-footer">
                        All rights reserved to Hodaya Abu Ltd.
                        <br />
                        Do not make use of all the contents appearing in BUY&SELL site.
                    </footer>
                </blockquote>
            </div>
            <div className="links">
                <blockquote className="blockquote mb-0">
                    <Link className="link" to='/privacyPolicy'>Privacy Policy</Link>
                    |
                    <Link className="link" to="/contact">Contact Us</Link>
                    |
                    <Link className="link" to='#' onClick={() => window.location = 'tel:0587611770'}>
                        <FontAwesomeIcon icon={faPhone} />
                    </Link>
                </blockquote>
            </div>
        </>
    )
};

export default Footer;