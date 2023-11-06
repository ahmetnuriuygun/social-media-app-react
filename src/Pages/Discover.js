import {NavigationBar} from "../Components/Navbar";
import {LeftSidebar} from "../Components/LeftSidebar";
import React, {useContext} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {updateDoc, arrayUnion} from "firebase/firestore";

import {CurrentUserContext} from "../context/CurrentUserContext";
import {UsersContext} from "../context/UsersContext";
import {RightSidebar} from "../Components/RightSidebar";

function FriendSuggestionCard(props) {
    const {user} = props;
    const currentUser = useContext(CurrentUserContext);

    const sendFriendRequest = () => {
        updateDoc(currentUser.ref, {sendFriendRequest: arrayUnion(user.id)})
        updateDoc(user.ref, {receiveFriendRequest: arrayUnion(currentUser.id)})

    }


    return (
        <Col sm={6} md={4}>
            <Card style={{width: '12rem', height: "22rem"}} className='mt-3 ms-5 ms-sm-0'>
                <Card.Img variant="top" src={user.profileImg ? user.profileImg : `images/blank-profile.jpg`}
                          style={{width: '12rem', height: '10rem'}}/>
                <Card.Body style={{height: '4rem'}}>
                    <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                    <Card.Text className='text-muted'>
                        5 common friends
                    </Card.Text>
                    <Button variant="primary" className='btn-outline' onClick={sendFriendRequest}>Add friend</Button>
                </Card.Body>
            </Card>
        </Col>


    )
}

function FriendsSuggestions(props) {
    const {users} = props;

    return (
        <div className='mt-3 text-center'>
            <h4>People that you can know</h4>
            <Container>
                <Row>

                    {users?.map(u => <FriendSuggestionCard key={u.id} user={u}/>)}


                </Row>
            </Container>
        </div>
    );
}

export function Discover() {
    const currentUser = useContext(CurrentUserContext)
    const users = useContext(UsersContext)

    function friendSuggestionFilter() {
        return users?.filter(u =>
            u.id !== currentUser.id
            && !currentUser.sendFriendRequest.includes(u.id)
            && !currentUser.friends.includes(u.id)
            && !currentUser.receiveFriendRequest.includes(u.id))
    }

    return (
        <>
            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="d-none d-xl-block col-xl-3">
                        <LeftSidebar/>
                    </div>
                    <div className="main col-sm-12 col-lg-10  col-xl-6 ">
                        <FriendsSuggestions users={friendSuggestionFilter()}/>
                    </div>
                    <div className="d-none d-lg-block col-lg-1 col-xl-3">
                        <RightSidebar/>
                    </div>
                </div>
            </div>

        </>

    )
}