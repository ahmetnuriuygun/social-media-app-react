import {NavigationBar} from "../Components/Navbar";
import {LeftSidebar} from "../Components/LeftSidebar";

import {Button, Card, Col, Container, Form, ListGroup, Row, Tab, Tabs} from "react-bootstrap";
import {RightSidebar} from "../Components/RightSidebar";
import React, {useContext, useState} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {updateDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Avatar from "react-avatar";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../helpers/firebase"


function UpdateProfile() {
    const currentUser = useContext(CurrentUserContext);

    const [userToEdit, setUserToEdit] = useState(...currentUser);
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState(null);

    const handleSubmit = () => {
        updateDoc(userToEdit.ref, userToEdit);
        navigate("/home")
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
                    console.log(error.message)

                });
            setImage(null);

        })
        navigate("/home")
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
                            {/*<Avatar className='justify-content-center text-center align-items-center' src={userToEdit.profileImg} sx={{width:150,height:150}}/>*/}
                            <img src={userToEdit.profileImg ? userToEdit.profileImg : `images/blank-profile.jpg`}
                                 alt="img" style={{width: 150, height: 150}}
                                 className="justify-content-center text-center align-items-center"/>
                            <Form.Label className="d-block fw-bold">Profile Picture</Form.Label>
                            <Form.Control placeholder="Profile Picture" type="file" name="profileImg"
                                          onChange={handleImageChange}/>

                        </Form.Group>
                        <input className="btn btn-success m-3 btn-block " type="submit" value="Change Profile Picture"/>

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

function PremiumContent() {
    const currentUser = useContext(CurrentUserContext);

    return(
       <div>
           <h1>Pricing Plans</h1>
           <p>Friend Space premium packages gives you a big opportunity to discover and make connect with your friends.</p>
           <Container>
               <Row>
                   <Col>
                       <Card className="text-center" style={{ width: '18rem' }}>
                           <Card.Header>Featured</Card.Header>
                           <Card.Body>
                               <Card.Title>Special title treatment</Card.Title>
                               <Card.Text>
                                   With supporting text below as a natural lead-in to additional content.
                               </Card.Text>
                               <Button variant="primary">Go somewhere</Button>
                           </Card.Body>
                           <Card.Footer className="text-muted">2 days ago</Card.Footer>
                       </Card>
                   </Col>
               </Row>
           </Container>
       </div>
    )
}

export function Settings(props) {
    const {users} = props;
    return (
        <>

            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="d-none d-xl-block col-xl-3">
                        <LeftSidebar/>
                    </div>
                    <div className="main col-sm-12 col-lg-10  col-xl-6 ">
                        <Tabs
                            defaultActiveKey="profile"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="profile" title="Profile">
                                <UpdateProfile/>
                            </Tab>
                            <Tab eventKey="be-premium" title="Be Premium">
                                <PremiumContent/>
                            </Tab>
                            <Tab eventKey="account-settings" title="Settings">
                                Tab content for Home
                            </Tab>
                            <Tab eventKey="contact" title="Contact">
                                Tab content for Contact
                            </Tab>
                        </Tabs></div>
                    <div className="d-none d-lg-block col-lg-1 col-xl-3">
                        {/*<RightSidebar users={users}/>*/}
                    </div>
                </div>
            </div>

        </>

    )
}