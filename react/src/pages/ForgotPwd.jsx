import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

const EMAIL_REGEX = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]$/;

const ForgotPwd
    = () => {
        const [email, setEmail] = useState("");
        const [validEmail, setValidEmail] = useState(false);

        const focusRef = useRef();


        const handleEmailChange = (ev) => {
            setEmail(ev.target.value);
        };

        useEffect(() => {
            focusRef.current.focus();
        }, []);

        useEffect(() => {
            const result = EMAIL_REGEX.test(email);
            setValidEmail(result);
        }, [email])

        const handleSubmit = (ev) => {
            ev.preventDefault();

            axios
                .post("/users/forgotPassword", { email })
                .then((response) => {
                    console.log("response", response);
                    window.location.href = response.data
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

                <h1>Update Password</h1>
                <form onSubmit={handleSubmit}>

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

                    <button type="submit" className="btn btn-primary" disabled={!validEmail || !email ? true : false}>
                        Submit
                    </button>
                </form>
            </section>
        );

    };

export default ForgotPwd
    ;
