import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

//import css
import '../css/login&signup.css';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/
const EMAIL_REGEX = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]$/;
const PHONE_REGEX = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {

    const [userName, setUserName] = useState('');
    const [validUserName, setValidUserName] = useState(false);

    const [city, setCity] = useState('');
    const [validCity, setValidCity] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const result = USER_REGEX.test(userName);
        setValidUserName(result);
    }, [userName])

    useEffect(() => {
        const result = city.length > 4;
        setValidCity(result);
    }, [city])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PHONE_REGEX.test(phone);
        setValidPhone(result);
    }, [phone])

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
    }, [password])

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("userName:", userName);
        console.log("city:", city);
        console.log("email:", email);
        console.log("phone:", phone);
        console.log("password:", password);

        axios.post(
            '/users/signup',
            {
                name: userName,
                city,
                email,
                phone,
                password,
            }
        )
            .then((response) => {
                setSuccess(true);
                toast('You have successfully registered');
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
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <Link to={'/login'}>Sign In</Link>
                </section >
            ) : (
                <section>
                    <h1>Signup</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="inputFirstName" className="form-label">
                                User Name:
                                <span className={validUserName ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validUserName || !userName ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputFirstName"
                                onChange={handleUserNameChange}
                                value={userName}
                                required
                                aria-describedby="uidnote" />
                            <p id="uidnote" className={userName && !validUserName ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters. <br />
                                Must begin with a letter. <br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputCity" className="form-label">
                                City:
                                <span className={validCity ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validCity || !city ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputCity"
                                onChange={handleCityChange}
                                value={city}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">
                                Email:
                                <span className={validEmail ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validEmail || !email ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                onChange={handleEmailChange}
                                value={email}
                                required
                                email
                                aria-describedby="emailnote"
                            />
                            <p id="emailnote" className={email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Please enter a valid email.
                            </p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputTelephone" className="form-label">
                                Phone Number:
                                <span className={validPhone ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validPhone || !phone ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="tel"
                                className="form-control"
                                id="inputTelephone"
                                onChange={handlePhoneChange}
                                value={phone}
                                aria-describedby="phonenote"
                                required
                            />
                            <p id="phonenote" className={phone && !validPhone ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Please enter a valid phone number.
                            </p>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">
                                Password:
                                <span className={validPassword ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validPassword || !password ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                aria-describedby="pwdnote"
                                onChange={handlePasswordChange}
                                value={password}
                                required
                            />
                            <p id="pwdnote" className={password && !validPassword ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters. <br />
                                Must include uppercase and lowercase, a number and a special character. <br />
                                Allowed special characters:
                                <span aria-label="exclamation mark">!</span>
                                <span aria-label="at symbol">@</span>
                                <span aria-label="hashtag">#</span>
                                <span aria-label="dollar sign">$</span>
                                <span aria-label="percent">%</span>
                            </p>
                        </div>
                        <p>
                            <Link to={'/login'} className="loginLink"> Already registered?</Link>
                        </p>
                        <button type="submit" className="btn signUpBtn" disabled={!validUserName || !validCity || !validEmail || !validPhone || !validPassword ? true : false}>Sign Up</button>

                    </form>
                </section>
            )}
        </>

    )
}


export default Signup;