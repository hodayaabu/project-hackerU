import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

//Import css:
import '../css/contact.css';

const Contact = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [description, setDescription] = useState('');


    //Check if the user email is valid
    useEffect(() => {
        const EMAIL_REGEX = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]$/;
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(
            '/users/newMsg',
            {
                name: userName,
                email,
                msg: description
            }
        )
            .then((response) => {
                toast(response.data);
                setUserName('');
                setEmail('');
                setDescription('');
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
    };
    return (
        <>
            <h1>We here for you!</h1>

            <div className='contact'>
                <div className='contactForm'>
                    <p>
                        <strong> We will be happy to hear from you about any comments, requests or questions.
                            All you need to do is fill out the form below.</strong>
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="exampleInputName1" className="form-label">
                                Your Name:
                            </label>

                            <input
                                id="exampleInputName1"
                                type="text"
                                onChange={handleUserNameChange}
                                value={userName}
                                required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email Address:

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
                            />
                            <div id="emailHelp" className={email && !validEmail ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Please enter a valid email.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="descriptionInput">Write your message here:</label>

                            <textarea
                                className="form-control"
                                id="descriptionInput"
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                        </div>

                        <button className='contactFormBtn' type="submit" disabled={!validEmail || !description ? true : false}>
                            Send
                        </button>
                    </form>
                </div>

                <div className='contactInfo'>
                    <p><strong>You can also contact us in one of this options:</strong></p>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <br />
                        <Link to='#' className='emailLink' onClick={() => window.location = 'mailto:sellbuy442@gmail.com'}>
                            sellbuy442@gmail.com
                        </Link>
                        <br />
                        <label htmlFor="phone">Phone: </label>
                        <br />
                        <Link to='#' className='phoneLink' onClick={() => window.location = 'tel:0587611770'}>
                            0587611770
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Contact;