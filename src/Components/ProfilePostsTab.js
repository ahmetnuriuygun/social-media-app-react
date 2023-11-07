import React, {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {PostsContext} from "../context/PostsContext";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {PostInput} from "./PostInput";
import {PostCard} from "./PostCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCakeCandles, faHouseChimney} from "@fortawesome/free-solid-svg-icons";
import * as PropTypes from "prop-types";
import {UsersContext} from "../context/UsersContext";
import {Link} from "react-router-dom";

export function ProfilePostsTab(props) {
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
                        <Tag user={user}/>
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