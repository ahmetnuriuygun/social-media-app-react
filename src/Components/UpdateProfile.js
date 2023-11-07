import React, {useContext, useState} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {useNavigate} from "react-router-dom";
import {updateDoc} from "firebase/firestore";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../helpers/firebase";
import {Col, Form, Row} from "react-bootstrap";
import {toastErrorNotify, toastInfoNotify, toastSuccessNotify} from "../helpers/toastNotify";

export function UpdateProfile() {
    const currentUser = useContext(CurrentUserContext);

    const [userToEdit, setUserToEdit] = useState(currentUser);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);

    const handleSubmit = async () => {
        try{
            updateDoc(userToEdit.ref, userToEdit)
        }catch(err){
            toastErrorNotify(err.message)
        }

        navigate("/home");
        toastInfoNotify("You updated your profile information.")




    }

    const handleChange = (e) => {
        setUserToEdit({...userToEdit, [e.target.name]: e.target.value})
    }

    const handleImageSubmit = () => {
        const storageRef = ref(storage, "images/" + image.name);
        uploadBytes(storageRef, image).then((snapshot) => {
            getDownloadURL(storageRef)
                .then((url) => {
                    setUrl(url);
                    updateDoc(userToEdit.ref, {profileImg: url});
                })
                .catch((error) => {
                    toastErrorNotify(error.message)

                });
            setImage(null);

        })
        navigate("/home");
        toastSuccessNotify("You changed your profile photo")
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0])

    }

    return (
        <>
            <Form onSubmit={handleImageSubmit}>
                <Row>
                    <Col className="mb-3 d-flex justify-content-center flex-column">
                        <Form.Group>
                            <div className='img-update-div'>
                                <img src={userToEdit.profileImg ? userToEdit.profileImg : `images/blank-profile.jpg`}
                                     alt="img" style={{width: 150, height: 150}}
                                />
                            </div>

                            <Form.Label className="d-block fw-bold">Profile Picture</Form.Label>
                            <Form.Control placeholder="Profile Picture" type="file" name="profileImg"
                                          onChange={handleImageChange}/>

                        </Form.Group>
                        <input className="btn btn-success m-3 btn-block" type="submit" value="Change Profile Picture"/>

                    </Col>
                </Row>

            </Form>

            <Form onSubmit={handleSubmit}>


                <Row>
                    <Col md="6">
                        <Form.Group>
                            <Form.Label className="d-block fw-bold">First Name</Form.Label>
                            <Form.Control placeholder="First Name" type="text" name="firstName"
                                          value={userToEdit.firstName}
                                          onChange={handleChange}/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label className="d-block fw-bold">Last Name</Form.Label>
                            <Form.Control placeholder="Last Name" type="text" name="lastName"
                                          value={userToEdit.lastName}
                                          onChange={handleChange}/>

                        </Form.Group>

                    </Col>
                </Row>

                <Row>
                    <Col className="mt-3">
                        <Form.Group>
                            <Form.Label className="d-block fw-bold">Email</Form.Label>
                            <Form.Control placeholder="Email adress" type="email" name="email" value={userToEdit.email}
                                          readOnly
                                          onChange={handleChange}/>

                        </Form.Group>


                    </Col>
                </Row>

                <Row>
                    <Col className="mt-3">
                        <Form.Group>
                            <Form.Label className="d-block fw-bold">Password</Form.Label>
                            <Form.Control placeholder="Password" type="password" required name="password"
                                          value={userToEdit.password}
                                          onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col className="mt-3">
                        <Form.Label className="d-block fw-bold">Date of Birth</Form.Label>
                        <Form.Control type="date" placeholder="Date of birth" required name="birthDate"
                                      value={userToEdit.birthDate}
                                      onChange={handleChange}/>
                    </Col>
                </Row>

                <Row>
                    <Col className="mt-3">
                        <Form.Label className="d-block fw-bold">Gender: </Form.Label>
                        <Form.Check type="radio" name="gender" id="inlineRadio1" value={userToEdit.gender}
                                    label="Female"
                                    inline
                                    onChange={handleChange}/>
                        <Form.Check type="radio" name="gender" id="inlineRadio2" value={userToEdit.gender} label="Male"
                                    inline
                                    onChange={handleChange}/>
                        <Form.Check type="radio" name="gender" id="inlineRadio3" value={userToEdit.gender} label="Other"
                                    inline
                                    onChange={handleChange}/>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col md="6">
                        <Form.Group>
                            <Form.Label className="d-block fw-bold">Country</Form.Label>
                            <Form.Control placeholder="Country" type="text" name="country"
                                          value={userToEdit.country}
                                          onChange={handleChange}/>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label className="d-block fw-bold">City</Form.Label>
                            <Form.Control placeholder="City" type="text" name="city" value={userToEdit.city}
                                          onChange={handleChange}/>

                        </Form.Group>

                    </Col>
                </Row>

                <Row>
                    <Col className="mb-3 d-flex justify-content-center flex-column">
                        <input className="btn btn-success m-3 btn-block " type="submit" value="Update"/>
                    </Col>
                </Row>


            </Form>
        </>
    );
}