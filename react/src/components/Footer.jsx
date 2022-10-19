import { Link } from "react-router-dom";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import css:
import '../css/footer.css';

const Footer = () => {
    return (
        <>

            <div className="links">
                <blockquote className="blockquote mb-0">
                    <Link className="link" to='/privacyPolicy'>Privacy Policy</Link>
                    <p className="brakeLine">|</p>
                    <Link className="link" to="/contact">Contact Us</Link>
                    <p className="brakeLine">|</p>
                    <Link className="link" to='#' onClick={() => window.location = 'tel:0587611770'}>
                        <FontAwesomeIcon icon={faPhone} />
                    </Link>
                </blockquote>
            </div>
            <div className="mainFooter">
                <blockquote className="blockquote mb-0">
                    <footer className="blockquote-footer">
                        &copy; Hodaya Abu, 2022.
                        <br />
                        Do not make use of all the contents appearing in BUY&SELL site.
                    </footer>
                </blockquote>
            </div>
        </>
    )
};

export default Footer;