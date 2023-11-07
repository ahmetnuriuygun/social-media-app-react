import React, {useContext} from "react";
import {UsersContext} from "../context/UsersContext";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {Link, useNavigate} from "react-router-dom";
import {arrayRemove, updateDoc} from "firebase/firestore";

export function ProfileFriendsTab(props) {
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

FriendsOfUserCard.propTypes = {};

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