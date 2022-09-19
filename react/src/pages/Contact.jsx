import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Contact = () => {
    const EMAIL_REGEX = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]$/;

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
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
        console.log(userName, email, description);

        // axios.post(
        //     '/users/contact',
        //     {
        //         name: userName,
        //         email,
        //     }
        // )
        //     .then((response) => {
        //         toast('We will get back to you as soon as possible');
        //     })
        //     .catch((err) => {
        //         console.log("err.request", err.request);

        //         if (err.response) {
        //             //error from server
        //             toast.error(err.response.data)
        //         } else if (err.request) {
        //             //error if server not responding
        //             toast.error('Something went wrong')
        //         } else {
        //             toast.error('Something went wrong')
        //         }
        //     });
    };
    return (
        <>
            <h3>We are here for you!</h3>
            <p>
                We will be happy to hear from you about any comments, requests or questions.
                All you need to do is fill out the form below.
            </p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Your name</Form.Label>
                    <Form.Control type="text" onChange={handleUserNameChange} value={userName} required controlId="formBasicText" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>
                        Email address for reply
                        <span className={validEmail ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validEmail || !email ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={email} required email aria-describedby="emailnote" />
                    <p id="emailnote" className={email && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Please enter a valid email.
                    </p>
                </Form.Group>
                <Form.Label>Leave your description here</Form.Label>
                <FloatingLabel controlId="floatingTextarea2" onChange={handleDescriptionChange} value={description} required>
                    <Form.Control
                        as="textarea"
                        style={{ height: '100px' }}
                    />
                </FloatingLabel>
                <Button variant="primary" type="submit" disabled={!validEmail || !description ? true : false}>
                    Submit
                </Button>
            </Form>
        </>
    )
};

export default Contact;