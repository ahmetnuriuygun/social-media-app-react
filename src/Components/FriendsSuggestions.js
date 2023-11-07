import {Button, Card, Col, Container, Row} from "react-bootstrap";
import React, {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {arrayUnion, updateDoc} from "firebase/firestore";

export function FriendsSuggestions(props) {
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