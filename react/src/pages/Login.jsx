import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authActions } from "../store/auth.redux";
import { toast } from "react-toastify";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]$/;

const Login = () => {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const focusRef = useRef();
    const history = useHistory();

    //redux
    const dispatch = useDispatch();

    const handleEmailChange = (ev) => {
        setEmail(ev.target.value);
    };
    const handlePasswordChange = (ev) => {
        setPassword(ev.target.value);
    };

    useEffect(() => {
        focusRef.current.focus();
    }, []);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
    }, [password])

    const handleSubmit = (ev) => {
        ev.preventDefault();

        axios
            .post("/users/login", { email: email, password: password })
            .then((response) => {
                console.log("response", response);

                //save token from server to local storage
                localStorage.setItem("token", response.data.token);
                dispatch(authActions.login());
                toast('you logged in successfully');
                history.push('/myCards');

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
        <section>

            <h1>Login</h1>
            <form className="loginForm" onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address:

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
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={handleEmailChange}
                        ref={focusRef}
                    />
                    <div id="emailHelp" className={email && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Please enter a valid email.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
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
                        id="exampleInputPassword1"
                        aria-describedby="pwdnote"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <div id="pwdnote" className={!validPassword && password ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters. <br />
                        Must include uppercase and lowercase, a number and a special character. <br />
                        Allowed special characters:
                        <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span>
                        <span aria-label="percent">%</span>
                    </div>
                </div>
                <div>
                    <p> You forgot your password?
                        <br />
                        <Link to={'/updatePwd'}>Update password</Link>
                    </p>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!validEmail || !validPassword ? true : false}>
                    Submit
                </button>
            </form>

            <div>
                <h6> You are not registered?
                    <br />
                    <Link to={'/signup'}>Sign up</Link>
                </h6>
            </div>
        </section>
    );

};

export default Login;
