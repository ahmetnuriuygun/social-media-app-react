import {NavigationBar} from "../Components/Navbar";
import {LeftSidebar} from "../Components/LeftSidebar";
import {Button, Card, Col, Container, Form, ListGroup, Modal, Row, Tab, Tabs} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {updateDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../helpers/firebase"
import {ThemeContext} from "../context/ThemeContext";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import * as PropTypes from "prop-types";
import {logOut} from "../helpers/functions";
import {RightSidebar} from "../Components/RightSidebar";



function UpdateProfile() {
    const currentUser = useContext(CurrentUserContext);

    const [userToEdit, setUserToEdit] = useState(currentUser);
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

function PremiumContent() {

    return(
       <div>
           <div className='mt-2 text-center'>
               <h1>Pricing Plans</h1>
               <p>Friend Space premium packages gives you a big opportunity to discover and make connect with your friends.</p>
           </div>

           <Container>
               <Row>
                   <Col>
                       <Card className="text-center premium-cards" style={{ width: '18rem', height:'23rem'}}>
                           <Card.Header>Start</Card.Header>
                           <Card.Body>
                               <Card.Title>Free</Card.Title>
                               <Card.Text>
                                   <ul className='list-group' >
                                       <li className='list-group-item'>50 friends</li>
                                       <li className='list-group-item'>25 posts</li>
                                       <li className='list-group-item'>5 marketplace shopping</li>
                                       <li className='list-group-item'>Unlimited message</li>
                                   </ul>
                               </Card.Text>
                               <Button variant="danger">Get Plan</Button>
                           </Card.Body>
                           <Card.Footer className="text-muted">You are using free plan </Card.Footer>
                       </Card>

                   </Col>
                   <Col>
                       <Card className="text-center premium-cards" style={{ width: '18rem', height:'23rem' }}>
                           <Card.Header>Basic</Card.Header>
                           <Card.Body>
                               <Card.Title>14.99&euro;	</Card.Title>
                               <Card.Text>
                                   <ul className='list-group' >
                                       <li className='list-group-item'>250 friends</li>
                                       <li className='list-group-item'>50 posts</li>
                                       <li className='list-group-item'>10 marketplace shopping</li>

                                       <li className='list-group-item'>See who viewed your profile</li>
                                   </ul>
                               </Card.Text>
                               <Button variant="danger">Get Plan</Button>
                           </Card.Body>
                           <Card.Footer className="text-muted">Try basic plan for one month</Card.Footer>
                       </Card>

                   </Col>
               </Row>
               <Row className='mt-3'>
                   <Col>
                       <Card className="text-center premium-cards" style={{ width: '18rem', height:'23rem' }}>
                           <Card.Header>Medium</Card.Header>
                           <Card.Body>
                               <Card.Title>49.99&euro;	</Card.Title>
                               <Card.Text>
                                   <ul className='list-group' >
                                       <li className='list-group-item'>1000 friends</li>
                                       <li className='list-group-item'>200 posts</li>
                                       <li className='list-group-item'>25 marketplace shopping</li>
                                   </ul>
                               </Card.Text>
                               <Button variant="danger">Get Plan</Button>
                           </Card.Body>
                           <Card.Footer className="text-muted">Invite 10 friends to use medium plan 3 month free</Card.Footer>
                       </Card>
                   </Col>
                   <Col>
                       <Card className="text-center premium-cards" style={{ width: '18rem' , height:'23rem'}}>
                           <Card.Header>Expert</Card.Header>
                           <Card.Body>
                               <Card.Title>129.99&euro;</Card.Title>
                               <Card.Text>
                                   <ul className='list-group' >
                                       <li className='list-group-item'>Unlimited friends</li>
                                       <li className='list-group-item'>Unlimited posts</li>
                                       <li className='list-group-item'>Unlimited marketplace shopping</li>
                                   </ul>
                               </Card.Text>
                               <Button variant="danger">Get Plan</Button>
                           </Card.Body>
                           <Card.Footer className="text-muted">Invite 30 friends to use medium plan 3 month free</Card.Footer>
                       </Card>

                   </Col>
               </Row>
           </Container>
       </div>
    )
}

function StopAccountModal(props) {
    const {show,onHide,stopAccount} = props;
    return <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Dou you want to take a break</Modal.Title>
        </Modal.Header>
        <Modal.Body>Not Problem! You can deactiveer your friend space account temporarily. If you log in again your account will be active automatically.</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button variant="warning" onClick={stopAccount}>
                Deactiveer
            </Button>
        </Modal.Footer>
    </Modal>;
}

StopAccountModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    stopAccount: PropTypes.func
};

function RemoveAccountModal(props) {
    const {show,onHide,removeAccount,stopAccount} = props;
    return <Modal show={show} onHide={onHide} className='p-3'>
        <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to remove your account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h6>Give us some information? Why do you want to remove your account?</h6>
            <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">I spend so much time</option>
                <option value="2">I created second account </option>
                <option value="3">I have concerns about privacy</option>
                <option value="3">It is hard to use it.</option>
            </Form.Select>

            <h4 className='mt-3'>We can recommend you deactiveer your account instead of remove it.</h4>
        <Button variant="warning" onClick={stopAccount}>
            Deactiveer
        </Button>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Cancel
            </Button>
            <Button variant="primary" onClick={removeAccount}>
                Remove my account
            </Button>
        </Modal.Footer>
    </Modal>;
}

RemoveAccountModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    removeAccount: PropTypes.func,
    stopAccount: PropTypes.func,
};

function AccountManagement() {


    const [{theme,isDark},toggleTheme] = useContext(ThemeContext);
    const [showStopAccount, setShowStopAccount] = useState(false);
    const [showRemoveAccount, setShowRemoveAccount] = useState(false);
    const navigate = useNavigate()


    const stopAccount = () =>{
      logOut(navigate)
   }

   const handleStopAccountModal=() =>{
        setShowStopAccount(false);
    }

   const removeAccount = () =>{

    }

    const handleRemoveAccountModal=() =>{
        setShowRemoveAccount(false);
    }


    console.log("theme",theme)
    return (
        <div className='mt-3'>
            <div className='mt-3'>
                <h5>Use Friend Space in {isDark ? "Light Mode" : "Dark Mode"}</h5>
                <BootstrapSwitchButton
                    checked={isDark}
                    onlabel='Light'
                    offlabel='Dark'
                    onChange={toggleTheme}
                    onstyle="light"
                    offstyle="dark"
                    width={100}
                />
            </div>
            <div className='mt-3'>
                <h5>Deactiveer account</h5>
                <Button variant='warning' onClick={()=>setShowStopAccount(true)}>Deactiveer account</Button>
            </div>
            <div className='mt-3'>
                <h5>Remove Account</h5>
                <Button variant='danger' onClick={() => setShowRemoveAccount(true)}>Delete Account</Button>
            </div>

            <StopAccountModal show={showStopAccount} onHide={handleStopAccountModal} stopAccount={stopAccount} />

            <RemoveAccountModal show={showRemoveAccount} onHide={handleRemoveAccountModal} removeAccount={removeAccount} stopAccount={stopAccount} />

        </div>
    );
}

export function Settings(props) {
    const [{theme,isDark},toggleTheme] = useContext(ThemeContext);


    return (
        <>

            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="d-none d-xl-block col-xl-3">
                        <LeftSidebar/>
                    </div>
                    <div className="main col-sm-12 col-lg-10  col-xl-6 " style={{background:theme.backgroundColor,color:theme.color}}>
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
                            <Tab eventKey="account-management" title="Settings">
                                <AccountManagement/>
                            </Tab>
                            <Tab eventKey="contact" title="Contact">
                                Tab content for Contact
                            </Tab>
                        </Tabs></div>
                    <div className="d-none d-lg-block col-lg-1 col-xl-3">
                        <RightSidebar/>
                    </div>
                </div>
            </div>

        </>

    )
}