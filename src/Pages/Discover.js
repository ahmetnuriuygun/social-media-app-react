import {NavigationBar} from "../Components/Navbar";
import {LeftSidebar} from "../Components/LeftSidebar";
import React, {useContext, useMemo, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {collection, orderBy, query, updateDoc,arrayUnion} from "firebase/firestore";
import {firestoreDB} from "../helpers/firebase";
import {userConverter} from "../helpers/functions";
import {useCollectionData} from "react-firebase-hooks/firestore";
import  {CurrentUserContext} from "../context/CurrentUserContext";
import usersContext, {UsersContext} from "../context/UsersContext";
import {RightSidebar} from "../Components/RightSidebar";

function FriendSuggestionCard(props) {
    const {user} = props;
    const currentUser = useContext(CurrentUserContext);
    console.log(currentUser.id)
    const addFriendRequest = () =>{
        updateDoc(currentUser.ref, {sendFriendRequest:arrayUnion(user.id) })
        updateDoc(user.ref,{receiveFriendRequest:arrayUnion(currentUser.id)})
        console.log(user)
    }


    return (
        <Col md={4}  >
            <Card style={{ width: '10rem' , height:"22rem" }} className='mt-3'>
                <Card.Img variant="top" src={user.profileImg ? user.profileImg : `images/blank-profile.jpg`} style={{width:'10rem', height:'10rem'}} />
                <Card.Body style={{height:'4rem'}}>
                    <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                    <Card.Text className='text-muted'>
                        5 common friends
                    </Card.Text>
                    <Button variant="primary" className='btn-outline' onClick={addFriendRequest} >Add friend</Button>
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

                        {users?.map(u=><FriendSuggestionCard key={u.id} user={u}/>)}


                </Row>
            </Container>
        </div>
    );
}

export function Discover(){
    const currentUser = useContext(CurrentUserContext)
    const users = useContext(UsersContext)





    return(
        <>

            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="d-none d-xl-block col-xl-3">
                        <LeftSidebar/>
                    </div>
                    <div className="main col-sm-12 col-lg-10  col-xl-6 ">
                        <FriendsSuggestions users={users?.filter(u=>u.id!==currentUser.id && !currentUser.sendFriendRequest.includes(u.id) && !currentUser.friends.includes(u.id) && !currentUser.receiveFriendRequest.includes(u.id))}/>
                    </div>
                    <div className="d-none d-lg-block col-lg-1 col-xl-3">
                        <RightSidebar />
                    </div>
                </div>
            </div>

        </>

    )
}