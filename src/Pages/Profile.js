import {NavigationBar} from "../Components/Navbar";
import {CurrentUserContext} from "../context/CurrentUserContext";
import React, {useContext, useState} from "react";
import {Button, Card, Col, Container, Form, InputGroup, Row, Tab, Tabs} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBriefcase,
    faCakeCandles, faCity,
    faGraduationCap, faHeart,
    faHouseChimney, faHouseChimneyUser, faMessage,
    faPen, faPhone,
    faSchool
} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate, useParams} from "react-router-dom";
import {PostInput} from "../Components/PostInput";
import {UsersContext} from "../context/UsersContext";
import {PostsContext} from "../context/PostsContext";
import {PostCard} from "../Components/Posts";
import {arrayRemove, updateDoc} from "firebase/firestore";
import * as PropTypes from "prop-types";

function FriendsCard(props) {
    const {friend} = props;
    console.log(friend)
    return (

        <Col className='col-6'>
            <Link to={`/profile/${friend.id}`}>
                <Card style={{width: '10rem'}}>
                    <Card.Img variant="top" src={friend.profileImg ? friend.profileImg : `/images/blank-profile.jpg`}
                              height='200rem'/>
                    <Card.Text>
                        <strong className='text-capitalize'>{friend.firstName} {friend.lastName}</strong>
                    </Card.Text>
                </Card>
            </Link>

        </Col>

    );
}

function Tag(props) {
    const {user} = props;
    const currentUser = useContext(CurrentUserContext);


    function calculateYear() {
        const dob = new Date(user.birthDate);
        const currentDate = new Date();
        let age = currentDate.getFullYear() - dob.getFullYear();
        if (
            currentDate.getMonth() < dob.getMonth() ||
            (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
        ) {
            age--;
        }
        return age;
    }

    return (
        <Card className="bg-white border border-rounded p-3" id="profile-page-cards">
            <h4>Tag</h4>
            {user.id === currentUser.id ?
                <Button className="btn btn-secondary btn-block mt-2 ">Add Biography</Button> : ""}
            <p className="mt-2"><FontAwesomeIcon icon={faHouseChimney} className="me-2"/> Lives
                in <strong>{props.user?.city}</strong></p>
            <p className="mt-2"><FontAwesomeIcon icon={faCakeCandles}
                                                 className="me-2"/><strong>{calculateYear()}</strong> years
                old </p>
            {user.id === currentUser.id ?
                <Button className="btn btn-secondary btn-block mt-2 ">Add Hobby</Button> : ""}
        </Card>
    );
}

Tag.propTypes = {
    user: PropTypes.any,
};

function AllFriendsCard(props) {
    const {user} = props;
    const users = useContext(UsersContext);

    let friendsArray = [];

    user.friends.map(id => {
        users.map(u => {
            if (u.id === id) {
                friendsArray.push(u);
            }
        })
    })
    return (
        <Card className="bg-white border border-rounded p-3" id="profile-page-cards">
            <Card.Title><h4 className="fw-bold">Friends</h4></Card.Title>
            <Card.Text>{user.friendsAmount} friends</Card.Text>
            <Container>
                <Row>
                    {friendsArray.map(f => <FriendsCard key={f.id} friend={f}/>)}
                </Row>
            </Container>
        </Card>
    );
}

AllFriendsCard.propTypes = {
    user: PropTypes.any,

};

function ProfilePostsTab(props) {
    const currentUser = useContext(CurrentUserContext);
    const postsContext = useContext(PostsContext);
    const {user} = props;


    let postsOfUser = [];
    postsContext.forEach(p => {
        if (p.ownerId === user?.id) {
            postsOfUser.push(p);
        }
    })


    return (
        <>
            <Container>
                <Row>
                    <Col className='col-12 col-lg-4'>
                        <Tag user={user} />
                    </Col>
                    <Col className='col-12 col-lg-8'>
                        <Card className='bg-white border border-rounded w-100 p-0  ' id='profile-page-cards'>
                            {user.id === currentUser.id ? <PostInput/> : ""}
                        </Card>
                    </Col>
                </Row>

                <Row className='mt-1'>
                    <Col className='col-12 col-lg-4 '>
                        <AllFriendsCard user={user}/>
                    </Col>
                    <Col className='col-12 col-lg-8 profile-post-card '>
                        {postsOfUser.map(p => <PostCard key={p.id} post={p}/>)}
                    </Col>
                </Row>
            </Container>

        </>

    )
}

function ProfileAboutTab(props) {
    const {user} = props;
    const currentUser = useContext(CurrentUserContext);

    const [isReadOnly, setIsReadOnly] = useState(!(currentUser.id === user.id))

    const [userToEdit, setUserToEdit] = useState(user);

    const navigate = useNavigate();
    const handleSubmit = () => {
        updateDoc(userToEdit.ref, userToEdit);
        navigate("/home")
    }

    const handleChange = (e) => {
        setUserToEdit({...userToEdit, [e.target.name]: e.target.value})
    }
    return (
        <Container>
            <Row>
                <Col className='col-10'>
                    <h4>About</h4>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faBriefcase}/></InputGroup.Text>
                            <Form.Control
                                placeholder="Workplace.." readOnly={isReadOnly} type='text' onChange={handleChange}
                                name='workPlace' value={userToEdit.workPlace}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSchool}/></InputGroup.Text>
                            <Form.Control
                                placeholder="Highschool.." readOnly={isReadOnly} type='text' onChange={handleChange}
                                name='highschool' value={userToEdit.highschool}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon
                                icon={faGraduationCap}/></InputGroup.Text>
                            <Form.Control
                                placeholder="University"
                                type='text' onChange={handleChange} readOnly={isReadOnly} name='university'
                                value={userToEdit.university}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faCity}/></InputGroup.Text>
                            <Form.Control
                                placeholder="City..."
                                type='text' onChange={handleChange} readOnly={isReadOnly} value={userToEdit.city}
                                name='city'
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon
                                icon={faHouseChimneyUser}/></InputGroup.Text>
                            <Form.Control
                                placeholder="Hometown..."
                                type='text' onChange={handleChange} readOnly={isReadOnly} name='hometown'
                                value={userToEdit.hometown}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faPhone}/></InputGroup.Text>
                            <Form.Control
                                placeholder="Phone Number..."
                                type='text' onChange={handleChange} readOnly={isReadOnly} name='phoneNumber'
                                value={userToEdit.phoneNumber}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faHeart}/></InputGroup.Text>
                            <Form.Control
                                placeholder="Relationship..."
                                type='text' onChange={handleChange} readOnly={isReadOnly} name='relationship'
                                value={userToEdit.relationship}
                            />
                        </InputGroup>

                        <Row>
                            <Col className="mb-3 d-flex justify-content-center flex-column">
                                {!isReadOnly ?
                                    <input className="btn btn-success m-3 btn-block " type="submit"
                                           value="Update"/> : ""}
                            </Col>
                        </Row>
                    </Form>
                </Col>


            </Row>
        </Container>
    );
}

function FriendsOfUserCard(props) {
    const {friend, user} = props;
    const currentUser = useContext(CurrentUserContext);
    console.log(friend)
    const navigate = useNavigate();

    const removeFriend = (e) => {
        e.preventDefault();
        updateDoc(currentUser.ref, {friends: arrayRemove(friend.id)})
        updateDoc(currentUser.ref, {friendsAmount: currentUser.friendsAmount - 1})
        navigate("/home")
    }

    return (

        <Col xs={6} md={4} lg={3}>
            <Link to={`/profile/${friend.id}`}>
                <Card style={{width: '10rem', height: "22rem"}} className='mt-3 mr-auto'>
                    <Card.Img variant="top"
                              src={friend.profileImg ? friend.profileImg : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}
                              style={{width: '10rem', height: '10rem'}}/>
                    <Card.Body style={{height: '4rem'}}>
                        <Card.Title>{friend.firstName} {friend.lastName}</Card.Title>
                        <Card.Text className='text-muted'>
                            5 common friends
                        </Card.Text>
                        {currentUser.id === user.id ?
                            <Button variant="warning" className='btn-outline' onClick={removeFriend}>Remove
                                friend</Button>
                            : ""
                        }
                    </Card.Body>
                </Card>
            </Link>
        </Col>


    );
}

FriendsOfUserCard.propTypes = {};

function ProfileFriendsTab(props) {
    const {user} = props;
    const users = useContext(UsersContext);

    const friendsArray = []
    users?.forEach(u => {
        user?.friends.forEach(id => {
            if (u.id === id) {
                friendsArray.push(u)
            }
        })
    })
    // console.log(currentUser.id)


    return (
        <div className='mt-3 text-center'>
            <h4>Your friends</h4>

            <Container>
                <Row>
                    <>
                        {friendsArray.map(f =>
                            <FriendsOfUserCard key={f.id} friend={f} user={user}/>
                        )}
                    </>

                </Row>
            </Container>


        </div>


    );
}

ProfileFriendsTab.propTypes = {};

function CoverSection(props) {
    return <div className="d-flex flex-column flex-lg-row justify-content-lg-around mt-5">
        <div className="d-flex flex-row ">
            <img alt="profile_picture"
                 src={props.user.profileImg ? props.user.profileImg : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}
                 className="img-fluid rounded-circle border border-dark border-3"
                 style={{width: "15rem", height: "15rem"}}/>
            <div className="d-flex flex-column ms-4 mt-5">
                <h1 className="text-capitalize ">{props.user.firstName} {props.user.lastName}</h1>
                <h3 className="text-muted">{props.user.friendsAmount} friends</h3>
            </div>
        </div>
        {props.user.id === props.currentUser.id ?
            <div className="mt-5 ms-3 ms-lg-0 me-lg-2">
                <Button className="btn btn-secondary" onClick={props.onClick}><FontAwesomeIcon
                    icon={faPen} className="me-2"/>Edit Profile</Button>
            </div> :

            <div className="mt-5 ms-3 ms-lg-0 me-lg-2">
                <Button className="btn btn-primary"><FontAwesomeIcon
                    icon={faMessage} className="me-2"/>Send a message</Button>
            </div>

        }
    </div>;
}

CoverSection.propTypes = {
    user: PropTypes.any,
    currentUser: PropTypes.any,
    onClick: PropTypes.func
};

export function Profile() {
    const currentUser = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [key, setKey] = useState('home');
    const {id} = useParams();
    const users = useContext(UsersContext);
    let user;
    users.forEach(u => {
        if (u.id === id) {
            user = u;
        }
    })

    return (
        <>
            <NavigationBar/>
            <CoverSection user={user} currentUser={currentUser} onClick={() => navigate(`/settings/${id}`)}/>

            <hr/>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 ms-5"
            >
                <Tab eventKey="home" title="Posts">
                    <ProfilePostsTab user={user}></ProfilePostsTab>
                </Tab>
                <Tab eventKey="profile" title="About">
                    <ProfileAboutTab user={user}></ProfileAboutTab>
                </Tab>
                <Tab eventKey="friends" title="Friends">
                    <ProfileFriendsTab user={user}> </ProfileFriendsTab>
                </Tab>
            </Tabs>


        </>
    )
}