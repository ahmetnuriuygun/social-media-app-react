import {NavigationBar} from "../Components/Navbar";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {useContext, useState} from "react";
import {Button, Card, CardText, CardTitle, Col, Container, Form, InputGroup, Row, Tab, Tabs} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCakeCandles, faHouseChimney, faPen} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate, useParams} from "react-router-dom";
import {PostInput} from "../Components/PostInput";
import {UsersContext} from "../context/UsersContext";
import {PostsContext} from "../context/PostsContext";
import {PostCard, Posts} from "../Components/Posts";

function FriendsCard(props) {
    const {friend} = props;
    console.log(friend)
    return (
        <Col className='col-6'>
            <Link to={`/profile/${friend.id}`}>
                <Card style={{width:'10rem'}}>
                    <Card.Img variant="top" src={friend.profileImg ? friend.profileImg : `images/blank-profile.jpg`}  height='150rem' />
                    <Card.Text>
                        <strong className='text-capitalize'>{friend.firstName} {friend.lastName}</strong>
                    </Card.Text>
                </Card>
            </Link>

        </Col>

    );
}

function ProfilePostsTab(props) {
    const currentUser = useContext(CurrentUserContext);
    const users = useContext(UsersContext);
    const postsContext = useContext(PostsContext);
    const {user} = props;

    let friendsArray = []

    user.friends.map(id=>{
        users?.map(u=>{
            if(u.id===id){
                friendsArray.push(u);
            }
        })
    })

    let postsOfUser = []


    postsContext.forEach(p=>{
        if(p.ownerId===user?.id){
            postsOfUser.push(p);
        }
    })

    function calculateYear (){
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
        <>
            <Container>
                <Row>
                    <Col className='col-5'>
                        <Card className='bg-white border border-rounded p-3' id='profile-page-cards'>
                            <h4>Tag</h4>
                            {user.id===currentUser.id ? <Button className='btn btn-secondary btn-block mt-2 '>Add Biography</Button>: ""}
                            <p className='mt-2'><FontAwesomeIcon icon={faHouseChimney} className='me-2' /> Lives in <strong>{user?.city}</strong></p>
                            <p className='mt-2'><FontAwesomeIcon icon={faCakeCandles} className='me-2' /><strong>{calculateYear()}</strong> years old </p>
                            {user.id===currentUser.id ? <Button className='btn btn-secondary btn-block mt-2 '>Add Hobby</Button> : ""}
                        </Card>
                    </Col>
                    <Col className='col-7'>
                        <Card className='bg-white border border-rounded w-100 p-0  ' id='profile-page-cards'>
                            {user.id===currentUser.id ? <PostInput /> : ""}
                        </Card>
                    </Col>
                </Row>

                <Row className='mt-3'>
                    <Col className='col-5'>
                        <Card className='bg-white border border-rounded p-3' id='profile-page-cards'>
                            <Card.Title ><h4 className='fw-bold'>Friends</h4></Card.Title>
                            <Card.Text>{user.friendsAmount} friends</Card.Text>
                            <Container>
                                <Row>
                                    {friendsArray.map(f=> <FriendsCard key={f.id} friend={f}/>)}
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                    <Col>
                        {postsOfUser.map(p=> <PostCard key={p.id} post={p}  />)}
                    </Col>
                </Row>
            </Container>



        </>

    )
}

function ProfileAboutTab(props) {
    const {user} = props;
    const currentUser = useContext(CurrentUserContext);
    return (
        <Container>
           <Row>
               {currentUser.id===user.id
               ?
                   <Col className='col-10'>
                       <h4>About</h4>
                        <Form>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Work place.."
                                    aria-label="Work-place"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Highschool.."
                                    aria-label="Highschool"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="University"
                                    aria-label="University"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            {currentUser.city ?
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    <Form.Control
                                        placeholder="City..."
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            : ""}
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                <Form.Control
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>

                        </Form>
                   </Col>

                   : ""}

           </Row>
        </Container>
    );
}

export function Profile() {
    const currentUser = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [key, setKey] = useState('home');
    const {id} = useParams();
    const users = useContext(UsersContext);
    let user;
    users.forEach(u=>{
        if(u.id === currentUser.id){
            user = u;
        }
    })
    console.log(user)
    console.log(id)
    return (
        <>
            <NavigationBar/>
            <div className='d-flex justify-content-around mt-5'>
                <div className='d-flex'>
                    <img src={user.profileImg ? user.profileImg : `images/blank-profile.jpg`}
                         className='img-fluid rounded-circle border border-dark border-3 w-25 '/>
                    <div className='d-flex flex-column ms-3 mt-5'>
                        <h1 className='text-capitalize '>{user.firstName} {user.lastName}</h1>
                        <h3 className='text-muted'>{user.friendsAmount} friends</h3>
                    </div>
                </div>

                {user.id===currentUser.id ?
                <div className='mt-5'>
                    <Button className='btn btn-secondary' onClick={() => navigate(`/settings`)}><FontAwesomeIcon
                        icon={faPen} className='me-2'/>Edit Profile</Button>
                </div> : ""}
            </div>

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
                <Tab eventKey="contact" title="Friends" >
                    Tab content for Contact
                </Tab>
            </Tabs>


        </>
    )
}