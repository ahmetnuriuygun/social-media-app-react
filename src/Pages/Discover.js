import {NavigationBar} from "../Components/Navbar";
import {LeftSidebar} from "../Components/LeftSidebar";

import React, {useContext, useMemo, useState} from "react";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {collection, orderBy, query, updateDoc} from "firebase/firestore";
import {firestoreDB} from "../helpers/firebase";
import {userConverter} from "../helpers/functions";
import {useCollectionData} from "react-firebase-hooks/firestore";
import  {CurrentUserContext} from "../context/CurrentUserContext";
import {forEach} from "react-bootstrap/ElementChildren";

function FriendSuggestionCard(props) {
    const {user} = props;
    const currentUser = useContext(CurrentUserContext);

    const addFriend = () =>{
        currentUser.map(person => updateDoc(person.ref, {friendsAmount: person.friendsAmount + 1}))

        console.log(user.id)
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
                    <Button variant="primary" onClick={addFriend} >Add friend</Button>
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

    const collectionRef = collection(firestoreDB, 'Users').withConverter(userConverter)
    const queryRef = useMemo(() =>
        query(collectionRef, orderBy("firstName")), [collectionRef]);

    const [users, loading, error] = useCollectionData(queryRef);

    const idOfCurrentUser = currentUser.map(c=>c.id);
    console.log(idOfCurrentUser)




    return(
        <>

            <NavigationBar/>
            <div className="container">
                <div className="row">
                    <div className="d-none d-xl-block col-xl-3">
                        <LeftSidebar/>
                    </div>
                    <div className="main col-sm-12 col-lg-10  col-xl-6 ">
                        <FriendsSuggestions users={users?.filter(u=>u.id!==idOfCurrentUser[0])}/>
                    </div>
                    <div className="d-none d-lg-block col-lg-1 col-xl-3">
                        {/*<RightSidebar />*/}
                    </div>
                </div>
            </div>

        </>

    )
}